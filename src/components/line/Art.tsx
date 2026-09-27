import React from 'react';
import { useInView, useLoop } from './primitives';

// Hand-built line art: ink on paper. Violet marks a microVM and blue a container, as in the dashboard.
const INK = 'var(--color-fg)';
const VM = 'var(--color-vm)';
const CT = 'var(--color-ct)';
const OK = 'var(--color-ok)';
const PAPER = 'var(--color-night)';

const Label: React.FC<{ x: number; y: number; children: React.ReactNode; fill?: string; size?: number; anchor?: 'start' | 'middle' | 'end' }> = ({
  x,
  y,
  children,
  fill = INK,
  size = 13,
  anchor = 'middle',
}) => (
  <text x={x} y={y} textAnchor={anchor} fontFamily="var(--font-mono)" fontSize={size} fill={fill}>
    {children}
  </text>
);

/** Container stack vs microVM stack, bottom-up to the same hardware. */
export const RuntimeArt: React.FC = () => {
  const apps = ['api', 'worker', 'db'];
  return (
    <svg viewBox="0 30 400 350" className="block w-full h-auto" role="img" aria-label="Containers share one host kernel; each microVM gets its own kernel on KVM">
      <defs>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={INK} strokeWidth="0.7" strokeOpacity="0.45" />
        </pattern>
      </defs>
      <Label x={110} y={64} size={14} fill={CT}>container</Label>
      <Label x={290} y={64} size={14} fill={VM}>microVM</Label>

      <g stroke={INK} strokeWidth="1.1" fill={PAPER}>
        {apps.map((a, i) => (
          <rect key={a} x={30 + i * 56} y="92" width="48" height="78" stroke={CT} strokeWidth="1.5" />
        ))}
        <rect x="30" y="180" width="160" height="36" />
        <rect x="30" y="226" width="160" height="58" fill="url(#hatch)" />
      </g>
      {apps.map((a, i) => (
        <Label key={a} x={54 + i * 56} y={135} size={12}>
          {a}
        </Label>
      ))}
      <Label x={110} y={202} size={12}>podman</Label>
      <rect x="50" y="244" width="120" height="22" fill={PAPER} />
      <Label x={110} y={259} size={12}>shared kernel</Label>

      {apps.map((a, i) => {
        const x = 210 + i * 56;
        return (
          <g key={a}>
            <rect x={x} y="84" width="48" height="152" fill={PAPER} stroke={INK} strokeWidth="1.8" />
            <rect x={x + 4} y="92" width="40" height="78" fill={PAPER} stroke={INK} strokeWidth="1" />
            <rect x={x + 4} y="178" width="40" height="50" fill={VM} />
            <Label x={x + 24} y={135} size={10.5}>
              {a}
            </Label>
            <Label x={x + 24} y={206} size={10} fill={PAPER}>
              kernel
            </Label>
          </g>
        );
      })}
      <rect x="210" y="246" width="160" height="38" fill={PAPER} stroke={INK} strokeWidth="1.1" />
      <Label x={290} y={269} size={12}>KVM</Label>

      <rect x="30" y="294" width="340" height="34" fill={PAPER} stroke={INK} strokeWidth="1.1" />
      {Array.from({ length: 30 }, (_, i) => (
        <line key={i} x1={40 + i * 11} y1="320" x2={44 + i * 11} y2="320" stroke={INK} strokeWidth="0.8" strokeOpacity="0.5" />
      ))}
      <Label x={200} y={313} size={12}>your hardware</Label>
      <Label x={200} y={364} size={12} fill="var(--color-mute)">
        type = "container" | "microvm"
      </Label>
    </svg>
  );
};

