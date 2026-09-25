import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';

interface PathTimes {
  total: number;
  build: number;
  ready: number;
}

interface Workload {
  name: string;
  desc: string;
  microvm: PathTimes;
  container: PathTimes;
  podman: PathTimes;
}

const t = (total: number, build: number, ready: number): PathTimes => ({ total, build, ready });

const WORKLOADS: Workload[] = [
  { name: 'basic-http', desc: 'Go server · standard HTTP baseline', microvm: t(1445, 582, 863), container: t(812, 291, 521), podman: t(5228, 4860, 368) },
  { name: 'microvm-http', desc: 'Rust HTTP microservice · virtio-net TAP', microvm: t(867, 225, 642), container: t(813, 207, 606), podman: t(8196, 7851, 345) },
  { name: 'hello-rust', desc: 'Static Rust binary · minimal closure', microvm: t(1061, 436, 625), container: t(924, 384, 540), podman: t(4969, 4522, 447) },
  { name: 'env-config', desc: 'Node.js · dynamic store closure', microvm: t(874, 215, 659), container: t(778, 215, 563), podman: t(6288, 6034, 254) },
  { name: 'shortlink', desc: 'URL shortener · small service', microvm: t(825, 245, 580), container: t(602, 225, 377), podman: t(6277, 5939, 338) },
  { name: 'static-test', desc: 'Static files · read-heavy', microvm: t(1057, 330, 727), container: t(873, 311, 562), podman: t(1331, 607, 724) },
  { name: 'filebrowser', desc: 'Multi-threaded · read-only virtiofs', microvm: t(1291, 582, 709), container: t(1223, 544, 679), podman: t(8387, 7775, 612) },
];

const fmt = (n: number) => n.toLocaleString('en-US');

export const BenchmarkSection: React.FC = () => {
  const [sel, setSel] = useState<Workload>(WORKLOADS[0]);
  const max = Math.max(sel.microvm.total, sel.container.total, sel.podman.total);

  const rows = [
    { label: 'Russel · container', path: sel.container, build: 'bg-[#185a7a]', ready: 'bg-[#185a7a]/45', text: 'text-[#143f56]' },
    { label: 'Russel · microVM', path: sel.microvm, build: 'bg-[#1f6b4a]', ready: 'bg-[#1f6b4a]/45', text: 'text-[#1a4d38]' },
    { label: 'Podman (baseline)', path: sel.podman, build: 'bg-[#7d8e9b]', ready: 'bg-[#7d8e9b]/45', text: 'text-[#4d6176]' },
  ];

  const stats = [
    { value: sel.podman.total / sel.container.total, label: 'faster than Podman, as a container', color: 'text-[#185a7a]' },
    { value: sel.podman.total / sel.microvm.total, label: 'faster than Podman, even as a microVM', color: 'text-[#1f6b4a]' },
  ];

  return (
    <section id="benchmarks" className="relative overflow-hidden py-14 md:py-20">
      <div className="relative max-w-[1080px] mx-auto px-6 md:px-10">
        <SectionHeader title="Isolation costs," accent="measured.">
          Time from deploy to first HTTP response on bare metal, compared with rootless Podman. Lower is better.
        </SectionHeader>

        <div className="mt-7 -mx-6 px-6 md:mx-0 md:px-0 overflow-x-auto scrollbar-hide">
          <div
            role="tablist"
            aria-label="Workload"
            className="inline-flex items-center gap-1 rounded-full bg-white/55 border border-white/75 p-1 backdrop-blur-sm whitespace-nowrap"
          >
            {WORKLOADS.map((w) => {
              const on = sel.name === w.name;
              return (
                <button
                  key={w.name}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setSel(w)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-semibold font-mono transition-colors cursor-pointer ${
                    on
                      ? 'bg-[#14233c] text-white shadow-[0_6px_14px_rgba(20,35,60,0.16)]'
                      : 'text-[#315a71] hover:bg-white/80 hover:text-[#14233c]'
                  }`}
                >
                  {w.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 rounded-3xl liquid-glass p-5 md:p-7">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-5 md:items-end">
            <div>
              <div className="text-[13px] font-semibold uppercase tracking-wider text-[#52768a]">Workload</div>
              <div className="mt-1 text-lg font-semibold text-[#14233c]">
                <span className="font-mono">{sel.name}</span>
                <span className="text-[#52768a] font-medium"> · {sel.desc}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((st) => (
                <div key={st.label} className="rounded-2xl bg-white/60 border border-white/80 px-4 py-3 min-w-0 md:min-w-[170px]">
                  <div className={`text-3xl font-semibold tracking-tight tabular-nums ${st.color}`}>{st.value.toFixed(1)}×</div>
                  <div className="mt-0.5 text-[13px] font-medium leading-snug text-[#315a71]">{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 space-y-5 relative z-10">
            {rows.map((row) => {
              const buildPct = (row.path.build / max) * 100;
              const readyPct = (row.path.ready / max) * 100;
              return (
                <div key={row.label}>
                  <div className="flex justify-between items-baseline gap-3 mb-2">
                    <span className={`text-[15px] font-semibold ${row.text}`}>{row.label}</span>
                    <span className={`text-[15px] font-semibold tabular-nums ${row.text}`}>{fmt(row.path.total)} ms</span>
                  </div>
                  <div className="h-3.5 bg-[#14233c]/[0.07] rounded-full overflow-hidden flex">
                    <motion.div
                      key={`${sel.name}-${row.label}-b`}
                      initial={{ width: 0 }}
                      animate={{ width: `${buildPct}%` }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className={`h-full ${row.build}`}
                      title={`Build/deploy ${fmt(row.path.build)} ms`}
                    />
                    <motion.div
                      key={`${sel.name}-${row.label}-r`}
                      initial={{ width: 0 }}
                      animate={{ width: `${readyPct}%` }}
                      transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className={`h-full rounded-r-full ${row.ready}`}
                      title={`HTTP ready ${fmt(row.path.ready)} ms`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative z-10 mt-6 pt-5 border-t border-[#214b65]/10 flex flex-col md:flex-row md:items-start gap-3 md:gap-8">
            <div className="flex items-center gap-4 shrink-0 text-[13px] font-semibold text-[#315a71]">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#315a71]" aria-hidden /> Build / deploy
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#315a71]/45" aria-hidden /> Until HTTP ready
              </span>
            </div>
            <p className="text-[13px] font-medium leading-relaxed text-[#52768a]">
              Warm cache, bare metal. microVM time includes Cloud Hypervisor init, virtio-fs, and guest kernel boot; the
              container is a direct rootfs bind. Most of the gap with Podman is build time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
