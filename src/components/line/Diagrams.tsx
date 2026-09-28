import React from 'react';
import { useInView, useLoop } from './primitives';


// A real Russelfile, annotated from the field docs in russel-dev's crates/core/src/config.rs.
type RfLine = { text?: string; key?: string; value?: string; tone?: string; note?: string };
const RUSSELFILE: RfLine[] = [
  { text: '[service]' },
  { key: 'name', value: '"api"', note: 'Service id: 1–128 of A–Z, a–z, 0–9, _ and -.' },
  { key: 'source', value: '"."', note: 'Directory inside the repo. Relative only; ".." is rejected.' },
  { key: 'port', value: '3000', note: 'Where the app listens in the guest. Russel also sets PORT.' },
  { key: 'memory', value: '"256mb"', note: 'microVM RAM, or the container --memory limit. At least 16mb.' },
  { key: 'type', value: '"microvm"', tone: 'text-vm', note: 'container (the default) or microvm. The one line to switch.' },
  { key: 'cpus', value: '2', note: 'microVM vCPUs, or the container --cpus limit. 1 to 32.' },
  { text: '' },
  { text: '[ingress]' },
  { key: 'host', value: '"api.example.com"', note: 'The exact Traefik Host() rule for this service.' },
  { key: 'port', value: '8080', note: 'Host-side backend port that Traefik routes to.' },
  { text: '' },
  { text: '[service.env]' },
  { key: 'API_KEY', value: '"secret://API_KEY"', note: 'Resolved from russel secrets on the control plane at deploy.' },
];
const RF_KEYED = RUSSELFILE.map((l, i) => (l.key ? i : -1)).filter((i) => i >= 0);

