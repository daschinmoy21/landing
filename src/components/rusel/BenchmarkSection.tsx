import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
  const speedup = sel.podman.total / sel.container.total;

  const rows = [
    { label: 'Russel microVM · KVM', path: sel.microvm, color: 'bg-[#1f6b4a]', text: 'text-[#1a4d38]' },
    { label: 'Russel container', path: sel.container, color: 'bg-[#185a7a]', text: 'text-[#143f56]' },
    { label: 'Podman baseline', path: sel.podman, color: 'bg-[#3a4a58]', text: 'text-[#2a3640]' },
  ];

  return (
    <section id="benchmarks" className="relative overflow-hidden py-14 md:py-20">
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-2xl">
          <h2 className="font-sans font-normal tracking-tight text-[#14233c] text-3xl sm:text-4xl md:text-[44px] leading-[1.08]">
            Isolation costs — <span className="text-[#3e7895]">measured.</span>
          </h2>
          <p className="text-[17px] sm:text-lg font-medium leading-relaxed text-[#315a71] mt-3 max-w-[48ch]">
            End-to-end on bare metal — build/deploy plus HTTP ready. Compare KVM microVMs against rootless Podman.
          </p>
        </div>

        <div className="mt-7 inline-flex flex-wrap items-center gap-1 rounded-full bg-white/55 border border-white/75 p-1 backdrop-blur-sm max-w-full">
          {WORKLOADS.map((w) => {
            const on = sel.name === w.name;
            return (
              <button
                key={w.name}
                type="button"
                onClick={() => setSel(w)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
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
        <p className="mt-3 text-[15px] font-medium text-[#315a71]">{sel.desc}</p>

        <div className="mt-5 rounded-3xl liquid-glass p-5 md:p-7">
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <div className="text-[15px] font-semibold text-[#14233c]">End-to-end</div>
              <div className="text-[13px] font-medium text-[#52768a] mt-0.5">Build/deploy + HTTP ready · ms · lower is better</div>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-end">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/65 text-[#315a71] border border-white/75">
                WARM
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#185a7a]/12 text-[#143f56] border border-[#185a7a]/25">
                Russel container · {speedup.toFixed(1)}× vs Podman
              </span>
            </div>
          </div>

          <div className="mt-7 space-y-6 relative z-10">
            {rows.map((row) => {
              const pct = Math.max((row.path.total / max) * 100, 3.5);
              return (
                <div key={row.label}>
                  <div className="flex justify-between items-baseline gap-3 mb-2">
                    <span className={`text-[15px] font-semibold ${row.text}`}>{row.label}</span>
                    <span className={`text-right tabular-nums ${row.text}`}>
                      <span className="text-[15px] font-semibold">{fmt(row.path.total)}ms</span>
                      <span className="ml-2 text-[12px] font-medium opacity-70">
                        ({fmt(row.path.build)}+{fmt(row.path.ready)})
                      </span>
                    </span>
                  </div>
                  <div className="h-3 bg-[#c5d6df] rounded-full overflow-hidden">
                    <motion.div
                      key={`${sel.name}-${row.label}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className={`h-full rounded-full ${row.color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <p className="relative z-10 mt-6 text-[14px] font-medium leading-relaxed text-[#52768a]">
            Totals are end-to-end: build/deploy + first HTTP ready. microVM includes Cloud Hypervisor init, virtiofs, and guest kernel boot.
            Container is a direct rootfs bind. Lower is better.
          </p>
        </div>
      </div>
    </section>
  );
};
