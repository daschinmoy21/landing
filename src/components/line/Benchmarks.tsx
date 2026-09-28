import React from 'react';
import { motion } from 'framer-motion';
import { Cell, Grid, Section, SectionTitle, useInView } from './primitives';

// Deploy → first HTTP response, warm cache, bare metal (ms).
const WORKLOADS: {
  name: string;
  desc: string;
  container: number;
  microvm: number;
  podman: number;
}[] = [
  { name: 'basic-http', desc: 'Go, stdlib HTTP', container: 812, microvm: 1445, podman: 5228 },
  {
    name: 'microvm-http',
    desc: 'Rust, virtio-net TAP',
    container: 813,
    microvm: 867,
    podman: 8196,
  },
  { name: 'hello-rust', desc: 'static Rust binary', container: 924, microvm: 1061, podman: 4969 },
  { name: 'env-config', desc: 'Node.js', container: 778, microvm: 874, podman: 6288 },
  { name: 'shortlink', desc: 'URL shortener', container: 602, microvm: 825, podman: 6277 },
  { name: 'static-test', desc: 'static files', container: 873, microvm: 1057, podman: 1331 },
  { name: 'filebrowser', desc: 'read-only virtiofs', container: 1223, microvm: 1291, podman: 8387 },
];

const SERIES = [
  { key: 'container', label: 'container', tone: 'text-ct' },
  { key: 'microvm', label: 'microVM', tone: 'text-vm' },
  { key: 'podman', label: 'rootless podman', tone: 'text-mute' },
] as const;

const median = (xs: number[]) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];
const fmt = (n: number) => n.toLocaleString('en-US');
const MAX = Math.max(...WORKLOADS.map((w) => w.podman));
const best = (k: 'container' | 'microvm') => Math.max(...WORKLOADS.map((w) => w.podman / w[k]));
const MEDIANS = SERIES.map((s) => ({ ...s, value: median(WORKLOADS.map((w) => w[s.key])) }));
const MEDIAN_MAX = Math.max(...MEDIANS.map((m) => m.value));

export const Benchmarks: React.FC = () => {
  const [ref, seen] = useInView<HTMLDivElement>(0.15);
  return (
    <Section id="benchmarks">
      <SectionTitle lead="Isolation costs, measured." rest="Against rootless Podman, same host." />

      <Grid className="lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <Cell className="p-6 sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <span className="text-mute font-mono text-[13px] tracking-[0.16em] uppercase">deploy → first response</span>
            <div className="text-mute flex flex-wrap gap-x-5 gap-y-1 font-mono text-[12px]">
              {SERIES.map((s) => (
                <span key={s.key} className="inline-flex items-center gap-2">
                  <span className={`hatch inline-block h-3 w-5 ${s.tone}`} aria-hidden /> {s.label}
                </span>
              ))}
            </div>
          </div>

          <div ref={ref} className="divide-line border-line mt-8 divide-y border-y">
            {WORKLOADS.map((w) => (
              <div key={w.name} className="grid gap-x-6 gap-y-3 py-4 sm:grid-cols-[140px_minmax(0,1fr)]">
                <div className="min-w-0">
                  <div className="text-fg truncate font-mono text-[14px]">{w.name}</div>
                  <div className="text-dimmer truncate text-[12px]">{w.desc}</div>
                </div>
                <div
                  className="space-y-1.5"
                  aria-label={`${w.name}: container ${w.container} ms, microVM ${w.microvm} ms, Podman ${w.podman} ms`}
                >
                  {SERIES.map((s, i) => {
                    const v = w[s.key];
                    return (
                      <div
                        key={s.key}
                        className="grid grid-cols-[minmax(0,1fr)_72px_44px] items-center gap-x-3 font-mono text-[12px] tabular-nums"
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: seen ? `${(v / MAX) * 100}%` : 0 }}
                          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                          className={`hatch h-3 ${s.tone}`}
                        />
                        <span className={`text-right ${s.key === 'podman' ? 'text-dimmer' : 'text-fg'}`}>
                          {fmt(v)} ms
                        </span>
                        <span className={`text-right ${s.tone}`}>
                          {s.key === 'podman' ? '' : `${(w.podman / v).toFixed(1)}×`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <p className="text-dimmer mt-5 font-mono text-[12px]">× = times faster than rootless podman</p>
        </Cell>

        <Cell className="flex flex-col p-6 sm:p-9">
          <p className="font-display text-fg text-[30px] leading-[1.08] font-medium tracking-tight sm:text-[38px]">
            Up to <span className="text-ct">{best('container').toFixed(1)}×</span> faster.
            <br />
            <span className="text-mute">
              <span className="text-vm">{best('microvm').toFixed(1)}×</span> even with a kernel per VM.
            </span>
          </p>
          <p className="text-mute mt-5 text-[15px] leading-relaxed">
            Most of the gap with Podman is build time. microVM time includes Cloud Hypervisor init, virtio-fs and the
            guest kernel boot; the container is a direct rootfs bind.
          </p>

          {/* Medians as columns: fills the cell with the headline comparison instead of empty space. */}
          <div className="mt-10 flex min-h-[260px] flex-1 flex-col">
            <span className="text-mute font-mono text-[12px] tracking-[0.16em] uppercase">median of 7 workloads</span>
            <div className="border-line mt-6 grid flex-1 grid-cols-3 gap-4 border-b">
              {MEDIANS.map((m, i) => (
                <div key={m.key} className="flex flex-col justify-end">
                  <span className="text-fg mb-2 font-mono text-[13px] tabular-nums">{fmt(m.value)} ms</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: seen ? `${(m.value / MEDIAN_MAX) * 85}%` : 0 }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className={`hatch w-full ${m.tone}`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-4 font-mono text-[12px]">
              {MEDIANS.map((m) => (
                <span key={m.key} className={m.tone}>
                  {m.label}
                </span>
              ))}
            </div>
            <p className="text-dimmer mt-6 font-mono text-[12px]">bare metal · warm cache</p>
          </div>
        </Cell>
      </Grid>
    </Section>
  );
};
