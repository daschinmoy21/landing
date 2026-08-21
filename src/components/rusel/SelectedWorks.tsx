import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Package, Repeat2, Shield } from 'lucide-react';

const ITEMS = [
  {
    icon: Cpu,
    label: 'Isolation',
    title: 'Hardware microVMs',
    desc: 'KVM + Cloud Hypervisor. Sub-2s boot, virtio-fs, TAP networking, hardware page-table isolation.',
    mono: 'BOOT < 1.8s',
  },
  {
    icon: Package,
    label: 'Reproducibility',
    title: 'Deterministic builds',
    desc: 'Content-addressed closures — bit-for-bit reproducible. Binary cache, hermetic sandbox, no host mutation.',
    mono: 'DRIFT 0%',
  },
  {
    icon: Repeat2,
    label: 'Velocity',
    title: 'Dual-engine switching',
    desc: 'One flag switches runtime. Rootless Podman or microVMs via live socket handover. Zero downtime.',
    mono: 'SWAP 420ms',
  },
  {
    icon: Shield,
    label: 'Sovereignty',
    title: 'Self-hosted · Apache 2.0',
    desc: 'Bare metal, edge, or cloud you own. No external APIs. TOML-declared, fully local.',
    mono: 'NO LOCK-IN',
  },
];

export const SelectedWorks: React.FC<{ onSelectWork?: (item: any) => void }> = () => {
  return (
    <section id="architecture" className="relative overflow-hidden border-t border-[#214b65]/15 py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#b7dff0]/35 via-transparent to-transparent" />
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <h2 className="font-sans font-normal tracking-tight text-[#14233c] text-3xl sm:text-4xl md:text-[44px] leading-[1.08]">
            Isolated, reproducible, <span className="text-[#3e7895]">portable.</span>
          </h2>
          <p className="text-[17px] sm:text-lg font-medium leading-relaxed text-[#315a71] mt-3 max-w-[46ch]">
            Hardware isolation without the weight, zero-drift builds, and one path to prod.
          </p>
        </motion.div>

        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {ITEMS.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="liquid-glass rounded-2xl p-4 md:p-5 flex flex-col"
            >
              <div className="flex items-center relative z-10">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#315a71] bg-white/55 border border-white/75 rounded-full px-2 py-0.5 backdrop-blur-sm">
                  <it.icon className="w-3.5 h-3.5" />
                  {it.label}
                </span>
              </div>
              <h3 className="relative z-10 text-base font-semibold tracking-tight text-[#14233c] mt-3">
                {it.title}
              </h3>
              <p className="relative z-10 text-[15px] font-medium leading-relaxed text-[#315a71] mt-1.5 flex-1">
                {it.desc}
              </p>
              <div className="relative z-10 mt-3 text-[11px] font-mono font-semibold text-[#3e7088] bg-white/45 border border-white/70 rounded-full inline-flex px-2 py-0.5 backdrop-blur-sm w-fit">
                {it.mono}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
