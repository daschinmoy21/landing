import React from 'react';
import { useInView, useLoop } from './primitives';

const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

// basic-http, warm cache, bare metal: build, then boot until HTTP answers (ms).
const LANES = [
  {
    key: 'container',
    label: 'container',
    build: 291,
    ready: 521,
    tone: 'text-ct',
    fill: 'bg-ct/75',
    phases: {
      resolve: 'Resolving source & Russelfile',
      build: 'Building package',
      create: 'Preparing container rootfs',
      start: 'Starting rootless Podman container',
      ready: 'Waiting for service to be reachable',
    },
  },
  {
    key: 'microvm',
    label: 'microVM',
    build: 582,
    ready: 863,
    tone: 'text-vm',
    fill: 'bg-vm/75',
    phases: {
      resolve: 'Resolving source & Russelfile',
      build: 'Building package + kernel/busybox',
      create: 'Writing deploy config',
      start: 'Booting the VM',
      ready: 'Waiting for service to be reachable',
    },
  },
] as const;

const SCALE_MS = 1500;
const TICKS = [0, 500, 1000, 1500];

/** Where a lane is at `ms`: which CLI phase, or done. Phase splits inside build/boot are approximate. */
function phaseAt(ms: number, build: number, ready: number) {
  const total = build + ready;
  if (ms >= total) return 'done' as const;
  if (ms < build * 0.15) return 'resolve' as const;
  if (ms < build) return 'build' as const;
  if (ms < build + ready * 0.15) return 'create' as const;
  if (ms < build + ready * 0.7) return 'start' as const;
  return 'ready' as const;
}

