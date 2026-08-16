import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Workload {
  name: string;
  desc: string;
  microvm: number;
  container: number;
  podman: number;
}

const WORKLOADS: Workload[] = [
  { name: 'basic-http', desc: 'Go server · standard HTTP baseline', microvm: 1975, container: 874, podman: 7504 },
  { name: 'microvm-http', desc: 'Rust HTTP microservice · virtio-net TAP', microvm: 1383, container: 859, podman: 9015 },
  { name: 'hello-rust', desc: 'Static Rust binary · minimal closure', microvm: 1913, container: 1128, podman: 7475 },
  { name: 'env-config', desc: 'Node.js · dynamic store closure', microvm: 1362, container: 797, podman: 9407 },
  { name: 'shortlink', desc: 'URL shortener · small service', microvm: 1353, container: 787, podman: 8305 },
  { name: 'static-test', desc: 'Static files · read-heavy', microvm: 1684, container: 1099, podman: 1637 },
  { name: 'filebrowser', desc: 'Multi-threaded · read-only virtiofs', microvm: 2034, container: 1380, podman: 9099 },
];

const fmt = (n: number) => n.toLocaleString('en-US');

export const BenchmarkSection: React.FC = () => {
  const [sel, setSel] = useState<Workload>(WORKLOADS[0]);
  const max = Math.max(sel.microvm, sel.container, sel.podman);
  const speedup = sel.podman / sel.container;

  const rows = [
    { label: 'Russel microVM · KVM', val: sel.microvm, color: 'bg-[#1f6b4a]', text: 'text-[#1a4d38]' },
    { label: 'Russel container', val: sel.container, color: 'bg-[#185a7a]', text: 'text-[#143f56]' },
    { label: 'Podman baseline', val: sel.podman, color: 'bg-[#3a4a58]', text: 'text-[#2a3640]' },
  ];

  return (
    <section id="benchmarks" className="relative overflow-hidden py-14 md:py-20">
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-2xl">
          <h2 className="font-sans font-normal tracking-tight text-[#14233c] text-3xl sm:text-4xl md:text-[44px] leading-[1.08]">
            Isolation costs — <span className="text-[#3e7895]">measured.</span>
          </h2>
          <p className="text-[17px] sm:text-lg font-medium leading-relaxed text-[#315a71] mt-3 max-w-[48ch]">
            Spawn-to-ready on bare metal. Compare KVM microVMs against rootless Podman.
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
              <div className="text-[15px] font-semibold text-[#14233c]">Spawn-to-ready</div>
              <div className="text-[13px] font-medium text-[#52768a] mt-0.5">Milliseconds · lower is better</div>
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
              const pct = Math.max((row.val / max) * 100, 3.5);
              return (
                <div key={row.label}>
                  <div className="flex justify-between items-baseline gap-3 mb-2">
                    <span className={`text-[15px] font-semibold ${row.text}`}>{row.label}</span>
                    <span className={`text-[15px] font-semibold tabular-nums ${row.text}`}>{fmt(row.val)}ms</span>
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
            Totals are spawn-to-ready. microVM includes Cloud Hypervisor init, virtiofs, and guest kernel boot.
            Container is a direct rootfs bind. Lower is better.
          </p>
        </div>
      </div>
    </section>
  );
};
