import React from 'react';
import { motion } from 'framer-motion';

export const StatsSection: React.FC = () => {
  const STATS = [
    {
      value: '< 2s',
      title: 'MicroVM Boot Time',
      description: 'Hardware-isolated guest VMs boot in sub-2s via Cloud Hypervisor direct kernel loading.',
    },
    {
      value: '100%',
      title: 'Deterministic Nix',
      description: 'Zero-drift build reproducibility across local dev environments and remote host nodes.',
    },
    {
      value: '2 Runtimes',
      title: 'Podman & MicroVMs',
      description: 'Dynamic boundary switching via a single unified declarative configuration manifest.',
    },
  ];

  return (
    <section className="bg-bg py-16 md:py-24 border-t border-b border-stroke/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col justify-between p-6 bg-surface/20 border border-stroke/60 rounded-3xl"
            >
              <div>
                <div className="text-xs text-muted uppercase tracking-[0.2em] font-mono mb-4">
                  0{idx + 1} // METRIC
                </div>
                <div className="text-5xl sm:text-6xl lg:text-7xl font-display italic text-text-primary mb-3 tracking-tight">
                  {stat.value}
                </div>
                <h3 className="text-lg font-body font-medium text-text-primary mb-2">
                  {stat.title}
                </h3>
              </div>
              <p className="text-xs md:text-sm text-muted leading-relaxed mt-2">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
