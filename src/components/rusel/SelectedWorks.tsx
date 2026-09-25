import React from 'react';
import { motion } from 'framer-motion';
import { Check, Cloud, Radio, Server } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

const Tile: React.FC<{ className?: string; delay?: number; children: React.ReactNode }> = ({
  className = '',
  delay = 0,
  children,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay }}
    className={`liquid-glass flex flex-col rounded-3xl p-6 ${className}`}
  >
    {children}
  </motion.div>
);

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="relative z-10 text-xl leading-snug font-semibold tracking-tight text-[#14233c]">{children}</h3>
);

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="relative z-10 mt-2 text-[15px] leading-relaxed font-medium text-[#315a71]">{children}</p>
);

const Chips: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="relative z-10 mt-auto flex flex-wrap gap-1.5 pt-5">
    {items.map((t) => (
      <span
        key={t}
        className="rounded-full border border-white/85 bg-white/60 px-2.5 py-1 text-[12px] font-semibold text-[#52768a]"
      >
        {t}
      </span>
    ))}
  </div>
);

const Stat: React.FC<{ value: string; label: string; className?: string }> = ({ value, label, className = '' }) => (
  <div className={`relative z-10 ${className}`}>
    <div className="font-mono text-4xl leading-none font-semibold tracking-tight text-[#14233c] tabular-nums md:text-5xl">
      {value}
    </div>
    <div className="mt-2 text-[12px] font-semibold tracking-wider text-[#52768a] uppercase">{label}</div>
  </div>
);

export const SelectedWorks: React.FC = () => {
  return (
    <section id="architecture" className="relative overflow-hidden py-14 md:py-20">
      <div className="relative mx-auto max-w-[1080px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <SectionHeader title="Isolated, reproducible," accent="portable.">
            Hardware isolation without the weight, builds that never drift, and one path to production.
          </SectionHeader>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-6">
          {/* Isolation — wide */}
          <Tile className="md:col-span-4">
            <div className="relative z-10 grid h-full gap-6 sm:grid-cols-[1fr_auto]">
              <div className="flex flex-col">
                <Title>VM-grade security, container speed</Title>
                <Body>
                  Each microVM gets its own kernel behind a hardware boundary, so a compromised service can't reach its
                  neighbours. It still boots in under two seconds.
                </Body>
                <Chips items={['KVM', 'Cloud Hypervisor', 'virtio-fs', 'TAP networking']} />
              </div>
              <div className="flex items-end justify-between gap-4 border-[#214b65]/10 sm:flex-col sm:items-center sm:justify-center sm:border-l sm:pl-6">
                <Stat value="<1.8s" label="microVM boot" className="sm:text-center" />
                <div className="flex flex-col items-center gap-1.5">
                  <div className="flex gap-1.5" aria-hidden>
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-9 space-y-0.5 rounded-lg border-2 border-[#1f6b4a] bg-white/60 p-0.5">
                        <div className="h-3 rounded-[4px] bg-white" />
                        <div className="h-1.5 rounded-[3px] bg-[#1f6b4a]" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-[#1f6b4a]">one kernel per VM</span>
                </div>
              </div>
            </div>
          </Tile>

          {/* Reproducibility — narrow */}
          <Tile className="md:col-span-2" delay={0.05}>
            <Title>Same input, same bits</Title>
            <Body>What you tested is exactly what runs, on every machine.</Body>
            <div className="relative z-10 mt-auto space-y-1.5 pt-5 font-mono text-[12px]" aria-hidden>
              {['laptop', 'server'].map((where) => (
                <div
                  key={where}
                  className="flex items-center justify-between gap-2 rounded-xl border border-white/90 bg-white/65 px-3 py-2"
                >
                  <span className="text-[#52768a]">{where}</span>
                  <span className="font-semibold text-[#14233c]">sha256:9f2c…e41</span>
                </div>
              ))}
              <div className="flex items-center gap-1.5 pt-1 font-sans text-[12px] font-semibold text-[#1f6b4a]">
                <Check className="h-3.5 w-3.5" /> identical · 0% drift
              </div>
            </div>
          </Tile>

          {/* Switch runtimes — narrow */}
          <Tile className="md:col-span-2" delay={0.1}>
            <Title>Switch runtimes in one line</Title>
            <Body>Redeploy, and the new version takes traffic before the old one drains.</Body>
            <div className="relative z-10 mt-auto pt-5" aria-hidden>
              <div className="rounded-xl bg-[#0b1320] px-3 py-2.5 font-mono text-[12px] leading-relaxed shadow-[0_10px_24px_rgba(11,19,32,0.18)]">
                <div className="text-white/40"># Russelfile.toml</div>
                <div className="text-[#f2a7a7]">- type = "container"</div>
                <div className="text-[#9de1bd]">+ type = "microvm"</div>
              </div>
            </div>
          </Tile>

          {/* Ownership — wide */}
          <Tile className="md:col-span-4" delay={0.15}>
            <div className="relative z-10 grid h-full gap-6 sm:grid-cols-[1fr_auto]">
              <div className="flex flex-col">
                <Title>Runs on machines you own</Title>
                <Body>
                  Bare metal, an edge box, or a cloud account you control. No external APIs, nothing phoning home, and
                  the code is yours to fork.
                </Body>
                <Chips items={['Apache 2.0', 'TOML config', 'fully local']} />
              </div>
              <div className="flex flex-col justify-center gap-2 border-[#214b65]/10 sm:min-w-[210px] sm:border-l sm:pl-6">
                {[
                  { icon: Server, label: 'Bare metal' },
                  { icon: Radio, label: 'Edge' },
                  { icon: Cloud, label: 'Your cloud' },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-white/90 bg-white/65 px-3 py-2.5"
                  >
                    <Icon className="h-4 w-4 text-[#2c779c]" />
                    <span className="text-[14px] font-semibold text-[#14233c]">{label}</span>
                    <Check className="ml-auto h-4 w-4 text-[#1f6b4a]" />
                  </div>
                ))}
                <div className="mt-1 text-center text-[12px] font-semibold tracking-wider text-[#52768a] uppercase">
                  0 vendor lock-in
                </div>
              </div>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
};
