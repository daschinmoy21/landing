import React, { useEffect, useRef, useState } from 'react';
import { Cell, Grid, Section, SectionTitle, useInView, useReducedMotion } from './primitives';

// Behaviour from russel-dev: docs/concepts/lifecycle.md, contrib/russel-ctrl.service
// (Restart=on-failure, RestartSec=5s, KillMode=process) and `restart` in crates/core/src/config.rs.

const INK = 'var(--color-fg)';
const MUTE = 'var(--color-mute)';
const DIM = 'var(--color-dimmer)';
const LINE = 'var(--color-line)';
const PAPER = 'var(--color-night)';
const OK = 'var(--color-ok)';
const WARN = 'var(--color-warn)';

type Ctrl = 'up' | 'draining' | 'down' | 'reconciling';
type Svc = 'serving' | 'down' | 'restarting';
type SvcId = 'api' | 'web' | 'docs';

type Ev = {
  at: number;
  log: string;
  tone?: 'cmd' | 'ok' | 'warn' | 'dim';
  ctrl?: Ctrl;
  svc?: [SvcId, Svc, string?];
};

type Scenario = { title: string; body: string; ms: number; events: Ev[] };

const SCENARIOS: Scenario[] = [
  {
    title: 'ctrl crashes',
    body: 'Killed mid-traffic. Services keep serving; systemd brings ctrl back and it re-adopts them.',
    ms: 12000,
    events: [
      { at: 0, log: '3 services serving', tone: 'dim' },
      { at: 800, log: 'kill -9 $(pidof russel-ctrl)', tone: 'cmd', ctrl: 'down' },
      { at: 1900, log: 'traefik keeps routing from dynamic/*.json', tone: 'dim' },
      { at: 5800, log: 'systemd: Restart=on-failure, 5s later', ctrl: 'reconciling' },
      { at: 6600, log: 'api   pid 4121, /proc cmdline matches → adopted', svc: ['api', 'serving', 'adopted'] },
      { at: 7300, log: 'web   podman inspect russel-web → adopted', svc: ['web', 'serving', 'adopted'] },
      { at: 8000, log: 'docs  podman inspect russel-docs → adopted', svc: ['docs', 'serving', 'adopted'] },
      { at: 8800, log: 'no request went through ctrl', tone: 'ok', ctrl: 'up' },
    ],
  },
  {
    title: 'ctrl upgrades',
    body: 'SIGTERM finishes in-flight deploys, then detaches. The new binary picks up where the old one stopped.',
    ms: 11000,
    events: [
      { at: 0, log: './contrib/install.sh host', tone: 'cmd' },
      { at: 900, log: 'SIGTERM: stop accepting, finish in-flight deploys', ctrl: 'draining' },
      { at: 2400, log: 'KillMode=process: only ctrl exits', ctrl: 'down' },
      { at: 3400, log: 'install /usr/local/bin/russel-ctrl', tone: 'dim' },
      { at: 4400, log: 'restart unit, reconcile from metadata.json', ctrl: 'reconciling' },
      { at: 5200, log: 'api   pid 4121, /proc cmdline matches → adopted', svc: ['api', 'serving', 'adopted'] },
      { at: 5900, log: 'web   podman inspect russel-web → adopted', svc: ['web', 'serving', 'adopted'] },
      { at: 6600, log: 'docs  podman inspect russel-docs → adopted', svc: ['docs', 'serving', 'adopted'] },
      { at: 7400, log: 'restart probe ok (a failed one restores the old binary)', tone: 'ok', ctrl: 'up' },
    ],
  },
  {
    title: 'a service dies while ctrl is down',
    body: 'Podman restarts containers on its own. A microVM is relaunched from its recorded generation when ctrl returns.',
    ms: 12500,
    events: [
      { at: 0, log: 'restart = "unless-stopped" on every service', tone: 'dim' },
      { at: 700, log: 'kill -9 $(pidof russel-ctrl)', tone: 'cmd', ctrl: 'down' },
      { at: 1700, log: 'web exits: podman restart policy takes it', tone: 'warn', svc: ['web', 'restarting'] },
      { at: 2700, log: 'web back, no ctrl needed', svc: ['web', 'serving', 'podman'] },
      { at: 3500, log: 'api VM exits: 502 until ctrl returns', tone: 'warn', svc: ['api', 'down'] },
      { at: 5700, log: 'systemd: Restart=on-failure, 5s later', ctrl: 'reconciling' },
      { at: 6400, log: 'web   podman inspect russel-web → adopted', svc: ['web', 'serving', 'adopted'] },
      { at: 7100, log: 'api   VM down → relaunch gen 3, nothing rebuilt', svc: ['api', 'restarting'] },
      { at: 8300, log: 'api   answering on :3000', svc: ['api', 'serving', 'relaunched'] },
      { at: 8900, log: 'docs  podman inspect russel-docs → adopted', svc: ['docs', 'serving', 'adopted'] },
      { at: 9600, log: 'all 3 serving', tone: 'ok', ctrl: 'up' },
    ],
  },
];

