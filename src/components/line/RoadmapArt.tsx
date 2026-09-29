import React from 'react';
import { useInView, useLoop } from './primitives';

// Line art for the Coming soon tiles, drawn like SandboxArt: ink on paper, violet = microVM, blue = container.
// None of this ships yet; the diagrams follow the russel-dev plans and issues cited in Roadmap.tsx.

const INK = 'var(--color-fg)';
const MUTE = 'var(--color-mute)';
const DIM = 'var(--color-dimmer)';
const PAPER = 'var(--color-night)';
const LINE = 'var(--color-line)';
const OK = 'var(--color-ok)';
const VM = 'var(--color-vm)';
const CT = 'var(--color-ct)';

const T: React.FC<{ x: number; y: number; children: React.ReactNode; fill?: string; size?: number; anchor?: 'start' | 'middle' | 'end' }> = ({
  x,
  y,
  children,
  fill = INK,
  size = 12,
  anchor = 'middle',
}) => (
  <text x={x} y={y} textAnchor={anchor} fontFamily="var(--font-mono)" fontSize={size} fill={fill} style={{ transition: 'fill 400ms ease' }}>
    {children}
  </text>
);

// Dashes move by animating the dash offset (`anim-flow` in global.css).
const flow = (speed: number, color: string, width = 1.6) => ({
  stroke: color,
  strokeWidth: width,
  strokeDasharray: '6 10',
  className: 'anim-flow',
  style: { animationDuration: `${speed}s` },
});

/** Step through `n` states, holding the last one for an extra slot before the loop restarts. */
function useSteps<T extends Element>(n: number, ms: number) {
  const [ref, seen] = useInView<T>(0.4);
  const t = useLoop((n + 1) * ms, seen, 0.99);
  const step = Math.min(n - 1, Math.floor(t * (n + 1)));
  return { ref, step, t };
}

const svgProps = (label: string) => ({
  viewBox: '0 0 400 270',
  className: 'block h-full w-full',
  role: 'img',
  'aria-label': label,
});

/* ------------------------------------------------------------------ hardened containers */

const SYSCALLS = ['openat()', 'read()', 'mmap()', 'connect()', 'write()'];

/** Syscalls from the apps land in a userspace kernel; only a narrow, filtered set reaches the host. */
export const HardenedArt: React.FC = () => {
  const { ref, step } = useSteps<SVGSVGElement>(SYSCALLS.length, 900);
  const apps = [
    { name: 'api', x: 50 },
    { name: 'job', x: 230 },
  ];
  return (
    <svg ref={ref} {...svgProps('Containers make syscalls into a userspace kernel; only a narrow set reaches the host kernel, with no /dev/kvm needed')}>
      <defs>
        <pattern id="rm-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke={INK} strokeWidth="0.7" strokeOpacity="0.35" />
        </pattern>
      </defs>

      {apps.map((a) =>
        [0, 1, 2].map((k) => {
          const x = a.x + 30 + k * 30;
          return (
            <g key={`${a.name}-${k}`} fill="none">
              <path d={`M${x} 68 L${x} 110`} stroke={LINE} strokeWidth="1.1" />
              <path d={`M${x} 68 L${x} 110`} {...flow(0.5 + k * 0.17, CT)} />
            </g>
          );
        }),
      )}
      <g fill="none">
        <path d="M200 164 L200 206" stroke={LINE} strokeWidth="1.1" />
        <path d="M200 164 L200 206" {...flow(1.1, OK, 1.2)} />
      </g>

      {apps.map((a) => (
        <g key={a.name}>
          <rect x={a.x} y="20" width="120" height="48" fill={PAPER} stroke={CT} strokeWidth="1.5" />
          <T x={a.x + 60} y={49}>
            {a.name}
          </T>
        </g>
      ))}

      <rect x="30" y="110" width="340" height="54" fill={PAPER} stroke={INK} strokeWidth="1.3" />
      <rect x="30" y="110" width="340" height="54" fill="url(#rm-hatch)" />
      <rect x="100" y="120" width="200" height="34" fill={PAPER} />
      <T x={200} y={134} size={11} fill={MUTE}>
        gVisor · userspace kernel
      </T>
      <T x={200} y={149} size={11} fill={CT}>
        {SYSCALLS[step]}
      </T>
      <T x={212} y={190} size={10} fill={OK} anchor="start">
        few, filtered
      </T>

      <rect x="30" y="206" width="340" height="34" fill={PAPER} stroke={DIM} strokeWidth="1.1" />
      <T x={200} y={227} size={11} fill={MUTE}>
        host kernel
      </T>
      <T x={200} y={262} size={11} fill={MUTE}>
        any VPS · no /dev/kvm
      </T>
    </svg>
  );
};

