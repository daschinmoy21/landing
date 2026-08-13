import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Package, Repeat2, Shield } from 'lucide-react';

const ITEMS = [
  {
    icon: Cpu,
    k: '01',
    label: 'ISOLATION',
    title: 'Hardware MicroVMs',
    desc: 'KVM + Cloud Hypervisor. Sub-2s boot, virtio-fs read-only store, TAP-backed networking. Hardware page-table isolation.',
    mono: 'BOOT < 1.8s · KVM / CH',
  },
  {
    icon: Package,
    k: '02',
    label: 'REPRODUCIBILITY',
    title: 'Deterministic Nix',
    mono: 'DRIFT 0% · Flakes',
    desc: 'Pure flake closures — bit-for-bit reproducible. Binary cache, hermetic sandbox, no host mutation.',
  },
  {
    icon: Repeat2,
    k: '03',
    label: 'VELOCITY',
    title: 'Dual-Engine Switching',
    mono: 'SWAP 420ms · --runtime',
    desc: 'One flag switches runtime. Rootless Podman ↔ microVM via live socket proxy handover. Zero downtime.',
  },
  {
    icon: Shield,
    k: '04',
    label: 'SOVEREIGNTY',
    title: 'Self-Hosted · MIT',
    mono: 'NO LOCK-IN',
    desc: 'Bare metal, edge, or cloud you own. No external cloud APIs. TOML-declared, fully local.',
  },
];

export const SelectedWorks: React.FC<{ onSelectWork?: (item: any) => void }> = () => {
  return (
    <section id="architecture" className="relative overflow-hidden border-t border-[#214b65]/15 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/45 via-transparent to-transparent" />
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-[#315a71]/45" />
            <span className="text-xs tracking-[0.22em] font-mono text-[#52768a]">PRIMITIVES</span>
          </div>
          <h2 className="font-instrument font-normal tracking-tight text-[#14233c] text-3xl sm:text-4xl md:text-5xl">
            Isolated, reproducible, <span className="italic text-[#3e7895]">portable.</span>
          </h2>
          <p className="text-[15px] leading-relaxed text-[#4d6176] mt-3">
            Four primitives that make Russel what it is — hardware isolation without the weight, zero-drift builds, and one path to prod.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {ITEMS.map((it, i) => (
            <motion.div
              key={it.k}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="liquid-glass rounded-3xl p-6 md:p-7"
            >
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wide text-[#315a71] bg-white/55 border border-white/75 rounded-full px-2.5 py-1 backdrop-blur-sm">
                  <it.icon className="w-3.5 h-3.5" />
                  {it.label}
                </span>
                <span className="text-xs font-mono text-[#708599]">{it.k}</span>
              </div>
              <h3 className="relative z-10 text-lg font-semibold tracking-tight text-[#14233c]">{it.title}</h3>
              <p className="relative z-10 text-sm leading-relaxed text-[#4d6176] mt-2">{it.desc}</p>
              <div className="relative z-10 mt-4 text-[11px] font-mono text-[#3e7088] bg-white/45 border border-white/70 rounded-full inline-flex px-2.5 py-1 backdrop-blur-sm">
                {it.mono}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
