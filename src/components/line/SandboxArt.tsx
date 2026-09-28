import React from 'react';
import { useInView, useLoop } from './primitives';

// Small looping diagrams for the sandbox tiles. Same shape as GenerationsDiagram: a panel whose body
// changes per step, with the step's command and result underneath. Commands follow the CLI sketch in
// russel-dev docs/project/agent-sandboxes-plan.md; sandboxes are not shipped yet.

type Step = { cmd: string; result: string; tone?: string };

/** Current step for a loop of `n` steps, with one extra slot so the last state holds before restarting. */
function useSteps(n: number, ms: number) {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const t = useLoop((n + 1) * ms, seen, 0.99);
  const step = Math.min(n - 1, Math.floor(t * (n + 1)));
  // Progress through the current step, for things that move within it.
  const within = Math.min(1, t * (n + 1) - step);
  return { ref, step, within, t };
}

const Panel: React.FC<{
  innerRef: React.Ref<HTMLDivElement>;
  label: string;
  right: React.ReactNode;
  step: Step;
  children: React.ReactNode;
}> = ({ innerRef, label, right, step, children }) => (
  <div ref={innerRef} className="border-line bg-night flex h-full flex-col overflow-hidden rounded-[10px] border font-mono text-[12.5px]">
    <div className="border-line text-dimmer flex justify-between gap-3 border-b px-4 py-2 text-[11px]">
      <span>{label}</span>
      <span>{right}</span>
    </div>
    <div className="flex-1 px-4 py-3">{children}</div>
    <div className="border-line border-t px-4 py-3 leading-relaxed" aria-live="polite">
      <div className="text-fg truncate">
        {step.cmd.startsWith('#') ? (
          <span className="text-dimmer">{step.cmd}</span>
        ) : (
          <>
            <span className="text-dimmer select-none">$ </span>
            {step.cmd}
          </>
        )}
      </div>
      <div className={`truncate ${step.tone ?? 'text-ok'}`}>{step.result}</div>
    </div>
  </div>
);

const fadeIn = (on: boolean) => `transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-0'}`;

/* ------------------------------------------------------------------ lifecycle */

const LIFE: Step[] = [
  { cmd: 'russel sandbox create --repo you/api --ttl 60m', result: 'sbx-8 running · deleted in 60m' },
  { cmd: 'russel sandbox snapshot sbx-8 --name after-deps', result: 'saved files, tools and caches' },
  { cmd: 'russel sandbox fork after-deps', result: 'sbx-9 running · fresh identity' },
  { cmd: 'russel sandbox export sbx-8 --patch', result: 'patch.diff  +48 −12' },
  { cmd: '# 60 minutes later', result: 'sbx-8 deleted · sbx-9 kept', tone: 'text-mute' },
];

export const LifecycleDiagram: React.FC = () => {
  const { ref, step, within } = useSteps(LIFE.length, 1900);
  const ttl = step >= 4 ? 0 : 1 - (step + within) / 4;
  const gone = step >= 4;

  return (
    <Panel innerRef={ref} label="sandboxes" right={`step ${step + 1}/${LIFE.length}`} step={LIFE[step]}>
      <ul className="space-y-2.5 py-1">
        <li className={`grid grid-cols-[14px_minmax(0,1fr)_auto] items-center gap-x-2.5 ${gone ? 'opacity-40' : ''} transition-opacity duration-500`}>
          <span className={`h-3 w-3 rounded-full border-[1.5px] border-ct ${gone ? '' : 'bg-ct'}`} aria-hidden />
          <span className={gone ? 'text-dimmer line-through' : 'text-fg'}>sbx-8</span>
          <span className="bg-raise h-1.5 w-20" aria-hidden>
            <span className="bg-ct block h-full transition-[width] duration-300" style={{ width: `${ttl * 100}%` }} />
          </span>
        </li>
        <li className={`grid grid-cols-[14px_minmax(0,1fr)_auto] items-center gap-x-2.5 ${fadeIn(step >= 1)}`}>
          <span className="border-vm bg-vm/15 h-3 w-3 border-[1.5px]" aria-hidden />
          <span className="text-mute">after-deps</span>
          <span className="text-dimmer text-[11px]">snapshot</span>
        </li>
        <li className={`grid grid-cols-[14px_minmax(0,1fr)_auto] items-center gap-x-2.5 ${fadeIn(step >= 2)}`}>
          <span className="border-ct bg-ct h-3 w-3 rounded-full border-[1.5px]" aria-hidden />
          <span className="text-fg">sbx-9</span>
          <span className={`text-[11px] ${gone ? 'text-ok' : 'text-dimmer'}`}>{gone ? '● kept' : 'forked'}</span>
        </li>
      </ul>
    </Panel>
  );
};