/* ------------------------------------------------------------------ deploy on git push */

const STAGES = [
  { name: 'push', note: 'main' },
  { name: 'webhook', note: 'signed ✓' },
  { name: 'build', note: 'nix' },
  { name: 'migrate', note: 'before traffic' },
  { name: 'live', note: 'gen 8' },
];

/** A push walks the pipeline; traffic only moves to the new generation at the end. */
export const PushArt: React.FC = () => {
  const { ref, step } = useSteps<SVGSVGElement>(STAGES.length, 1300);
  const x = (i: number) => 40 + i * 80;
  const moved = step >= STAGES.length - 1;
  return (
    <svg ref={ref} {...svgProps('git push triggers a signed webhook, a build and migrations; traffic moves to the new generation last')}>
      <T x={30} y={34} anchor="start" size={12}>
        <tspan fill={DIM}>$ </tspan>git push origin main
      </T>

      <line x1={x(0)} y1="100" x2={x(4)} y2="100" stroke={LINE} strokeWidth="1.2" />
      <line
        x1={x(0)}
        y1="100"
        x2={x(Math.min(step, 4))}
        y2="100"
        stroke={VM}
        strokeWidth="1.6"
        style={{ transition: 'all 500ms ease' }}
      />
      {STAGES.map((s, i) => {
        const done = i < step || (moved && i === step);
        const active = i === step && !moved;
        const color = done ? (i === 4 ? OK : VM) : active ? INK : DIM;
        return (
          <g key={s.name}>
            <circle
              cx={x(i)}
              cy="100"
              r="9"
              fill={done ? `color-mix(in srgb, ${i === 4 ? 'var(--color-ok)' : 'var(--color-vm)'} 20%, var(--color-night))` : PAPER}
              stroke={color}
              strokeWidth="1.5"
              style={{ transition: 'all 400ms ease' }}
            />
            {active && <circle cx={x(i)} cy="100" r="3" fill={INK} />}
            <T x={x(i)} y={132} size={11} fill={i <= step ? INK : DIM}>
              {s.name}
            </T>
            <T x={x(i)} y={148} size={10} fill={i <= step ? MUTE : DIM}>
              {s.note}
            </T>
          </g>
        );
      })}

      <T x={30} y={196} anchor="start" size={11} fill={MUTE}>
        traffic
      </T>
      <rect x="30" y="206" width="340" height="26" fill="var(--color-raise)" />
      <rect x="30" y="206" width={moved ? 0 : 340} height="26" fill={MUTE} opacity="0.35" style={{ transition: 'width 700ms ease' }} />
      <rect x={moved ? 30 : 370} y="206" width={moved ? 340 : 0} height="26" fill={OK} opacity="0.8" style={{ transition: 'all 700ms ease' }} />
      <T x={200} y={223} size={11} fill={moved ? PAPER : INK}>
        {moved ? 'gen 8' : 'gen 7'}
      </T>
      <T x={30} y={256} anchor="start" size={10} fill={DIM}>
        no CI to set up
      </T>
    </svg>
  );
};

/* ------------------------------------------------------------------ replicas */

const COUNTS = [1, 2, 3, 4, 2];