const SERVICES: { id: SvcId; runtime: 'microvm' | 'container' }[] = [
  { id: 'api', runtime: 'microvm' },
  { id: 'web', runtime: 'container' },
  { id: 'docs', runtime: 'container' },
];

type SvcState = { state: Svc; note?: string; since: number };
type Snapshot = { ctrl: Ctrl; svcs: Record<SvcId, SvcState>; shown: Ev[] };

function snapshot(s: Scenario, elapsed: number): Snapshot {
  const snap: Snapshot = {
    ctrl: 'up',
    svcs: { api: { state: 'serving', since: -1e9 }, web: { state: 'serving', since: -1e9 }, docs: { state: 'serving', since: -1e9 } },
    shown: [],
  };
  for (const e of s.events) {
    if (e.at > elapsed) break;
    snap.shown.push(e);
    if (e.ctrl) snap.ctrl = e.ctrl;
    if (e.svc) snap.svcs[e.svc[0]] = { state: e.svc[1], note: e.svc[2], since: e.at };
  }
  return snap;
}

type Pt = [number, number];
type Box = { x: number; y: number; w: number; h: number };
type Layout = {
  vb: [number, number];
  cp: Pt;
  dp: Pt;
  divider: number;
  state: Box;
  ctrl: Box;
  stateLink: Pt[];
  routesLink: Pt[];
  routesLabel: [number, number, 'start' | 'end'];
  supervise: Pt[];
  superviseLabel: [number, number, 'start' | 'end'];
  clients: Box;
  traefik: Box;
  group: Box;
  svc: { x: number; w: number; ys: number[] };
  /** clients → traefik centre → service, drawn orthogonally */
  route: (y: number) => Pt[];
  err: Pt;
};

// Landscape for tablet and up; portrait on phones so nothing needs a sideways scroll.
const WIDE: Layout = {
  vb: [640, 336],
  cp: [16, 22],
  dp: [16, 154],
  divider: 134,
  state: { x: 16, y: 36, w: 160, h: 56 },
  ctrl: { x: 230, y: 36, w: 180, h: 56 },
  stateLink: [[176, 64], [230, 64]],
  routesLink: [[250, 92], [250, 215]],
  routesLabel: [258, 120, 'start'],
  supervise: [[410, 64], [542, 64], [542, 158]],
  superviseLabel: [550, 120, 'start'],
  clients: { x: 16, y: 222, w: 80, h: 36 },
  traefik: { x: 170, y: 215, w: 120, h: 50 },
  group: { x: 452, y: 158, w: 180, h: 172 },
  svc: { x: 466, w: 152, ys: [170, 225, 280] },
  route: (y) => [[96, 240], [230, 240], [375, 240], [375, y + 20], [466, y + 20]],
  err: [384, 206],
};

const TALL: Layout = {
  vb: [360, 440],
  cp: [16, 20],
  dp: [16, 138],
  divider: 118,
  state: { x: 16, y: 32, w: 150, h: 52 },
  ctrl: { x: 190, y: 32, w: 154, h: 52 },
  stateLink: [[166, 58], [190, 58]],
  routesLink: [[210, 84], [210, 156]],
  routesLabel: [202, 104, 'end'],
  supervise: [[334, 84], [334, 250]],
  superviseLabel: [326, 104, 'end'],
  clients: { x: 16, y: 160, w: 80, h: 36 },
  traefik: { x: 130, y: 156, w: 110, h: 44 },
  group: { x: 16, y: 250, w: 328, h: 174 },
  svc: { x: 44, w: 286, ys: [262, 316, 370] },
  route: (y) => [[96, 178], [185, 178], [185, 232], [30, 232], [30, y + 20], [44, y + 20]],
  err: [40, 226],
};

