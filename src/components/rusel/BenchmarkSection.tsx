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
  { name: 'microvm-http', desc: 'Rust HTTP microservice · virtio-net TAP', microvm: 919, container: 655, podman: 366 },
  { name: 'hello-rust', desc: 'Static Rust binary · minimal closure', microvm: 880, container: 659, podman: 562 },
  { name: 'env-config', desc: 'Node.js · dynamic Nix store closure', microvm: 851, container: 639, podman: 443 },
  { name: 'basic-http', desc: 'Go server · standard container baseline', microvm: 1892, container: 669, podman: 528 },
  { name: 'filebrowser', desc: 'Multi-threaded · read-only virtiofs', microvm: 1261, container: 840, podman: 766 },
];

const PHASES = [
  { phase: 'Resolve', t: '0ms', note: 'Parse repo & Russelfile.toml' },
  { phase: 'Nix Build', t: '897ms', note: 'Hermetic flake closure' },
  { phase: 'Rootfs Create', t: '0ms', note: 'Store path adapter' },
  { phase: 'Network Tap', t: '0ms', note: 'virtio-net TAP' },
  { phase: 'Spawn & Start', t: '643ms', note: 'CH boot / Podman run' },
  { phase: 'Ingress Ready', t: '0ms', note: 'Traefik dynamic route' },
];

export const BenchmarkSection: React.FC = () => {
  const [sel, setSel] = useState<Workload>(WORKLOADS[0]);
  const max = Math.max(sel.microvm, sel.container, sel.podman);

  return (
    <section id="benchmarks" className="relative overflow-hidden py-16 md:py-24 border-t border-slate-200/40">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-50/25 via-transparent to-sky-50/20" />
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-slate-300" />
            <span className="text-xs tracking-[0.22em] font-mono text-slate-500">BENCHMARKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-900">
            Isolation costs — <span className="text-slate-500">measured.</span>
          </h2>
          <p className="text-[15px] leading-relaxed text-slate-600 mt-3">
            Spawn-to-ready on bare metal. Toggle workloads to compare KVM microVMs vs rootless Podman.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {WORKLOADS.map((w) => (
            <button
              key={w.name}
              onClick={() => setSel(w)}
              className={`px-3.5 py-2 rounded-full text-xs font-mono border transition-colors cursor-pointer ${sel.name === w.name ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
            >
              {w.name}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs font-mono text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 max-w-2xl">
          {sel.desc}
        </p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-3xl bg-white/85 backdrop-blur-sm border border-slate-200/70 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <span className="text-xs font-mono tracking-wide text-slate-500 uppercase">Spawn-to-ready · ms</span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">WARM</span>
            </div>

            <div className="mt-6 space-y-6">
              {[
                { label: 'Russel microVM · KVM', val: sel.microvm, color: 'bg-sky-500', dot: 'bg-sky-500' },
                { label: 'Russel container · Podman', val: sel.container, color: 'bg-violet-500', dot: 'bg-violet-500' },
                { label: 'Podman baseline', val: sel.podman, color: 'bg-slate-300', dot: 'bg-slate-300', muted: true },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className={`flex items-center gap-2 ${row.muted ? 'text-slate-500' : 'text-slate-900'}`}>
                      <span className={`w-2 h-2 rounded-full ${row.dot} inline-block`} />
                      {row.label}
                    </span>
                    <span className={`font-bold ${row.muted ? 'text-slate-500' : row.dot === 'bg-sky-500' ? 'text-sky-600' : 'text-violet-600'}`}>{row.val}ms</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <motion.div
                      key={`${sel.name}-${row.label}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(row.val / max) * 100}%` }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className={`h-full rounded-full ${row.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2.5 text-xs leading-relaxed text-slate-600 font-mono">
              microVM includes CH init + virtiofs + guest kernel boot. Container is direct rootfs bind. Measured @ 50-concurrent HTTP.
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl bg-white/85 backdrop-blur-sm border border-slate-200/70 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <span className="text-xs font-mono tracking-wide text-slate-500 uppercase">Phase pipeline · 1.54s</span>
              <span className="text-[10px] font-mono text-sky-600">russel-ctrl</span>
            </div>
            <div className="mt-4 space-y-3">
              {PHASES.map((p, i) => (
                <div key={p.phase} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-white grid place-items-center text-[11px] font-mono">0{i + 1}</span>
                    <div>
                      <div className="text-xs font-mono font-medium text-slate-900">{p.phase}</div>
                      <div className="text-[11px] text-slate-500">{p.note}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-emerald-700 shrink-0">{p.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