/** One hostname, a router, and replicas that come and go with load. */
export const ReplicasArt: React.FC = () => {
  const { ref, step } = useSteps<SVGSVGElement>(COUNTS.length, 1500);
  const n = COUNTS[step];
  const ry = (i: number) => 26 + i * 56;
  const RX = 274;
  return (
    <svg ref={ref} {...svgProps('Requests to one hostname are balanced across replicas that are created and destroyed with load')}>
      {[0, 1, 2, 3].map((i) => {
        const on = i < n;
        const d = `M228 125 C252 125 250 ${ry(i) + 20} ${RX} ${ry(i) + 20}`;
        return (
          <g key={i} fill="none">
            <path d={d} stroke={LINE} strokeWidth="1.1" strokeDasharray={on ? undefined : '3 4'} />
            {on && <path d={d} {...flow(0.5 + i * 0.13, OK)} />}
          </g>
        );
      })}
      <g fill="none">
        <path d="M140 125 L168 125" stroke={LINE} strokeWidth="1.1" />
        <path d="M140 125 L168 125" {...flow(0.45, OK)} />
      </g>

      <rect x="16" y="104" width="124" height="42" fill={PAPER} stroke={INK} strokeWidth="1.3" />
      <T x={78} y={130} size={11}>
        api.example.com
      </T>

      <rect x="168" y="104" width="60" height="42" fill={PAPER} stroke={INK} strokeWidth="1.3" />
      {[0, 1, 2].map((k) => (
        <line key={k} x1="176" y1={116 + k * 9} x2="220" y2={116 + k * 9} stroke={INK} strokeWidth="0.8" strokeOpacity="0.45" />
      ))}
      <T x={198} y={166} size={10} fill={MUTE}>
        traefik
      </T>

      {[0, 1, 2, 3].map((i) => {
        const on = i < n;
        return (
          <g key={i} style={{ opacity: on ? 1 : 0.2, transition: 'opacity 500ms ease' }}>
            <rect x={RX} y={ry(i)} width="110" height="40" fill={PAPER} stroke={on ? INK : DIM} strokeWidth="1.3" strokeDasharray={on ? undefined : '3 4'} />
            <T x={RX + 14} y={ry(i) + 25} size={11} anchor="start" fill={on ? INK : DIM}>
              api-{i + 1}
            </T>
            <circle cx={RX + 94} cy={ry(i) + 20} r="3.5" fill={on ? OK : 'none'} stroke={on ? OK : DIM} />
          </g>
        );
      })}

      <T x={16} y={214} anchor="start" size={11} fill={MUTE}>
        load
      </T>
      <rect x="16" y="222" width="212" height="8" fill="var(--color-raise)" />
      <rect x="16" y="222" width={(n / 4) * 212} height="8" fill={OK} opacity="0.8" style={{ transition: 'width 600ms ease' }} />
      <T x={16} y={254} anchor="start" size={11} fill={INK}>
        replicas = {n}
      </T>
    </svg>
  );
};

/* ------------------------------------------------------------------ live resize */

const SIZES = [
  { cpus: 2, mem: 512, event: 'running' },
  { cpus: 4, mem: 512, event: '+2 vCPU hotplugged' },
  { cpus: 4, mem: 1024, event: '+512 MiB hotplugged' },
];