/* ------------------------------------------------------------------ shared Nix store */

// Line art, like the Operate section: ink on paper.
const INK = 'var(--color-fg)';
const MUTE = 'var(--color-mute)';
const DIM = 'var(--color-dimmer)';
const PAPER = 'var(--color-night)';
const LINE = 'var(--color-line)';
const OK = 'var(--color-ok)';
const ERR = 'var(--color-err)';
const VM = 'var(--color-vm)';

const T: React.FC<{ x: number; y: number; children: React.ReactNode; fill?: string; size?: number; anchor?: 'start' | 'middle' | 'end' }> = ({
  x,
  y,
  children,
  fill = INK,
  size = 12,
  anchor = 'middle',
}) => (
  <text x={x} y={y} textAnchor={anchor} fontFamily="var(--font-mono)" fontSize={size} fill={fill}>
    {children}
  </text>
);

// Relative sizes only; the point is the ratio, not the megabytes.
const PKGS = [
  { name: 'nodejs', x: 45, size: 3 },
  { name: 'git', x: 125, size: 1 },
  { name: 'python', x: 205, size: 3 },
  { name: 'postgres', x: 285, size: 2 },
];
// Parallel attempts on one repo mostly need the same toolchain.
const NEEDS = [
  ['nodejs', 'git'],
  ['nodejs', 'git'],
  ['nodejs', 'git', 'python'],
];
const cost = (names: string[]) => names.reduce((s, n) => s + PKGS.find((p) => p.name === n)!.size, 0);

/** Three sandboxes drawing their toolchains from one store: the copied cost grows, the stored cost barely moves. */
export const StoreArt: React.FC = () => {
  const [ref, seen] = useInView<SVGSVGElement>(0.4);
  const t = useLoop(4 * 1900, seen, 0.99);
  const step = Math.min(2, Math.floor(t * 4));
  const within = Math.min(1, t * 4 - step);
  const live = NEEDS.slice(0, step + 1);
  const copied = live.reduce((s, n) => s + cost(n), 0);
  const stored = cost([...new Set(live.flat())]);
  const MAX = NEEDS.reduce((s, n) => s + cost(n), 0);

  return (
    <svg ref={ref} viewBox="0 0 400 300" className="block h-full w-full" role="img" aria-label="Sandboxes share one read-only copy of each toolchain from the Nix store; only their workspaces are their own">
      <defs>
        <pattern id="sbx-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke={INK} strokeWidth="0.7" strokeOpacity="0.4" />
        </pattern>
      </defs>

      {/* links first so the boxes sit on top */}
      {NEEDS.map((names, i) =>
        names.map((n) => {
          const p = PKGS.find((q) => q.name === n)!;
          const reveal = i < step ? 1 : i === step ? Math.min(1, within * 2) : 0;
          return (
            <path
              key={`${i}-${n}`}
              d={`M${80 + i * 120} 96 C${80 + i * 120} 150 ${p.x + 35} 150 ${p.x + 35} 196`}
              fill="none"
              stroke={VM}
              strokeWidth="1.2"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={1 - reveal}
              opacity={0.75}
            />
          );
        }),
      )}

      {NEEDS.map((_, i) => {
        const x = 30 + i * 120;
        const on = i <= step;
        return (
          <g key={i} style={{ opacity: on ? 1 : 0.18, transition: 'opacity 500ms ease' }}>
            <rect x={x} y="20" width="100" height="76" fill={PAPER} stroke={INK} strokeWidth="1.3" />
            <T x={x + 10} y={40} anchor="start">
              sbx-{i + 1}
            </T>
            <rect x={x + 8} y="54" width="84" height="32" fill="url(#sbx-hatch)" stroke={LINE} />
            <rect x={x + 18} y="63" width="64" height="14" fill={PAPER} />
            <T x={x + 50} y={74} size={10} fill={MUTE}>
              own files
            </T>
          </g>
        );
      })}

      {/* the store: one disk, each package once */}
      <rect x="30" y="170" width="340" height="76" fill={PAPER} stroke={INK} strokeWidth="1.3" />
      <line x1="30" y1="176" x2="370" y2="176" stroke={INK} strokeWidth="0.8" />
      <T x={42} y={192} anchor="start" size={11} fill={MUTE}>
        /nix/store · read-only
      </T>
      {PKGS.map((p) => {
        const used = live.some((n) => n.includes(p.name));
        return (
          <g key={p.name}>
            <rect
              x={p.x}
              y="200"
              width="70"
              height="30"
              fill={used ? 'color-mix(in srgb, var(--color-vm) 10%, var(--color-cell))' : 'var(--color-cell)'}
              stroke={used ? VM : LINE}
              strokeWidth="1.2"
              style={{ transition: 'all 400ms ease' }}
            />
            <T x={p.x + 35} y={219} size={11} fill={used ? INK : DIM}>
              {p.name}
            </T>
          </g>
        );
      })}

      {/* copied vs stored once */}
      <T x={30} y={270} anchor="start" size={11} fill={MUTE}>
        copied
      </T>
      <rect x="110" y="261" width="260" height="10" fill="var(--color-raise)" />
      <rect x="110" y="261" width={(copied / MAX) * 260} height="10" fill={MUTE} opacity="0.55" style={{ transition: 'width 500ms ease' }} />
      <T x={30} y={290} anchor="start" size={11} fill={VM}>
        stored once
      </T>
      <rect x="110" y="281" width="260" height="10" fill="var(--color-raise)" />
      <rect x="110" y="281" width={(stored / MAX) * 260} height="10" fill={VM} style={{ transition: 'width 500ms ease' }} />
    </svg>
  );
};

