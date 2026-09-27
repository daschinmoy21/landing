import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from './primitives';

type Runtime = 'container' | 'microvm';

// Deploy → first HTTP response, warm cache, bare metal (ms).
const WORKLOADS: { name: string; container: number; microvm: number; podman: number }[] = [
  { name: 'basic-http', container: 812, microvm: 1445, podman: 5228 },
  { name: 'microvm-http', container: 813, microvm: 867, podman: 8196 },
  { name: 'hello-rust', container: 924, microvm: 1061, podman: 4969 },
  { name: 'env-config', container: 778, microvm: 874, podman: 6288 },
  { name: 'shortlink', container: 602, microvm: 825, podman: 6277 },
  { name: 'static-test', container: 873, microvm: 1057, podman: 1331 },
  { name: 'filebrowser', container: 1223, microvm: 1291, podman: 8387 },
];

const median = (xs: number[]) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];
const fmt = (n: number) => n.toLocaleString('en-US');
const MAX = Math.max(...WORKLOADS.map((w) => w.podman));

const CLI: [string, string][] = [
  ['init', 'Write a starter Russelfile.toml'],
  ['deploy', 'Build and run what the Russelfile describes'],
  ['ps', 'List services'],
  ['status', 'One service, or all of them'],
  ['logs', 'Service output'],
  ['update', 'Redeploy the recorded commit, or --refresh'],
  ['rollback', 'Redeploy an earlier generation'],
  ['stop · destroy', 'Stop a service, or remove it'],
  ['secrets', 'Host-side secrets, never in the Russelfile'],
];

const Cell: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`border-r border-b border-ink p-6 sm:p-8 ${className}`}>{children}</div>
);

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="font-display text-[24px] sm:text-[28px] font-medium tracking-tight leading-tight text-ink">{children}</h3>
);

