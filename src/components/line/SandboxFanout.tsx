import React from 'react';
import { AGENTS, AgentMark } from './agentLogos';
import { useInView, useLoop, useReducedMotion } from './primitives';

// One prompt fans out into parallel sandboxes; the fix that passes is kept, the rest are deleted.
// All times are ms into the loop.
const PERIOD = 16000;
const SPIN = [0, 2600];
const TYPE = [2900, 5400];
const BRANCH = [5500, 6200];
const BOOT = 6300;
const VERDICT = 12600;
const FADE = PERIOD - 500;

const ITEM = 96;
const LAPS = 3;
const TARGET = LAPS * AGENTS.length; // Claude Code is AGENTS[0]
// One spare lap on each side so the window is never empty at either end of the spin.
const STRIP = Array.from({ length: LAPS + 3 }, () => AGENTS).flat();
const START = AGENTS.length * ITEM;

const PROMPT =
  'Hey Claude, checkout.test.ts keeps flaking. Try three fixes side by side and keep the one that passes 20 runs straight.';

type Line = { at: number; verb: string; text: string; diff?: string };
type Box = { id: string; task: string; lines: Line[]; test: [number, number]; failed: number };

const BOXES: Box[] = [
  {
    id: 'sbx-1',
    task: 'retry the payment call',
    lines: [
      { at: 7000, verb: 'read', text: 'tests/checkout.test.ts' },
      { at: 7900, verb: 'edit', text: 'src/payments/client.ts', diff: '+12 −3' },
    ],
    test: [9000, 11300],
    failed: 3,
  },
  {
    id: 'sbx-2',
    task: 'fake the clock in the test',
    lines: [
      { at: 7150, verb: 'read', text: 'tests/checkout.test.ts' },
      { at: 8100, verb: 'edit', text: 'tests/checkout.test.ts', diff: '+8 −2' },
    ],
    test: [9300, 10800],
    failed: 1,
  },
  {
    id: 'sbx-3',
    task: 'lock the cart before checkout',
    lines: [
      { at: 7300, verb: 'read', text: 'src/cart/reserve.ts' },
      { at: 8500, verb: 'edit', text: 'src/cart/reserve.ts', diff: '+5 −1' },
    ],
    test: [9800, 12200],
    failed: 0,
  },
];

const clamp = (x: number) => Math.min(1, Math.max(0, x));
const span = (ms: number, [a, b]: number[]) => clamp((ms - a) / (b - a));
const easeOut = (x: number) => 1 - Math.pow(1 - x, 4);

// Centre of the outer columns in a three-column grid with a 1rem gap.
const BAR_INSET = 'calc((100% - 2rem) / 6)';

