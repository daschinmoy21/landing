import React from 'react';
import { Check, Minus } from 'lucide-react';
import { FRAME, Section, SectionTitle } from './primitives';

// `true` = built in, `false` = not offered, a string = how you get there.
type Val = boolean | string;

const COLS = ['Russel', 'Docker Compose', 'Kubernetes', 'Coolify / Dokploy', 'Managed PaaS'] as const;

const ROWS: { label: string; vals: [Val, Val, Val, Val, Val] }[] = [
  { label: 'Runs on hardware you own', vals: [true, true, true, true, false] },
  { label: 'microVM per service', vals: ['one line', false, 'Kata add-on', false, 'provider decides'] },
  { label: 'Rootless by default', vals: [true, 'opt-in', 'opt-in', false, 'n/a'] },
  { label: 'Reproducible builds', vals: ['Nix, hash-pinned', 'image tags', 'image tags', 'image tags', 'buildpacks'] },
  { label: 'Zero-downtime cutover', vals: [true, false, true, true, true] },
  { label: 'One-command rollback', vals: [true, false, true, true, true] },
  { label: 'Config lives in', vals: ['one Russelfile', 'YAML + Dockerfile', 'manifests + charts', 'web UI', 'dashboard'] },
  { label: 'Moving parts to run', vals: ['russel-ctrl', 'Docker daemon', 'a cluster', 'Docker + panel', 'none, billed'] },
];

const Mark: React.FC<{ v: Val; hot: boolean }> = ({ v, hot }) => {
  if (v === true) return <Check className={`h-4 w-4 ${hot ? 'text-vm' : 'text-ok'}`} strokeWidth={2.5} aria-label="yes" />;
  if (v === false) return <Minus className="text-dimmer h-4 w-4" aria-label="no" />;
  return <span className={hot ? 'text-fg' : 'text-mute'}>{v}</span>;
};

export const Compare: React.FC = () => (
  <Section id="compare">
    <SectionTitle lead="Skip the cluster." rest="Keep the box.">
      Russel sits between a Compose file and a cluster: your machines, your isolation choice, one config.
    </SectionTitle>

    {/* Scrolls inside the card on narrow screens so the page itself never scrolls sideways. */}
    <div className={`mt-12 ${FRAME}`}>
      <div className="glass-inner overflow-x-auto">
      <table className="w-full min-w-[860px] border-collapse text-left font-mono text-[13px]">
        <thead>
          <tr>
            <th scope="col" className="border-line w-[22%] border-r border-b p-4 sm:p-5" />
            {COLS.map((c, i) => (
              <th
                key={c}
                scope="col"
                className={`border-line border-r border-b p-4 font-medium sm:p-5 ${
                  i === 0 ? 'bg-vm/[0.06] text-vm text-[15px]' : 'text-fg'
                }`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.label}>
              <th scope="row" className="border-line text-mute border-r border-b p-4 font-sans text-[14px] font-normal sm:px-5">
                {r.label}
              </th>
              {r.vals.map((v, i) => (
                <td key={i} className={`border-line border-r border-b p-4 sm:px-5 ${i === 0 ? 'bg-vm/[0.06]' : ''}`}>
                  <Mark v={v} hot={i === 0} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    <p className="text-dimmer mt-4 font-mono text-[12px]">
      Managed PaaS = Vercel, Render, Fly and the like. Defaults as shipped; most gaps can be closed with enough setup.
    </p>
  </Section>
);