/** Both runtimes racing on one clock, from russel deploy to the first HTTP response. */
export const BootDiagram: React.FC = () => {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const t = useLoop(6000, seen);
  const ms = Math.min(1, t / 0.72) * SCALE_MS;
  const pct = (v: number) => `${(v / SCALE_MS) * 100}%`;

  return (
    <div ref={ref} className="font-mono">
      <div className="relative">
        <div className="relative space-y-7 py-1">
          {LANES.map((l) => {
            const total = l.build + l.ready;
            const phase = phaseAt(ms, l.build, l.ready);
            const done = phase === 'done';
            return (
              <div key={l.key}>
                <div className="flex items-baseline justify-between gap-3 text-[13px]">
                  <span className={l.tone}>{l.label}</span>
                  <span className={`tabular-nums ${done ? 'text-fg' : 'text-mute'}`}>
                    {done && <span className="mr-1.5 text-ok">✓</span>}
                    {fmt(Math.min(ms, total))} ms
                  </span>
                </div>
                <div className="relative mt-2 h-3 bg-raise" aria-hidden>
                  {TICKS.slice(1, -1).map((v) => (
                    <div key={v} className="absolute -inset-y-1 w-px bg-line" style={{ left: pct(v) }} />
                  ))}
                  <div className={`hatch absolute inset-y-0 left-0 ${l.tone}`} style={{ width: pct(Math.min(ms, l.build)) }} />
                  <div
                    className={`absolute inset-y-0 ${l.fill}`}
                    style={{ left: pct(l.build), width: pct(Math.max(0, Math.min(ms, total) - l.build)) }}
                  />
                  <div className="absolute -inset-y-1.5 w-px bg-fg/80" style={{ left: pct(Math.min(ms, SCALE_MS - 1)) }} />
                </div>
                <div className="mt-2 truncate text-[12px] text-dimmer">
                  {done ? (
                    <span className="text-mute">deployed · first response</span>
                  ) : (
                    <>
                      <span className={l.tone}>›</span> {phase} · {l.phases[phase]}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative mt-3 h-4 whitespace-nowrap text-[11px] text-dimmer" aria-hidden>
        {TICKS.map((v, i) => (
          <span
            key={v}
            className={`absolute ${i === 0 ? '' : i === TICKS.length - 1 ? '-translate-x-full' : '-translate-x-1/2'}`}
            style={{ left: pct(v) }}
          >
            {v === 0 ? '0' : `${v / 1000} s`}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-dimmer">
        <span className="inline-flex items-center gap-1.5">
          <span className="hatch inline-block h-2.5 w-5 text-mute" aria-hidden /> build
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-5 bg-mute/60" aria-hidden /> boot until http
        </span>
      </div>
    </div>
  );
};

/** Old version keeps serving until the new one answers, then drains. */
export const CutoverDiagram: React.FC = () => {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const t = useLoop(6000, seen);
  const x = Math.min(1, t / 0.8); // playhead, then a short hold
  const DEPLOY = 0.3;
  const READY = 0.56;
  const DRAINED = 0.86;

  const bar = (from: number, to: number) => ({
    left: `${from * 100}%`,
    width: `${Math.max(0, Math.min(x, to) - from) * 100}%`,
  });

  return (
    <div ref={ref} className="font-mono text-[12px]">
      <pre className="border border-line bg-night px-4 py-3 text-[13px] leading-relaxed overflow-x-auto">
        <span className="text-dimmer"># Russelfile.toml</span>
        {'\n'}
        <span className="text-ct">- type = "container"</span>
        {'\n'}
        <span className="text-vm">+ type = "microvm"</span>
      </pre>

      <div className="mt-6 space-y-3" aria-label="Cutover: v1 serves until v2 is ready, then drains">
        {[
          { label: 'v1', parts: [[0, READY, 'hatch text-ct'], [READY, DRAINED, 'border border-dashed border-ct/60']] },
          { label: 'v2', parts: [[DEPLOY, READY, 'border border-dashed border-vm/60'], [READY, 1, 'hatch text-vm']] },
        ].map((row) => (
          <div key={row.label} className="grid grid-cols-[28px_1fr] items-center gap-2">
            <span className="text-mute">{row.label}</span>
            <div className="relative h-3">
              {row.parts.map(([a, b, cls]) => (
                <div key={String(a)} className={`absolute inset-y-0 ${cls}`} style={bar(a as number, b as number)} />
              ))}
            </div>
          </div>
        ))}
        <div className="grid grid-cols-[28px_1fr] gap-2 text-dimmer">
          <span />
          <div className="relative h-4">
            {[
              [DEPLOY, 'deploy'],
              [READY, 'ready'],
              [DRAINED, 'drained'],
            ].map(([at, l]) => (
              <span
                key={l as string}
                className={`absolute -translate-x-1/2 ${x >= (at as number) ? 'text-fg' : ''}`}
                style={{ left: `${(at as number) * 100}%` }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GEN_Y = 132;

const GenNode: React.FC<{ x: number; label: string; sub: string; color: string; square?: boolean }> = ({
  x,
  label,
  sub,
  color,
  square,
}) => (
  <g>
    {square ? (
      <rect x={x - 9} y={GEN_Y - 9} width="18" height="18" fill={color} />
    ) : (
      <circle cx={x} cy={GEN_Y} r="8" fill="var(--color-night)" stroke={color} strokeWidth="1.6" />
    )}
    <text x={x} y={GEN_Y + 36} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" letterSpacing="1.5" fill="var(--color-mute)">
      {label}
    </text>
    <text x={x} y={GEN_Y + 56} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--color-dimmer)">
      {sub}
    </text>
  </g>
);

/**
 * A service's life as generations: each deploy is pinned to its commit and
 * Russelfile, a failed redeploy rolls itself back, and any kept generation
 * can be redeployed.
 */
export const GenerationsDiagram: React.FC = () => {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const t = useLoop(7000, seen, 0);
  const dot = 60 + t * 1110;
  const CT = 'var(--color-ct)';
  const VM = 'var(--color-vm)';
  const WARN = 'var(--color-warn)';
  const MUTE = 'var(--color-mute)';
  const DIM = 'var(--color-dimmer)';
  const Y = GEN_Y;

  return (
    <div ref={ref} className="overflow-x-auto">
      <svg viewBox="0 0 1200 250" className="block w-full min-w-[760px] h-auto" role="img" aria-label="Generations: deploy, update, a failed build that rolls itself back, a runtime switch to microVM, then a rollback to generation 2">
        <defs>
          <marker id="arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0 0 L8 4 L0 8 Z" fill={MUTE} />
          </marker>
          <linearGradient id="tail" x1="0" x2="1">
            <stop offset="0" stopColor={CT} />
            <stop offset="1" stopColor={CT} stopOpacity="0" />
          </linearGradient>
        </defs>

        <line x1="60" y1={Y} x2="700" y2={Y} stroke={CT} strokeWidth="1.6" />
        <line x1="700" y1={Y} x2="980" y2={Y} stroke={VM} strokeWidth="1.6" />
        <line x1="980" y1={Y} x2="1180" y2={Y} stroke="url(#tail)" strokeWidth="1.6" />

        {/* Failed redeploy branches off and dies; generation 2 never stops serving. */}
        <path d={`M470 ${Y} C 515 ${Y}, 520 214, 572 214 L 590 214`} fill="none" stroke={WARN} strokeWidth="1.3" strokeDasharray="3 4" />
        <rect x="592" y="207" width="14" height="14" fill="none" stroke={WARN} strokeWidth="1.4" />
        <path d="M596 211 L602 217 M602 211 L596 217" stroke={WARN} strokeWidth="1.4" />
        <text x="618" y="212" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="1.5" fill={WARN}>
          BUILD FAILED
        </text>
        <text x="618" y="230" fontFamily="var(--font-mono)" fontSize="12" fill={DIM}>
          rolled_back · gen 2 keeps serving
        </text>

        {/* Explicit rollback back to generation 2 */}
        <path d={`M980 ${Y - 14} C 980 20, 360 20, 360 ${Y - 16}`} fill="none" stroke={MUTE} strokeWidth="1" strokeDasharray="2 5" markerEnd="url(#arrow)" />
        <text x="670" y="60" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill={MUTE}>
          russel rollback api --version 2
        </text>

        <GenNode x={100} label="DEPLOY" sub="gen 1 · container" color={CT} />
        <GenNode x={360} label="UPDATE" sub="gen 2 · --refresh" color={CT} />
        <GenNode x={700} label="SWITCH" sub="gen 3 · microvm" color={VM} square />
        <GenNode x={980} label="ROLLBACK" sub="gen 2 · container" color={CT} />

        <circle cx={dot} cy={Y} r="3.5" fill="var(--color-fg)" opacity={t > 0.97 ? 0 : 0.9} />
      </svg>
    </div>
  );
};

/** secret://NAME in the Russelfile, the value only on the control plane. */
export const SecretsDiagram: React.FC = () => {
  const FG = 'var(--color-fg)';
  const MUTE = 'var(--color-mute)';
  const OK = 'var(--color-ok)';
  const mono = { fontFamily: 'var(--font-mono)' } as const;
  return (
    <svg viewBox="0 0 400 260" className="block w-full h-auto" role="img" aria-label="The Russelfile holds a secret reference; the value lives on the control plane and is delivered to the service at deploy">
      <g fill="none" stroke={FG} strokeWidth="1.1" strokeOpacity="0.85">
        <rect x="20" y="30" width="170" height="92" />
        <rect x="230" y="30" width="150" height="92" />
        <rect x="120" y="170" width="160" height="70" />
      </g>
      <text x="32" y="52" {...mono} fontSize="11" fill={MUTE}>Russelfile.toml</text>
      <text x="32" y="80" {...mono} fontSize="11" fill={FG}>DATABASE_URL =</text>
      <text x="32" y="100" {...mono} fontSize="11" fill="var(--color-vm)">"secret://DATABASE_URL"</text>

      <text x="242" y="52" {...mono} fontSize="11" fill={MUTE}>russel-ctrl</text>
      <g transform="translate(290 66)" stroke={OK} strokeWidth="1.4" fill="none">
        <rect x="0" y="12" width="30" height="22" />
        <path d="M6 12 V6 a9 9 0 0 1 18 0 V12" />
        <circle cx="15" cy="23" r="2.5" fill={OK} stroke="none" />
      </g>

      <text x="132" y="194" {...mono} fontSize="11" fill={MUTE}>api · microvm</text>
      <text x="132" y="220" {...mono} fontSize="11" fill={FG}>$DATABASE_URL ✓</text>

      <g stroke={MUTE} strokeWidth="1" fill="none" strokeDasharray="3 4">
        <path d="M190 76 H226" />
        <path d="M305 122 C 305 150, 270 150, 262 166" />
        <path d="M105 122 C 105 150, 130 150, 140 166" />
      </g>
      <text x="44" y="150" {...mono} fontSize="10" fill={MUTE}>reference</text>
      <text x="300" y="158" {...mono} fontSize="10" fill={MUTE}>value</text>
    </svg>
  );
};