export const Benchmarks: React.FC = () => {
  const [rt, setRt] = useState<Runtime>('container');
  const tone = rt === 'container' ? 'text-ct' : 'text-vm';
  const mid = median(WORKLOADS.map((w) => w[rt]));
  const podMid = median(WORKLOADS.map((w) => w.podman));

  return (
    <section id="benchmarks" className="mx-auto max-w-[1240px] px-4 sm:px-8 pt-24 sm:pt-32">
      <SectionTitle title="Isolation costs, measured.">
        Time from <span className="font-mono text-[15px] text-ink">russel deploy</span> to the first HTTP response,
        against rootless Podman on the same bare-metal host. Lower is better.
      </SectionTitle>

      <div className="mt-12 grid border-t border-l border-ink lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <Cell className="flex flex-col lg:row-span-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <H3>Deploy to ready</H3>
            <div role="tablist" aria-label="Runtime" className="flex gap-6 font-mono text-[12px] uppercase tracking-[0.18em]">
              {(['container', 'microvm'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  role="tab"
                  aria-selected={rt === r}
                  onClick={() => setRt(r)}
                  className={`cursor-pointer border-b py-1 ${
                    rt === r ? `font-bold border-current ${r === 'container' ? 'text-ct' : 'text-vm'}` : 'border-transparent text-faint hover:text-dim'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className={`font-display text-[72px] sm:text-[96px] font-medium leading-none tracking-[-0.04em] tabular-nums ${tone}`}>
              {fmt(mid)}
            </span>
            <span className="font-display text-[28px] text-faint">ms</span>
          </div>
          <p className="mt-3 text-[15px] text-dim">
            Median of seven workloads. Rootless Podman: <span className="text-ink tabular-nums">{fmt(podMid)} ms</span>.
          </p>

          <div className="mt-9 space-y-5">
            {WORKLOADS.map((w) => {
              const ours = w[rt];
              return (
                <div
                  key={w.name}
                  className="grid grid-cols-[16px_minmax(0,1fr)_auto] sm:grid-cols-[16px_120px_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 font-mono text-[13px]"
                >
                  <span className="text-faint" aria-hidden>
                    └
                  </span>
                  <span className="text-ink truncate">{w.name}</span>
                  <div className="col-span-3 row-start-2 sm:col-span-1 sm:row-start-auto" title={`Russel ${fmt(ours)} ms · Podman ${fmt(w.podman)} ms`}>
                    <motion.div
                      key={`${rt}-${w.name}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(ours / MAX) * 100}%` }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className={`hatch h-3 border border-current ${tone}`}
                    />
                    <div className="mt-1 h-[2px] bg-faint/60" style={{ width: `${(w.podman / MAX) * 100}%` }} />
                  </div>
                  <span className="text-right tabular-nums whitespace-nowrap">
                    <span className="text-ink">{fmt(ours)} ms</span>
                    <span className="ml-3 inline-block w-12 font-bold text-ink">{(w.podman / ours).toFixed(1)}×</span>
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-auto pt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] text-dim">
            <span className="inline-flex items-center gap-2">
              <span className={`hatch inline-block h-3 w-6 border border-current ${tone}`} aria-hidden /> russel
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-[2px] w-6 bg-faint/60" aria-hidden /> rootless podman
            </span>
            <span>× = times faster</span>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-faint max-w-[62ch]">
            Warm cache, bare metal. microVM time includes Cloud Hypervisor init, virtio-fs and the guest kernel boot; the
            container is a direct rootfs bind. Most of the gap with Podman is build time.
          </p>
        </Cell>

        <Cell>
          <H3>Switch in one line</H3>
          <p className="mt-2 text-[15px] leading-relaxed text-dim">
            Redeploy, and the new version takes traffic before the old one drains.
          </p>
          <pre className="mt-5 border border-ink px-4 py-3 font-mono text-[13px] leading-relaxed overflow-x-auto">
            <span className="text-faint"># Russelfile.toml</span>
            {'\n'}
            <span className="text-ct">- type = "container"</span>
            {'\n'}
            <span className="text-vm">+ type = "microvm"</span>
          </pre>

          <div className="mt-6 space-y-2 font-mono text-[11px]" aria-label="Cutover: the old version serves until the new one is ready, then drains">
            <div className="grid grid-cols-[28px_1fr] items-center gap-2">
              <span className="text-dim">v1</span>
              <div className="flex h-3">
                <div className="hatch w-[58%] border border-ct text-ct" />
                <div className="w-[26%] border border-l-0 border-dashed border-ct/60" />
              </div>
            </div>
            <div className="grid grid-cols-[28px_1fr] items-center gap-2">
              <span className="text-dim">v2</span>
              <div className="flex h-3">
                <div className="w-[34%]" />
                <div className="w-[24%] border border-dashed border-vm/60" />
                <div className="hatch flex-1 border border-l-0 border-vm text-vm" />
              </div>
            </div>
            <div className="grid grid-cols-[28px_1fr] gap-2 text-faint">
              <span />
              <div className="relative h-4">
                <span className="absolute left-[34%] -translate-x-1/2">deploy</span>
                <span className="absolute left-[58%] -translate-x-1/2">ready</span>
                <span className="absolute left-[84%] -translate-x-1/2">drained</span>
              </div>
            </div>
          </div>
        </Cell>

        <Cell>
          <H3>A small CLI</H3>
          <dl className="mt-5 grid gap-x-5 gap-y-0.5 sm:gap-y-2.5 text-[14px] sm:grid-cols-[auto_minmax(0,1fr)]">
            {CLI.map(([cmd, what]) => (
              <div key={cmd} className="contents">
                <dt className="font-mono text-ink whitespace-nowrap">
                  <span className="text-faint select-none">$ </span>russel {cmd}
                </dt>
                <dd className="mb-2 sm:mb-0 text-dim">{what}</dd>
              </div>
            ))}
          </dl>
        </Cell>
      </div>
    </section>
  );
};