/** A laptop and a server printing the same store hash. */
export const DriftArt: React.FC = () => (
  <svg viewBox="0 30 400 350" className="block w-full h-auto" role="img" aria-label="The same build hash on a laptop and a server">
    {/* Laptop */}
    <g stroke={INK} strokeWidth="1.2" fill={PAPER}>
      <rect x="28" y="70" width="196" height="136" />
      <path d="M14 214 L238 214 L250 234 L2 234 Z" />
    </g>
    <rect x="36" y="78" width="180" height="120" fill="#000" stroke={INK} strokeOpacity="0.35" />
    <g fontFamily="var(--font-mono)" fontSize="11">
      <text x="46" y="98" fill="#8a8a8a">$ nix build .#api</text>
      <text x="46" y="116" fill="#d6d6d6">building api-0.4.2…</text>
      <text x="46" y="134" fill="#8a8a8a">$ nix path-info .#api</text>
      <text x="46" y="152" fill="#b9a2ff">/nix/store/9f2c…e41-api</text>
      <text x="46" y="176" fill="#8a8a8a">$</text>
    </g>
    <rect x="56" y="168" width="6" height="10" fill="#fff" className="anim-blink" />
    <g stroke={INK} strokeWidth="0.8" strokeOpacity="0.55">
      {[219, 224, 229].map((y, r) => (
        <line key={y} x1={30 - r * 4} y1={y} x2={222 + r * 4} y2={y} strokeDasharray="7 3" />
      ))}
    </g>

    {/* Server */}
    <g stroke={INK} strokeWidth="1.2" fill={PAPER}>
      {[110, 150, 190].map((y) => (
        <rect key={y} x="266" y={y} width="120" height="34" />
      ))}
    </g>
    {[110, 150, 190].map((y, u) => (
      <g key={y}>
        {Array.from({ length: 5 }, (_, i) => (
          <rect key={i} x={274 + i * 12} y={y + 8} width="8" height="18" fill="none" stroke={INK} strokeWidth="0.8" />
        ))}
        <circle cx="352" cy={y + 17} r="3" fill={u === 0 ? OK : 'none'} stroke={INK} strokeWidth="0.8" className={u === 0 ? 'anim-led' : ''} />
        <circle cx="366" cy={y + 17} r="3" fill="none" stroke={INK} strokeWidth="0.8" />
      </g>
    ))}
    <path d="M326 110 L326 92 L372 92 L372 110" fill="none" stroke={INK} strokeWidth="0.8" />
    <line x1="266" y1="232" x2="386" y2="232" stroke={INK} strokeWidth="1.2" />

    {/* Same bits */}
    <path d="M218 146 C 258 146, 272 88, 322 88" fill="none" stroke={VM} strokeWidth="1.2" strokeDasharray="4 4" />

    <g fontFamily="var(--font-mono)" fontSize="13">
      <rect x="28" y="268" width="344" height="30" fill={PAPER} stroke={INK} strokeWidth="1" />
      <text x="40" y="287" fill="var(--color-mute)">laptop</text>
      <text x="360" y="287" textAnchor="end" fill={INK}>/nix/store/9f2c…e41-api</text>
      <rect x="28" y="304" width="344" height="30" fill={PAPER} stroke={INK} strokeWidth="1" />
      <text x="40" y="323" fill="var(--color-mute)">server</text>
      <text x="360" y="323" textAnchor="end" fill={INK}>/nix/store/9f2c…e41-api</text>
      <text x="200" y="364" textAnchor="middle" fill={OK}>identical · 0% drift</text>
    </g>
  </svg>
);

const Rack: React.FC = () => {
  const units = [52, 92, 132, 172, 212, 252, 292];
  return (
    <g>
      <rect x="118" y="38" width="164" height="304" fill={PAPER} stroke={INK} strokeWidth="1.6" />
      <g stroke={INK} strokeWidth="0.8" strokeOpacity="0.5">
        <line x1="130" y1="44" x2="130" y2="336" />
        <line x1="270" y1="44" x2="270" y2="336" />
      </g>
      {units.map((y, u) => (
        <g key={y}>
          <rect x="136" y={y} width="128" height="34" fill={PAPER} stroke={INK} strokeWidth="1.1" />
          {Array.from({ length: 6 }, (_, i) => (
            <rect key={i} x={144 + i * 13} y={y + 8} width="9" height="18" fill="none" stroke={INK} strokeWidth="0.7" />
          ))}
          <circle
            cx="238"
            cy={y + 17}
            r="3"
            fill={u % 3 === 1 ? 'none' : OK}
            stroke={INK}
            strokeWidth="0.7"
            className={u % 3 === 1 ? '' : 'anim-led'}
            style={{ animationDelay: `${u * 0.37}s` }}
          />
          <circle cx="250" cy={y + 17} r="3" fill="none" stroke={INK} strokeWidth="0.7" />
        </g>
      ))}
      <rect x="126" y="342" width="16" height="10" fill={INK} />
      <rect x="258" y="342" width="16" height="10" fill={INK} />
      <path d="M264 318 C 300 318, 296 346, 332 352" fill="none" stroke={INK} strokeWidth="1.1" />
    </g>
  );
};

