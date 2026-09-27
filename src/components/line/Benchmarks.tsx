import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cell, Grid, Section, SectionTitle, TreeRow } from './primitives';

type Runtime = 'container' | 'microvm';

// Deploy → first HTTP response, warm cache, bare metal (ms).
const WORKLOADS: { name: string; desc: string; container: number; microvm: number; podman: number }[] = [
  { name: 'basic-http', desc: 'Go, stdlib HTTP', container: 812, microvm: 1445, podman: 5228 },
  { name: 'microvm-http', desc: 'Rust, virtio-net TAP', container: 813, microvm: 867, podman: 8196 },
  { name: 'hello-rust', desc: 'static Rust binary', container: 924, microvm: 1061, podman: 4969 },
  { name: 'env-config', desc: 'Node.js', container: 778, microvm: 874, podman: 6288 },
  { name: 'shortlink', desc: 'URL shortener', container: 602, microvm: 825, podman: 6277 },
  { name: 'static-test', desc: 'static files', container: 873, microvm: 1057, podman: 1331 },
  { name: 'filebrowser', desc: 'read-only virtiofs', container: 1223, microvm: 1291, podman: 8387 },
];

const median = (xs: number[]) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];
const fmt = (n: number) => n.toLocaleString('en-US');
const MAX = Math.max(...WORKLOADS.map((w) => w.podman));

export const Benchmarks: React.FC = () => {
  const [rt, setRt] = useState<Runtime>('container');
  const tone = rt === 'container' ? 'text-ct' : 'text-vm';
  const best = Math.max(...WORKLOADS.map((w) => w.podman / w[rt]));

  return (
    <Section id="benchmarks">
      <SectionTitle lead="Isolation costs, measured." rest="Against rootless Podman, same host." />

      <Grid className="lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <Cell className="p-6 sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-[13px] uppercase tracking-[0.16em] text-mute">deploy → first response</span>
            <div role="tablist" aria-label="Runtime" className="flex border border-line bg-night p-1 font-mono text-[13px]">
              {(['container', 'microvm'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  role="tab"
                  aria-selected={rt === r}
                  onClick={() => setRt(r)}
                  className={`cursor-pointer px-3.5 py-1.5 ${
                    rt === r ? `bg-raise ${r === 'container' ? 'text-ct' : 'text-vm'}` : 'text-dimmer hover:text-mute'
                  }`}
                >
                  {r === 'container' ? 'container' : 'microVM'}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 divide-y divide-line border-y border-line">
            {WORKLOADS.map((w) => {
              const ours = w[rt];
              return (
                <div
                  key={w.name}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 py-3.5 sm:grid-cols-[150px_minmax(0,1fr)_auto]"
                >
                  <div className="min-w-0">
                    <div className="font-mono text-[14px] text-fg truncate">{w.name}</div>
                    <div className="text-[12px] text-dimmer truncate">{w.desc}</div>
                  </div>
                  <div
                    className="col-span-2 row-start-2 sm:col-span-1 sm:row-start-auto"
                    title={`Russel ${fmt(ours)} ms · Podman ${fmt(w.podman)} ms`}
                  >
                    <motion.div
                      key={`${rt}-${w.name}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(ours / MAX) * 100}%` }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className={`hatch h-2.5 ${tone}`}
                    />
                    <div className="hatch mt-1.5 h-2.5 text-dimmer" style={{ width: `${(w.podman / MAX) * 100}%` }} />
                  </div>
                  <div className="text-right font-mono tabular-nums whitespace-nowrap">
                    <span className="text-[14px] text-fg">{fmt(ours)} ms</span>
                    <span className={`ml-3 inline-block w-14 text-[14px] ${tone}`}>{(w.podman / ours).toFixed(1)}×</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] text-mute">
            <span className="inline-flex items-center gap-2">
              <span className={`hatch inline-block h-2.5 w-6 ${tone}`} aria-hidden /> russel
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="hatch inline-block h-2.5 w-6 text-dimmer" aria-hidden /> rootless podman
            </span>
            <span>× faster than podman</span>
          </div>
        </Cell>

        <Cell className="flex flex-col p-6 sm:p-9">
          <p className="font-display text-[30px] sm:text-[38px] font-medium tracking-tight leading-[1.08] text-fg">
            Up to <span className={tone}>{best.toFixed(1)}×</span> faster.
            <br />
            <span className="text-mute">Even with a kernel per VM.</span>
          </p>
          <p className="mt-5 text-[15px] leading-relaxed text-mute">
            Most of the gap with Podman is build time. microVM time includes Cloud Hypervisor init, virtio-fs and the guest
            kernel boot; the container is a direct rootfs bind.
          </p>

          <div className="mt-auto space-y-3 pt-10">
            <TreeRow
              label={<span className="text-ct">container, median</span>}
              value={`${fmt(median(WORKLOADS.map((w) => w.container)))} ms`}
            />
            <TreeRow
              label={<span className="text-vm">microVM, median</span>}
              value={`${fmt(median(WORKLOADS.map((w) => w.microvm)))} ms`}
            />
            <TreeRow label="rootless podman, median" value={`${fmt(median(WORKLOADS.map((w) => w.podman)))} ms`} />
            <TreeRow label={<span className="text-mute">setup</span>} value="bare metal · warm cache" />
          </div>
        </Cell>
      </Grid>
    </Section>
  );
};