function along(pts: Pt[], p: number): Pt {
  const lens = pts.slice(1).map((b, i) => Math.hypot(b[0] - pts[i][0], b[1] - pts[i][1]));
  let d = p * lens.reduce((a, b) => a + b, 0);
  for (let i = 0; i < lens.length; i++) {
    if (d <= lens[i]) {
      const k = d / lens[i];
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k];
    }
    d -= lens[i];
  }
  return pts[pts.length - 1];
}

const pts = (p: Pt[]) => p.map((q) => q.join(',')).join(' ');

const TRIP = 1500; // ms for one request to cross the diagram
const RPS = 42; // per service, for the "served while ctrl was down" counter

const T: React.FC<React.SVGProps<SVGTextElement>> = ({ children, ...p }) => (
  <text fontFamily="var(--font-mono)" fontSize={12} fill={INK} {...p}>
    {children}
  </text>
);

const CTRL_LABEL: Record<Ctrl, [string, string]> = {
  up: ['● up', OK],
  draining: ['draining', WARN],
  down: ['✕ down', WARN],
  reconciling: ['reconciling', INK],
};

const PlaneDiagram: React.FC<{
  L: Layout;
  snap: Snapshot;
  clock: number;
  elapsed: number;
  animate: boolean;
  className?: string;
}> = ({ L, snap, clock, elapsed, animate, className }) => {
  const ctrlUp = snap.ctrl === 'up' || snap.ctrl === 'reconciling';
  const link = { stroke: ctrlUp ? MUTE : DIM, strokeOpacity: ctrlUp ? 1 : 0.4, strokeDasharray: '3 4' };
  const [ctrlText, ctrlColor] = CTRL_LABEL[snap.ctrl];
  const { state, ctrl, clients, traefik, group, svc } = L;

  return (
    <svg
      viewBox={`0 0 ${L.vb[0]} ${L.vb[1]}`}
      className={className}
      role="img"
      aria-label="russel-ctrl sits above the request path: clients reach services through Traefik, so traffic flows while ctrl is down"
    >
      <T x={L.cp[0]} y={L.cp[1]} fontSize={11} fill={DIM}>
        control plane
      </T>
      <T x={L.dp[0]} y={L.dp[1]} fontSize={11} fill={DIM}>
        data plane
      </T>
      <line x1={0} x2={L.vb[0]} y1={L.divider} y2={L.divider} stroke={LINE} strokeDasharray="2 5" />

      {/* control links, cut when ctrl is gone */}
      <polyline points={pts(L.stateLink)} fill="none" stroke={MUTE} />
      <polyline points={pts(L.routesLink)} fill="none" {...link} />
      <polyline points={pts(L.supervise)} fill="none" {...link} />
      <T x={L.routesLabel[0]} y={L.routesLabel[1]} textAnchor={L.routesLabel[2]} fontSize={11} fill={DIM}>
        routes
      </T>
      <T x={L.superviseLabel[0]} y={L.superviseLabel[1]} textAnchor={L.superviseLabel[2]} fontSize={11} fill={DIM}>
        supervise
      </T>

      {/* state on disk outlives the process */}
      <rect x={state.x} y={state.y} width={state.w} height={state.h} fill={PAPER} stroke={LINE} />
      <T x={state.x + 14} y={state.y + 23}>
        /var/lib/russel
      </T>
      <T x={state.x + 14} y={state.y + 41} fontSize={11} fill={DIM}>
        metadata.json
      </T>

      <rect
        x={ctrl.x}
        y={ctrl.y}
        width={ctrl.w}
        height={ctrl.h}
        fill={PAPER}
        stroke={snap.ctrl === 'up' ? INK : snap.ctrl === 'reconciling' ? MUTE : WARN}
        strokeDasharray={snap.ctrl === 'down' ? '4 3' : undefined}
        strokeWidth={1.2}
      />
      <T x={ctrl.x + 14} y={ctrl.y + 23} fill={snap.ctrl === 'down' ? MUTE : INK}>
        russel-ctrl
      </T>
      <T x={ctrl.x + 14} y={ctrl.y + 41} fontSize={11} fill={ctrlColor}>
        {ctrlText}
      </T>

      {/* request paths */}
      <polyline points={pts(L.route(0).slice(0, 2))} fill="none" stroke={LINE} />
      {SERVICES.map((s, i) => {
        const down = snap.svcs[s.id].state === 'down';
        return (
          <polyline
            key={s.id}
            points={pts(L.route(svc.ys[i]).slice(1))}
            fill="none"
            stroke={down ? WARN : LINE}
            strokeOpacity={down ? 0.5 : 1}
            strokeDasharray={down ? '3 4' : undefined}
          />
        );
      })}

      {/* requests, drawn under the boxes so they pass through traefik */}
      {animate &&
        SERVICES.flatMap((s, i) =>
          [0, 1].map((k) => {
            const p = ((clock + i * (TRIP / 3) + k * (TRIP / 2)) % TRIP) / TRIP;
            const st = snap.svcs[s.id].state;
            if (st === 'restarting') return null;
            // A request for a dead backend only gets as far as traefik, and comes back a 502.
            const [x, y] = along(st === 'down' ? L.route(0).slice(0, 2) : L.route(svc.ys[i]), p);
            return <circle key={`${s.id}${k}`} cx={x} cy={y} r={2.6} fill={st === 'down' && p > 0.6 ? WARN : INK} />;
          }),
        )}

      <rect x={clients.x} y={clients.y} width={clients.w} height={clients.h} fill={PAPER} stroke={LINE} />
      <T x={clients.x + clients.w / 2} y={clients.y + clients.h / 2 + 4} textAnchor="middle" fill={MUTE}>
        clients
      </T>

      <rect x={traefik.x} y={traefik.y} width={traefik.w} height={traefik.h} fill={PAPER} stroke={INK} strokeWidth={1.2} />
      <T x={traefik.x + 14} y={traefik.y + traefik.h / 2 - 2}>
        traefik
      </T>
      <T x={traefik.x + 14} y={traefik.y + traefik.h / 2 + 14} fontSize={11} fill={DIM}>
        :80 :443
      </T>
      {snap.svcs.api.state === 'down' && (
        <T x={L.err[0]} y={L.err[1]} fontSize={11} fill={WARN}>
          502
        </T>
      )}

      <rect x={group.x} y={group.y} width={group.w} height={group.h} fill="none" stroke={LINE} />
      {SERVICES.map((s, i) => {
        const y = svc.ys[i];
        const st = snap.svcs[s.id];
        const flash = elapsed - st.since < 800;
        const tone = s.runtime === 'microvm' ? 'var(--color-vm)' : 'var(--color-ct)';
        const [label, color] =
          st.state === 'serving' ? ['● serving', OK] : st.state === 'down' ? ['✕ down', WARN] : ['↻ starting', MUTE];
        const right = svc.x + svc.w - 10;
        return (
          <g key={s.id}>
            <rect
              x={svc.x}
              y={y}
              width={svc.w}
              height={40}
              fill={PAPER}
              stroke={st.state === 'down' ? WARN : flash ? INK : LINE}
              strokeDasharray={st.state === 'down' ? '4 3' : undefined}
            />
            <rect x={svc.x} y={y} width={3} height={40} fill={tone} opacity={st.state === 'down' ? 0.35 : 1} />
            <T x={svc.x + 12} y={y + 17} fill={st.state === 'down' ? MUTE : INK}>
              {s.id}
            </T>
            <T x={right} y={y + 17} fontSize={11} fill={color} textAnchor="end">
              {label}
            </T>
            <T x={svc.x + 12} y={y + 32} fontSize={10.5} fill={tone}>
              {s.runtime}
            </T>
            {st.note && (
              <T x={right} y={y + 32} fontSize={10.5} fill={flash ? INK : DIM} textAnchor="end">
                {st.note}
              </T>
            )}
          </g>
        );
      })}
    </svg>
  );
};