/** A mini PC with a router on top: the box in a shop, a closet or a cell tower. */
const EdgeBox: React.FC = () => (
  <g>
    {/* antennas and signal */}
    <g stroke={INK} strokeWidth="1.3">
      <line x1="164" y1="226" x2="150" y2="150" />
      <line x1="236" y1="226" x2="250" y2="150" />
    </g>
    <circle cx="150" cy="148" r="3" fill={INK} />
    <circle cx="250" cy="148" r="3" fill={INK} />
    <g fill="none" stroke={OK} strokeWidth="1.2">
      {[14, 24, 34].map((r, i) => (
        <path
          key={r}
          d={`M${250 + r * 0.7} ${148 - r * 0.7} A ${r} ${r} 0 0 1 ${250 + r * 0.7} ${148 + r * 0.7}`}
          className="anim-led"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </g>

    {/* router */}
    <rect x="148" y="224" width="104" height="30" fill={PAPER} stroke={INK} strokeWidth="1.2" />
    {[0, 1, 2, 3, 4].map((i) => (
      <circle
        key={i}
        cx={166 + i * 17}
        cy="239"
        r="2.6"
        fill={i === 2 ? 'none' : OK}
        stroke={INK}
        strokeWidth="0.7"
        className={i === 2 ? '' : 'anim-led'}
        style={{ animationDelay: `${i * 0.45}s` }}
      />
    ))}

    {/* mini PC */}
    <rect x="116" y="258" width="168" height="86" fill={PAPER} stroke={INK} strokeWidth="1.5" />
    <circle cx="138" cy="278" r="7" fill="none" stroke={INK} strokeWidth="1" />
    <line x1="138" y1="273" x2="138" y2="279" stroke={INK} strokeWidth="1" />
    <circle cx="158" cy="278" r="3" fill={OK} className="anim-led" />
    <g stroke={INK} strokeWidth="0.8" strokeOpacity="0.6">
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1="196" y1={272 + i * 7} x2="268" y2={272 + i * 7} />
      ))}
    </g>
    <g fill="none" stroke={INK} strokeWidth="0.8">
      <rect x="130" y="318" width="12" height="8" />
      <rect x="148" y="318" width="12" height="8" />
      <rect x="166" y="316" width="18" height="12" />
    </g>
    <rect x="128" y="344" width="14" height="8" fill={INK} />
    <rect x="258" y="344" width="14" height="8" fill={INK} />
    <path d="M175 328 C 175 346, 250 342, 330 352" fill="none" stroke={INK} strokeWidth="1.1" />
  </g>
);

/** A cloud account you hold the key to, running a few instances. */
const CloudAccount: React.FC = () => (
  <g>
    <path
      d="M100 222 C 64 222 58 174 96 168 C 94 126 148 108 174 138 C 188 96 258 92 270 138 C 304 124 342 150 324 184 C 352 192 346 222 310 222 Z"
      fill={PAPER}
      stroke={INK}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* key: the account is yours */}
    <g stroke={INK} strokeWidth="1.4" fill="none">
      <circle cx="182" cy="180" r="11" />
      <path d="M193 180 H232 M220 180 V190 M230 180 V188" />
    </g>
    <circle cx="182" cy="180" r="3" fill={OK} />

    <g stroke={INK} strokeWidth="0.9" strokeDasharray="3 4" strokeOpacity="0.6">
      {[140, 200, 260].map((x) => (
        <line key={x} x1={x} y1="222" x2={x} y2="270" />
      ))}
    </g>
    {[112, 172, 232].map((x, i) => (
      <g key={x}>
        <rect x={x} y="270" width="56" height="44" fill={PAPER} stroke={INK} strokeWidth="1.2" />
        {Array.from({ length: 3 }, (_, j) => (
          <rect key={j} x={x + 8 + j * 9} y="282" width="6" height="20" fill="none" stroke={INK} strokeWidth="0.7" />
        ))}
        <circle
          cx={x + 44}
          cy="292"
          r="2.8"
          fill={OK}
          className="anim-led"
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      </g>
    ))}
  </g>
);

const HOSTS = [
  { name: 'bare metal', art: Rack },
  { name: 'edge box', art: EdgeBox },
  { name: 'your cloud', art: CloudAccount },
];

/** Where Russel runs, one host at a time: your rack, an edge box, your cloud account. */
export const HostsArt: React.FC = () => {
  const [ref, seen] = useInView<SVGSVGElement>(0.3);
  const t = useLoop(HOSTS.length * 2800, seen, 0);
  const at = Math.floor(t * HOSTS.length) % HOSTS.length;

  return (
    <svg
      ref={ref}
      viewBox="0 30 400 350"
      className="block w-full h-auto"
      role="img"
      aria-label="Machines you own: a bare-metal rack, an edge box, or a cloud account"
    >
      {HOSTS.map(({ name, art: Art }, i) => (
        <g key={name} style={{ opacity: at === i ? 1 : 0, transition: 'opacity 600ms ease' }} aria-hidden={at !== i}>
          <Art />
          <Label x={200} y={374} fill="var(--color-mute)" size={12}>
            {name}
          </Label>
        </g>
      ))}
      <line x1="40" y1="352" x2="360" y2="352" stroke={INK} strokeWidth="1.1" />
    </svg>
  );
};