/** The Russelfile, one key at a time: the active line is highlighted and explained below. */
export const RusselfileDiagram: React.FC = () => {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const [hover, setHover] = React.useState<number | null>(null);
  const t = useLoop(RF_KEYED.length * 2200, seen && hover === null, 0);
  const active = hover ?? RF_KEYED[Math.floor(t * RF_KEYED.length) % RF_KEYED.length];
  const width = Math.max(...RUSSELFILE.filter((l) => l.key).map((l) => l.key!.length));

  return (
    <div ref={ref} className="font-mono">
      <div className="overflow-hidden rounded-[10px] border border-line bg-night">
        <div className="border-b border-line px-4 py-2 text-[11px] text-dimmer">Russelfile.toml</div>
        <div className="overflow-x-auto py-2 text-[12.5px] leading-[1.8]" onMouseLeave={() => setHover(null)}>
          {RUSSELFILE.map((l, i) =>
            l.key ? (
              <div
                key={i}
                onMouseEnter={() => setHover(i)}
                className={`relative cursor-default whitespace-pre px-4 ${active === i ? 'bg-raise' : ''}`}
              >
                <span className={`absolute inset-y-0 left-0 w-0.5 ${active === i ? 'bg-vm' : ''}`} aria-hidden />
                <span className={active === i ? 'text-fg' : 'text-mute'}>{l.key.padEnd(width)}</span>
                <span className="text-dimmer"> = </span>
                <span className={l.tone ?? (active === i ? 'text-ok' : 'text-ok/85')}>{l.value}</span>
              </div>
            ) : (
              <div key={i} className="whitespace-pre px-4 text-fg">
                {l.text || ' '}
              </div>
            ),
          )}
        </div>
      </div>
      <p className="mt-4 min-h-[3.2em] text-[12.5px] leading-relaxed text-mute" aria-live="polite">
        <span className="text-fg">{RUSSELFILE[active].key}</span> · {RUSSELFILE[active].note}
      </p>
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
      <pre className="rounded-[10px] border border-line bg-night px-4 py-3 text-[13px] leading-relaxed overflow-x-auto">
        <span className="text-dimmer"># Russelfile.toml</span>
        {'\n'}
        <span className="text-ct">- type = "container"</span>
        {'\n'}
        <span className="text-vm">+ type = "microvm"</span>
      </pre>

      <div className="mt-6 space-y-3" aria-label="Cutover: v1 serves until v2 is ready, then drains">
        {[
          { label: 'v1', parts: [[0, READY, 'hatch text-ct'], [READY, DRAINED, 'border-[1.5px] border-dashed border-ct bg-ct/10']] },
          { label: 'v2', parts: [[DEPLOY, READY, 'border-[1.5px] border-dashed border-vm bg-vm/10'], [READY, 1, 'hatch text-vm']] },
        ].map((row) => (
          <div key={row.label} className="grid grid-cols-[28px_1fr] items-center gap-2">
            <span className="text-mute">{row.label}</span>
            <div className="relative h-4">
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

type GenRow = { id: string; label: string; runtime: 'container' | 'microvm' | 'failed'; from: number };
const GEN_ROWS: GenRow[] = [
  { id: 'g1', label: 'gen 1', runtime: 'container', from: 0 },
  { id: 'g2', label: 'gen 2', runtime: 'container', from: 1 },
  { id: 'fail', label: 'build failed', runtime: 'failed', from: 2 },
  { id: 'g3', label: 'gen 3', runtime: 'microvm', from: 3 },
];
// One entry per step: the command run, what it did, and which generation serves afterwards.
const GEN_STEPS: { cmd: string; result: string; serving: string; tone: string }[] = [
  { cmd: 'russel apply <repo>', result: '✓ deployed', serving: 'g1', tone: 'text-ok' },
  { cmd: 'russel update api --refresh', result: '✓ deployed', serving: 'g2', tone: 'text-ok' },
  { cmd: 'russel update api --refresh', result: '↩ rolled_back', serving: 'g2', tone: 'text-warn' },
  { cmd: 'russel update api --refresh', result: '✓ deployed · microvm', serving: 'g3', tone: 'text-ok' },
  { cmd: 'russel rollback api --version 2', result: '✓ deployed', serving: 'g2', tone: 'text-ok' },
];

/**
 * A service's history as generations: each deploy is pinned to its commit and
 * Russelfile, a failed redeploy rolls itself back, and any kept one can come back.
 */
export const GenerationsDiagram: React.FC = () => {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  // Six slots for five steps, so the last state holds a beat before looping.
  const t = useLoop(GEN_STEPS.length * 1900 + 1900, seen, 0.99);
  const step = Math.min(GEN_STEPS.length - 1, Math.floor(t * (GEN_STEPS.length + 1)));
  const now = GEN_STEPS[step];

  return (
    <div ref={ref} className="overflow-hidden rounded-[10px] border border-line bg-night font-mono text-[12.5px]">
      <div className="flex justify-between border-b border-line px-4 py-2 text-[11px] text-dimmer">
        <span>api · generations</span>
        <span>
          step {step + 1}/{GEN_STEPS.length}
        </span>
      </div>

      <ul className="relative px-4 py-3">
        <span className="absolute bottom-6 left-[27px] top-6 w-px bg-line" aria-hidden />
        {GEN_ROWS.map((r) => {
          const shown = step >= r.from;
          const serving = now.serving === r.id;
          const color = r.runtime === 'microvm' ? 'text-vm' : r.runtime === 'container' ? 'text-ct' : 'text-warn';
          return (
            <li
              key={r.id}
              className={`relative grid grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-x-2 py-1.5 transition-opacity duration-500 ${
                shown ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span className="flex justify-center" aria-hidden>
                {r.runtime === 'failed' ? (
                  <span className="grid h-3 w-3 place-items-center border border-warn text-[8px] leading-none text-warn">✕</span>
                ) : r.runtime === 'microvm' ? (
                  <span className="h-3 w-3 bg-vm" />
                ) : (
                  <span className={`h-3 w-3 rounded-full border-[1.5px] border-ct ${serving ? 'bg-ct' : 'bg-night'}`} />
                )}
              </span>
              <span className={serving ? 'text-fg' : r.runtime === 'failed' ? 'text-warn' : 'text-mute'}>
                {r.label} <span className={`ml-1 ${r.runtime === 'failed' ? 'text-dimmer' : color}`}>{r.runtime === 'failed' ? 'rolled_back' : r.runtime}</span>
              </span>
              <span className={`text-[11px] transition-opacity duration-300 ${serving ? 'text-ok opacity-100' : 'opacity-0'}`}>
                ● serving
              </span>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-line px-4 py-3 leading-relaxed" aria-live="polite">
        <div className="truncate text-fg">
          <span className="select-none text-dimmer">$ </span>
          {now.cmd}
        </div>
        <div className={now.tone}>{now.result}</div>
      </div>
    </div>
  );
};