/** vCPUs and memory grow inside a running microVM while its uptime keeps counting. */
export const ResizeArt: React.FC = () => {
  const [ref, seen] = useInView<SVGSVGElement>(0.4);
  const t = useLoop(4 * 1800, seen, 0.99);
  const step = Math.min(2, Math.floor(t * 4));
  const s = SIZES[step];
  // Uptime never resets: that's the point.
  const secs = 7 + Math.floor(t * 7.2 * 4);
  const uptime = `3d 04:12:${String(secs % 60).padStart(2, '0')}`;
  const MAXC = 8;
  const MAXM = 2048;
  return (
    <svg ref={ref} {...svgProps('A running microVM gains vCPUs and memory through hotplug without a reboot; its uptime keeps counting')}>
      <rect x="20" y="16" width="360" height="200" fill={PAPER} stroke={VM} strokeWidth="1.6" />
      <line x1="20" y1="46" x2="380" y2="46" stroke={LINE} />
      <T x={36} y={36} anchor="start" size={11.5}>
        api · microVM
      </T>
      <T x={364} y={36} anchor="end" size={11} fill={OK}>
        up {uptime}
      </T>

      <T x={36} y={80} anchor="start" size={11} fill={MUTE}>
        vcpu
      </T>
      {Array.from({ length: MAXC }, (_, i) => {
        const on = i < s.cpus;
        return (
          <rect
            key={i}
            x={96 + i * 34}
            y="64"
            width="26"
            height="26"
            fill={on ? 'color-mix(in srgb, var(--color-vm) 22%, var(--color-night))' : PAPER}
            stroke={on ? VM : DIM}
            strokeWidth="1.2"
            strokeDasharray={on ? undefined : '3 3'}
            style={{ transition: 'all 400ms ease' }}
          />
        );
      })}
      <T x={364} y={110} anchor="end" size={10} fill={DIM}>
        {s.cpus} of {MAXC}
      </T>

      <T x={36} y={146} anchor="start" size={11} fill={MUTE}>
        memory
      </T>
      <rect x="96" y="134" width="268" height="16" fill={PAPER} stroke={DIM} strokeWidth="1" strokeDasharray="3 3" />
      <rect x="96" y="134" width={(s.mem / MAXM) * 268} height="16" fill={VM} style={{ transition: 'width 600ms ease' }} />
      <T x={364} y={170} anchor="end" size={10} fill={DIM}>
        {s.mem} of {MAXM} MiB
      </T>

      <T x={36} y={200} anchor="start" size={11} fill={step === 0 ? MUTE : VM}>
        {s.event}
      </T>

      <T x={20} y={250} anchor="start" size={11} fill={OK}>
        ✓ no reboot · no redeploy
      </T>
    </svg>
  );
};

/* ------------------------------------------------------------------ full linux guests */

const UNITS = ['app.service', 'sshd.service', 'cron.service', 'journald'];

/** The minimal guest runs one process; the Linux guest boots systemd and its units. */
export const GuestArt: React.FC = () => {
  const { ref, step } = useSteps<SVGSVGElement>(UNITS.length + 1, 900);
  return (
    <svg ref={ref} {...svgProps('Today the guest runs a minimal busybox init and the app; a Linux guest boots systemd and starts its units')}>
      {/* busybox */}
      <rect x="16" y="16" width="140" height="196" fill={PAPER} stroke={DIM} strokeWidth="1.2" />
      <T x={86} y={40} size={11} fill={MUTE}>
        today
      </T>
      <rect x="36" y="60" width="100" height="32" fill={PAPER} stroke={INK} strokeWidth="1.1" />
      <T x={86} y={80} size={11}>
        busybox init
      </T>
      <line x1="86" y1="92" x2="86" y2="120" stroke={INK} strokeWidth="1" />
      <rect x="36" y="120" width="100" height="32" fill={PAPER} stroke={INK} strokeWidth="1.1" />
      <T x={86} y={140} size={11}>
        app
      </T>

      {/* linux */}
      <rect x="176" y="16" width="208" height="196" fill={PAPER} stroke={VM} strokeWidth="1.5" />
      <T x={280} y={40} size={11} fill={VM}>
        linux guest
      </T>
      <rect x="196" y="54" width="168" height="30" fill={step >= 0 ? 'color-mix(in srgb, var(--color-vm) 18%, var(--color-night))' : PAPER} stroke={VM} strokeWidth="1.2" />
      <T x={280} y={73} size={11}>
        systemd · pid 1
      </T>
      <line x1="210" y1="84" x2="210" y2={96 + (UNITS.length - 1) * 26 + 10} stroke={LINE} strokeWidth="1" />
      {UNITS.map((u, i) => {
        const up = step > i;
        const y = 96 + i * 26;
        return (
          <g key={u} style={{ opacity: up ? 1 : 0.25, transition: 'opacity 400ms ease' }}>
            <line x1="210" y1={y + 10} x2="222" y2={y + 10} stroke={LINE} strokeWidth="1" />
            <T x={228} y={y + 14} anchor="start" size={11} fill={up ? INK : DIM}>
              {u}
            </T>
            <T x={370} y={y + 14} anchor="end" size={11} fill={up ? OK : DIM}>
              {up ? '✓' : '·'}
            </T>
          </g>
        );
      })}

      <T x={86} y={250} size={10.5} fill={DIM}>
        guest = "busybox"
      </T>
      <T x={280} y={250} size={10.5} fill={MUTE}>
        guest = "linux"
      </T>
    </svg>
  );
};