const SandboxCard: React.FC<{ box: Box; ms: number; i: number }> = ({ box, ms, i }) => {
  const shown = ms >= BOOT + i * 150;
  const booted = ms >= BOOT + 600 + i * 150;
  const run = span(ms, box.test);
  const done = ms >= box.test[1];
  const winner = box.failed === 0;
  const verdict = ms >= VERDICT;
  const runs = Math.floor(run * 20);

  const status = !booted
    ? ['creating', 'text-dimmer']
    : !done
      ? ['running', 'text-ct']
      : verdict && !winner
        ? ['deleted', 'text-dimmer']
        : winner
          ? [verdict ? 'kept' : 'passed', 'text-ok']
          : ['failed', 'text-err'];

  return (
    <div
      className={`bg-cell flex h-full flex-col border font-mono text-[12.5px] transition-[opacity,transform,border-color,box-shadow] ${
        shown ? 'duration-500' : 'duration-0'
      } ${verdict && winner ? 'border-vm shadow-[0_0_0_3px_rgba(90,61,196,0.12)]' : 'border-line'} ${
        shown ? (verdict && !winner ? 'opacity-50' : 'opacity-100') : 'translate-y-2 opacity-0'
      }`}
    >
      <div className="border-line flex items-center justify-between gap-3 border-b px-4 py-2.5">
        <span className="text-fg">{box.id}</span>
        <span className={`inline-flex items-center gap-2 text-[11.5px] ${status[1]}`}>
          <span className={`h-1.5 w-1.5 rounded-full bg-current ${booted && !done ? 'anim-blink' : ''}`} aria-hidden />
          {status[0]}
        </span>
      </div>

      <div className="flex-1 space-y-1.5 px-4 py-3.5">
        <p className="text-mute mb-3 font-sans text-[13.5px] leading-snug">{box.task}</p>
        {box.lines.map((l) => (
          <div
            key={l.verb + l.text}
            className={`grid grid-cols-[40px_minmax(0,1fr)_auto] gap-x-2 transition-opacity duration-300 ${ms >= l.at ? 'opacity-100' : 'opacity-0'}`}
          >
            <span className="text-dimmer">{l.verb}</span>
            <span className="text-fg truncate">{l.text}</span>
            <span className="text-dimmer">{l.diff}</span>
          </div>
        ))}
        <div
          className={`grid grid-cols-[40px_minmax(0,1fr)_auto] gap-x-2 transition-opacity duration-300 ${run > 0 ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="text-dimmer">test</span>
          <span className="text-fg truncate">npm test checkout</span>
          <span className="text-dimmer tabular-nums">×20</span>
        </div>

        {/* 20 runs, one tick each; the failures land on fixed runs so the loop replays identically. */}
        <div className={`pt-2 transition-opacity duration-300 ${run > 0 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px]">
            {Array.from({ length: 20 }, (_, k) => {
              const bad = k % 7 === 4 && Math.floor(k / 7) < box.failed;
              return (
                <span key={k} className={`h-3 ${k < runs ? (bad ? 'bg-err' : 'hatch text-ok') : 'bg-raise'}`} aria-hidden />
              );
            })}
          </div>
          <div className="mt-2 min-h-[1.5em] text-[12px]">
            {done ? (
              winner ? (
                <span className="text-ok">✓ 20 of 20 passed</span>
              ) : (
                <span className="text-err">✗ {box.failed} of 20 failed</span>
              )
            ) : run > 0 ? (
              <span className="text-dimmer tabular-nums">run {runs} of 20</span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-line text-dimmer border-t px-4 py-2 text-[11.5px]">2 vcpu · 4gb · deleted when done</div>
    </div>
  );
};

export const SandboxFanout: React.FC = () => {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const reduced = useReducedMotion();
  // Before it scrolls into view the loop rests at the start; with reduced motion, at the finished frame.
  const t = useLoop(PERIOD, seen, reduced ? 0.97 : 0);
  const ms = t * PERIOD;

  const spin = easeOut(span(ms, SPIN));
  const offset = START + spin * TARGET * ITEM;
  const centre = Math.round(offset / ITEM);
  const landed = ms >= SPIN[1];
  const agent = STRIP[centre];
  const typed = PROMPT.slice(0, Math.round(span(ms, TYPE) * PROMPT.length));
  const typing = ms >= TYPE[0] && ms < TYPE[1] + 400;
  const branch = span(ms, BRANCH);
  const verdict = ms >= VERDICT + 300;
  // Fade out at the end of the loop and back in at the start, so the restart never jumps.
  const fade = reduced ? 1 : Math.min(span(ms, [0, 400]), 1 - span(ms, [FADE, PERIOD]));

  return (
    <div
      ref={ref}
      style={{ opacity: fade }}
      aria-label="Claude Code is picked, then one prompt starts three sandboxes that each try a fix; the one that passes is kept."
    >
      {/* Roulette: the strip decelerates until Claude Code sits under the marker. */}
      <div className="relative mx-auto max-w-[620px] overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_22%,#000_78%,transparent)]">
        <div
          className="flex py-3"
          style={{ marginLeft: '50%', transform: `translateX(${-(offset + ITEM / 2)}px)`, width: STRIP.length * ITEM }}
        >
          {STRIP.map((a, i) => {
            const on = i === centre;
            return (
              <div key={i} className="flex shrink-0 flex-col items-center gap-2" style={{ width: ITEM }}>
                <div
                  className={`flex h-14 w-14 items-center justify-center border transition-all duration-200 ${
                    on && landed
                      ? 'border-vm bg-vm/[0.07] opacity-100 saturate-100'
                      : on
                        ? 'border-line bg-cell opacity-100 saturate-100'
                        : 'border-transparent opacity-40 saturate-[0.6]'
                  }`}
                >
                  <AgentMark mark={a} className="h-7 w-7" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* The prompt. */}
      <div className="border-line bg-cell mx-auto mt-4 max-w-[720px] border px-5 py-4 sm:px-6">
        <div className="text-dimmer font-mono text-[12.5px]">
          You, to{' '}
          <span
            className={!landed ? 'text-mute' : undefined}
            style={landed ? { color: agent.colors?.[0] ?? agent.color ?? 'var(--color-vm)' } : undefined}
          >
            {agent.name}
          </span>
        </div>
        <p className="text-fg mt-2 min-h-[4.5em] text-[16px] leading-relaxed sm:min-h-[3em] sm:text-[17px]">
          {typed}
          {typing && <span className="anim-blink bg-fg ml-0.5 inline-block h-4 w-2 translate-y-0.5" aria-hidden />}
        </p>
      </div>

      {/* Branches: stem, then a bar out to the outer columns, then a drop into each sandbox.
          Hairline divs rather than SVG so they line up with the grid's gap at any width. */}
      <div className="relative hidden h-14 lg:block" aria-hidden>
        <div className="bg-line absolute top-0 left-1/2 h-7 w-px origin-top" style={{ transform: `scaleY(${clamp(branch / 0.3)})` }} />
        <div
          className="bg-line absolute top-7 h-px"
          style={{ left: BAR_INSET, right: BAR_INSET, transform: `scaleX(${clamp((branch - 0.3) / 0.4)})` }}
        />
        <div className="absolute inset-x-0 top-7 grid h-7 grid-cols-3 gap-4">
          {BOXES.map((b) => (
            <div
              key={b.id}
              className="bg-line mx-auto h-full w-px origin-top"
              style={{ transform: `scaleY(${clamp((branch - 0.7) / 0.3)})` }}
            />
          ))}
        </div>
      </div>
      <div className="bg-line mx-auto h-8 w-px origin-top lg:hidden" style={{ transform: `scaleY(${branch})` }} aria-hidden />

      <div className="grid gap-4 lg:grid-cols-3">
        {BOXES.map((b, i) => (
          <SandboxCard key={b.id} box={b} ms={ms} i={i} />
        ))}
      </div>

      <p
        className={`text-mute mt-5 text-center font-mono text-[12.5px] transition-opacity ${
          verdict ? 'opacity-100 duration-500' : 'opacity-0 duration-0'
        }`}
      >
        kept <span className="text-vm">sbx-3</span> · patch exported to your branch · sbx-1, sbx-2 deleted
      </p>
    </div>
  );
};