const LOG_TONE = { cmd: 'text-fg', ok: 'text-ok', warn: 'text-warn', dim: 'text-dimmer' } as const;
const LOG_ROWS = 6;

export const ControlPlane: React.FC = () => {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const reduced = useReducedMotion();
  const scene = useRef({ idx: 0, start: 0, served: 0 });
  const clockRef = useRef(0);
  const [frame, setFrame] = useState({ clock: 0, idx: 0, elapsed: 0, served: 0 });

  useEffect(() => {
    if (reduced) {
      const s = scene.current;
      setFrame({ clock: 0, idx: s.idx, elapsed: SCENARIOS[s.idx].ms, served: 0 });
      return;
    }
    if (!seen) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const clock = (clockRef.current += dt);
      const s = scene.current;
      let elapsed = clock - s.start;
      if (elapsed >= SCENARIOS[s.idx].ms) {
        scene.current = { idx: (s.idx + 1) % SCENARIOS.length, start: clock, served: 0 };
        elapsed = 0;
      } else {
        const snap = snapshot(SCENARIOS[s.idx], elapsed);
        if (snap.ctrl !== 'up') {
          const live = Object.values(snap.svcs).filter((v) => v.state === 'serving').length;
          s.served += (dt / 1000) * RPS * live;
        }
      }
      const cur = scene.current;
      setFrame({ clock, idx: cur.idx, elapsed, served: cur.served });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, reduced]);

  const pick = (i: number) => {
    scene.current = { idx: i, start: clockRef.current, served: 0 };
    setFrame({ clock: clockRef.current, idx: i, elapsed: reduced ? SCENARIOS[i].ms : 0, served: 0 });
  };

  const sc = SCENARIOS[frame.idx];
  const snap = snapshot(sc, frame.elapsed);
  const log = snap.shown.slice(-LOG_ROWS);
  const diagram = { snap, clock: frame.clock, elapsed: frame.elapsed, animate: !reduced };

  return (
    <Section id="control-plane">
      <SectionTitle lead="The control plane can go down." rest="Your services don't notice.">
        russel-ctrl builds, deploys and supervises, but it never sits in the request path. Workloads run detached, Traefik
        routes from files on disk, and a restarted ctrl re-adopts whatever is still running.
      </SectionTitle>

      <Grid innerRef={ref} className="xl:grid-cols-[320px_minmax(0,1fr)]">
        <Cell className="grid content-start sm:grid-cols-3 xl:grid-cols-1">
          {SCENARIOS.map((s, i) => {
            const on = i === frame.idx;
            return (
              <button
                key={s.title}
                type="button"
                onClick={() => pick(i)}
                aria-pressed={on}
                className={`relative flex cursor-pointer flex-col items-start border-b border-line p-6 text-left last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 xl:border-r-0 xl:border-b xl:last:border-b-0 ${on ? 'bg-raise/40' : 'hover:bg-raise/20'}`}
              >
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left bg-fg"
                  style={{ transform: `scaleX(${on ? Math.min(1, frame.elapsed / s.ms) : 0})` }}
                  aria-hidden
                />
                <span className={`font-mono text-[13px] ${on ? 'text-fg' : 'text-dimmer'}`}>{i + 1}</span>
                <span className={`mt-3 block font-mono text-[17px] tracking-tight ${on ? 'text-fg' : 'text-mute'}`}>{s.title}</span>
                <span className="mt-2 block text-[15px] leading-relaxed text-mute">{s.body}</span>
              </button>
            );
          })}
        </Cell>

        <Cell className="flex flex-col">
          <div className="p-4 sm:p-8">
            <PlaneDiagram L={WIDE} className="hidden h-auto w-full md:block" {...diagram} />
            <PlaneDiagram L={TALL} className="mx-auto block h-auto w-full max-w-[440px] md:hidden" {...diagram} />
          </div>

          <div className="mt-auto border-t border-line font-mono text-[12.5px]">
            <div className="flex justify-between gap-4 border-b border-line px-4 py-2 text-[11px] text-dimmer sm:px-8">
              <span>host · journal</span>
              <span>
                served while ctrl was down{' '}
                <span className="tabular-nums text-fg">{Math.floor(frame.served).toLocaleString('en-US')}</span>
              </span>
            </div>
            <ol className="px-4 py-3 leading-[1.8] sm:px-8" style={{ minHeight: `calc(${LOG_ROWS} * 1.8em + 1.5rem)` }}>
              {log.map((e) => (
                <li key={`${frame.idx}-${e.at}`} className="grid grid-cols-[52px_minmax(0,1fr)] gap-2">
                  <span className="tabular-nums text-dimmer">+{(e.at / 1000).toFixed(1)}s</span>
                  <span className={`overflow-hidden text-ellipsis whitespace-pre ${e.tone ? LOG_TONE[e.tone] : 'text-mute'}`}>
                    {e.tone === 'cmd' && <span className="select-none text-dimmer">$ </span>}
                    {e.log}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Cell>
      </Grid>
    </Section>
  );
};