/* ------------------------------------------------------------------ you and the agent, side by side */

type Pane = { at: number; text: string; tone?: string }[];
const CLAUDE_PANE: Pane = [
  { at: 0, text: '$ npm run dev' },
  { at: 0, text: '✓ up on :3000', tone: 'text-ok' },
  { at: 2, text: '● edit cart.ts', tone: 'text-mute' },
  { at: 3, text: '↻ reloaded', tone: 'text-mute' },
];
const YOU_PANE: Pane = [
  { at: 1, text: '$ curl :3000' },
  { at: 1, text: 'ok', tone: 'text-ok' },
  { at: 2, text: '$ tail -f app.log' },
  { at: 3, text: 'GET /cart 200', tone: 'text-mute' },
];

/** A tmux-style split: the agent on the left, you on the right, one sandbox. */
export const SharedTerminal: React.FC = () => {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const t = useLoop(5 * 1800, seen, 0.99);
  const step = Math.min(3, Math.floor(t * 5));
  const sessions = step === 0 ? 1 : 2;

  const pane = (lines: Pane, who: string, tone: string, empty: string) => (
    <div className="min-w-0 px-3 py-2.5">
      <div className={`mb-1.5 text-[11px] ${tone}`}>{who}</div>
      {lines.some((l) => step >= l.at) ? (
        lines.map((l, i) => (
          <div key={i} className={`truncate transition-opacity duration-500 ${step >= l.at ? 'opacity-100' : 'opacity-0'} ${l.tone ?? 'text-fg'}`}>
            {l.text}
          </div>
        ))
      ) : (
        <div className="text-dimmer">{empty}</div>
      )}
    </div>
  );

  return (
    <div
      ref={ref}
      className="theme-dark bg-night flex h-full flex-col overflow-hidden rounded-[10px] border border-white/10 font-mono text-[12px] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]"
    >
      <div className="bg-raise relative flex h-8 shrink-0 items-center px-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="text-mute pointer-events-none absolute inset-x-16 truncate text-center text-[11px]">ssh sbx-3</span>
      </div>
      <div className="divide-line grid flex-1 grid-cols-2 divide-x leading-relaxed">
        {pane(CLAUDE_PANE, 'claude', 'text-[#e39a7b]', '')}
        {pane(YOU_PANE, 'you', 'text-vm', 'not connected')}
      </div>
      <div className="flex shrink-0 justify-between bg-[#b5c85a] px-3 py-0.5 text-[11px] text-black">
        <span>[sbx-3]</span>
        <span>
          {sessions} session{sessions > 1 ? 's' : ''} · ttl 41m
        </span>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ egress through a gateway */

const DEST = [
  { name: 'npm registry', ok: true, speed: 0.45 },
  { name: 'cloud metadata', ok: false, speed: 0.7 },
  { name: 'control plane', ok: false, speed: 0.55 },
  { name: 'sbx-2', ok: false, speed: 0.85 },
];

/** Live traffic: every line streams out of the sandbox; only the allowed one carries on past the gateway. */
export const EgressArt: React.FC = () => {
  const SX = 110; // sandbox right edge
  const GX = 190; // gateway left edge
  const GW = 22;
  const DX = 272; // destinations left edge
  const cy = (i: number) => 58 + i * 62;
  // Dashes move by animating the dash offset; `speed` staggers the lanes so it doesn't look metronomic.
  const flow = (speed: number, color: string, width = 2) => ({
    stroke: color,
    strokeWidth: width,
    strokeDasharray: '6 10',
    className: 'anim-flow',
    style: { animationDuration: `${speed}s` },
  });

  return (
    <svg viewBox="0 0 400 300" className="block h-full w-full" role="img" aria-label="Outbound traffic goes through a gateway on your server; the package registry is allowed, metadata, the control plane and other sandboxes are blocked">
      {DEST.map((d, i) => {
        const out = `M${SX} 150 C${SX + 40} 150 ${GX - 40} ${cy(i)} ${GX} ${cy(i)}`;
        const on = `M${GX + GW} ${cy(i)} L${DX} ${cy(i)}`;
        return (
          <g key={d.name} fill="none">
            {/* rails */}
            <path d={out} stroke={LINE} strokeWidth="1.1" />
            <path d={on} stroke={LINE} strokeWidth="1.1" strokeDasharray={d.ok ? undefined : '3 4'} />
            {/* traffic: everything leaves the sandbox; only allowed traffic continues */}
            <path d={out} {...flow(d.speed, d.ok ? OK : VM)} />
            {d.ok && <path d={on} {...flow(d.speed, OK)} />}
          </g>
        );
      })}

      <rect x="20" y="112" width="90" height="76" fill={PAPER} stroke={INK} strokeWidth="1.3" />
      <T x={65} y={147}>sbx-3</T>
      <T x={65} y={166} size={10} fill={MUTE}>
        agent at work
      </T>

      {/* gateway: a gate with slats */}
      <rect x={GX} y="30" width={GW} height="236" fill={PAPER} stroke={INK} strokeWidth="1.3" />
      {Array.from({ length: 14 }, (_, i) => (
        <line key={i} x1={GX + 4} y1={42 + i * 16} x2={GX + GW - 4} y2={42 + i * 16} stroke={INK} strokeWidth="0.8" strokeOpacity="0.45" />
      ))}
      <T x={GX + GW / 2} y={286} size={11} fill={MUTE}>
        gateway · packages
      </T>

      {DEST.map((d, i) => (
        <g key={d.name}>
          <rect x={DX} y={cy(i) - 17} width="112" height="34" fill={PAPER} stroke={d.ok ? OK : INK} strokeWidth={d.ok ? 1.6 : 1.1} />
          <T x={DX + 56} y={cy(i) + 4} size={11} fill={d.ok ? INK : DIM}>
            {d.name}
          </T>
          {d.ok ? (
            <path d={`M${DX + 117} ${cy(i) - 1} l3 3 l6 -7`} fill="none" stroke={OK} strokeWidth="1.8" />
          ) : (
            <g stroke={ERR} strokeWidth="2">
              <line x1={GX + GW + 8} y1={cy(i) - 6} x2={GX + GW + 20} y2={cy(i) + 6} />
              <line x1={GX + GW + 20} y1={cy(i) - 6} x2={GX + GW + 8} y2={cy(i) + 6} />
            </g>
          )}
        </g>
      ))}
    </svg>
  );
};
