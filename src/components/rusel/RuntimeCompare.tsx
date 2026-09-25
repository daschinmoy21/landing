import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { ContainerGlyph, MicroVMGlyph } from './Glyphs';
import { SectionHeader } from './SectionHeader';

const RUNTIMES = [
  {
    key: 'container',
    name: 'Container',
    engine: 'Rootless Podman',
    icon: ContainerGlyph,
    tint: '#185a7a',
    wash: 'bg-[#185a7a]/10',
    ring: 'ring-[#185a7a]/25',
    summary: 'Services share the host kernel. Lightest and fastest to start.',
    specs: [
      { k: 'Isolation', v: 'Process-level (shared kernel)' },
      { k: 'Deploy → ready', v: '≈ 0.6 – 1.2 s' },
    ],
    bestFor: ['Your own trusted services', 'Fast dev and iteration loops', 'Packing many services per host'],
  },
  {
    key: 'microvm',
    name: 'microVM',
    engine: 'KVM + Cloud Hypervisor',
    icon: MicroVMGlyph,
    tint: '#1f6b4a',
    wash: 'bg-[#1f6b4a]/10',
    ring: 'ring-[#1f6b4a]/25',
    summary: 'Each service gets its own kernel behind a hardware boundary. Still boots in under 2 s.',
    specs: [
      { k: 'Isolation', v: 'Hardware-level (own kernel)' },
      { k: 'Deploy → ready', v: '≈ 0.8 – 1.5 s' },
    ],
    bestFor: ['Untrusted or third-party code', 'Multi-tenant workloads', 'Anything that needs a hard security boundary'],
  },
] as const;

const Layer: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({
  children,
  className = '',
  style,
}) => (
  <div className={`rounded-lg px-3 py-1.5 text-center text-[12px] font-semibold tracking-wide ${className}`} style={style}>
    {children}
  </div>
);

function StackDiagram({ kind, tint }: { kind: 'container' | 'microvm'; tint: string }) {
  const apps = ['api', 'worker', 'db'];
  return (
    <div className="rounded-2xl bg-white/50 border border-white/80 p-3 space-y-1.5" aria-hidden>
      <div className="grid grid-cols-3 gap-1.5">
        {apps.map((a) =>
          kind === 'container' ? (
            <Layer key={a} className="bg-white text-[#14233c] font-mono">
              {a}
            </Layer>
          ) : (
            <div key={a} className="rounded-xl p-1 space-y-1 border-2" style={{ borderColor: tint }}>
              <Layer className="bg-white text-[#14233c] font-mono">{a}</Layer>
              <Layer className="text-white !py-1 text-[11px]" style={{ background: tint }}>
                kernel
              </Layer>
            </div>
          ),
        )}
      </div>
      <Layer className="text-white" style={{ background: tint }}>
        {kind === 'container' ? 'Shared host kernel' : 'KVM hypervisor'}
      </Layer>
      <Layer className="bg-[#14233c]/10 text-[#315a71]">Your hardware</Layer>
    </div>
  );
}

export const RuntimeCompare: React.FC = () => {
  return (
    <section id="runtimes" className="relative overflow-hidden border-t border-[#214b65]/15 py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#b7dff0]/35 via-transparent to-transparent" />
      <div className="relative max-w-[1080px] mx-auto px-6 md:px-10">
        <SectionHeader title="Pick the isolation," accent="per service.">
          Same build, same config, same CLI. The only thing you choose is how strongly each service is walled off.
        </SectionHeader>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {RUNTIMES.map((rt, i) => (
            <motion.article
              key={rt.key}
              data-rt={rt.key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="liquid-glass rounded-3xl p-5 md:p-6 flex flex-col"
            >
              <div className="relative z-10 flex items-center gap-3">
                <span className={`w-10 h-10 rounded-xl ${rt.wash} ring-1 ${rt.ring} flex items-center justify-center`} style={{ color: rt.tint }}>
                  <rt.icon className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-[#14233c]">{rt.name}</h3>
                  <div className="text-[13px] font-semibold" style={{ color: rt.tint }}>{rt.engine}</div>
                </div>
              </div>

              <p className="relative z-10 mt-4 text-[15px] font-medium leading-relaxed text-[#315a71]">{rt.summary}</p>

              <div className="relative z-10 mt-4">
                <StackDiagram kind={rt.key} tint={rt.tint} />
              </div>

              <dl className="relative z-10 mt-4 grid grid-cols-2 gap-2">
                {rt.specs.map((s) => (
                  <div key={s.k} className="rounded-xl bg-white/45 border border-white/70 px-3 py-2">
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-[#52768a]">{s.k}</dt>
                    <dd className="mt-0.5 text-[14px] font-semibold text-[#14233c]">{s.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="relative z-10 mt-4">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#52768a]">Best for</div>
                <ul className="mt-2 space-y-1.5">
                  {rt.bestFor.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[15px] font-medium text-[#14233c]">
                      <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: rt.tint }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
