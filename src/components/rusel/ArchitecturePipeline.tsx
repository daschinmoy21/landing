import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STAGES = [
  {
    id: 'resolve',
    step: '01',
    name: 'Resolve',
    badge: 'russel-core',
    title: 'Parse & prepare',
    desc: 'Clones the repo, parses Russelfile.toml, detects the stack (Rust / Go / Node / static) and generates a flake.nix wrapper if needed.',
    bullets: [
      'Runtime: microvm or container',
      'Stack detection & flake.nix shim',
      'Pure evaluation, no host leakage',
    ],
  },
  {
    id: 'build',
    step: '02',
    name: 'Nix Build',
    badge: 'Nix Flakes',
    title: 'Hermetic build',
    desc: 'Produces a content-addressed store closure. Hash-verified, binary-cache accelerated, hermetically sandboxed.',
    bullets: [
      'Bit-for-bit reproducible closure',
      'Binary cache for warm rebuilds',
      'No ambient host state',
    ],
  },
  {
    id: 'runtime',
    step: '03',
    name: 'Runtime',
    badge: 'Cloud Hypervisor · Podman',
    title: 'Branch to engine',
    desc: 'Dispatches the same artifact to either Cloud Hypervisor microVMs or rootless Podman — one switch, same interface.',
    bullets: [
      'microVM: virtiofs + TAP + KVM',
      'Container: --rootfs + /nix/store bind',
      'Live socket proxy handover',
    ],
  },
  {
    id: 'ingress',
    step: '04',
    name: 'Ingress',
    badge: 'Traefik · Caddy',
    title: 'Route & verify',
    desc: 'Publishes dynamic proxy config, probes health, then cuts traffic with automatic TLS. Ready in < 2s end-to-end.',
    bullets: [
      'Health probe before cutover',
      'Dynamic Traefik / Caddy route',
      'Auto TLS, instant HTTP',
    ],
  },
];

export const ArchitecturePipeline: React.FC = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % STAGES.length), 3800);
    return () => window.clearInterval(id);
  }, []);

  const progress = ((active + 1) / STAGES.length) * 100;

  return (
    <section id="topology" className="relative overflow-hidden py-16 md:py-24">
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-[#315a71]/45" />
            <span className="text-xs tracking-[0.22em] font-mono text-[#52768a]">DEPLOYMENT PIPELINE</span>
          </div>
          <h2 className="font-instrument font-normal tracking-tight text-[#14233c] text-3xl sm:text-4xl md:text-5xl">
            Source to serving, <span className="italic text-[#3e7895]">in four moves.</span>
          </h2>
          <p className="text-[15px] leading-relaxed text-[#4d6176] mt-3">
            Declarative input, reproducible artifact, dual-engine dispatch. No YAML sprawl, no drift.
          </p>
        </div>

        <div className="mt-10 rounded-3xl liquid-glass overflow-hidden">
          <div className="px-5 md:px-8 pt-6 md:pt-8">
            <div className="relative">
              <div className="absolute left-0 right-0 top-4 h-px bg-[#315a71]/18 hidden md:block" />
              <motion.div
                className="absolute left-0 top-4 h-px bg-[#3e8fb3] hidden md:block origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: '100%' }}
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {STAGES.map((s, i) => {
                  const isActive = i === active;
                  const isPast = i < active;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActive(i)}
                      className={`relative text-left rounded-2xl border px-4 py-4 transition-all cursor-pointer backdrop-blur-sm ${isActive ? 'bg-[#14233c] text-white border-[#14233c] shadow-[0_14px_28px_rgba(20,35,60,0.22)]' : isPast ? 'bg-white/65 border-white/75 text-[#315a71]' : 'bg-white/42 border-white/60 text-[#52768a] hover:bg-white/65'}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-7 h-7 rounded-full grid place-items-center text-[11px] font-mono ${isActive ? 'bg-white text-[#14233c]' : 'bg-[#dff2f8] text-[#315a71]'}`}>
                          {s.step}
                        </span>
                        <span className={`text-[10px] font-mono tracking-wide rounded-full px-2 py-0.5 border ${isActive ? 'bg-white/10 border-white/20 text-white/75' : 'bg-white/55 border-white/70 text-[#52768a]'}`}>{s.badge}</span>
                      </div>
                      <div className={`text-sm font-semibold tracking-tight ${isActive ? 'text-white' : 'text-[#14233c]'}`}>{s.name}</div>
                      {isActive && (
                        <motion.span layoutId="active-dot" className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#4e9fc3] ring-4 ring-[#4e9fc3]/25" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={STAGES[active].id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-7 rounded-2xl bg-white/78 backdrop-blur-sm border border-white/80 p-6 shadow-[0_12px_30px_rgba(35,95,123,0.08)]"
              >
                <div className="text-xs font-mono tracking-wide text-[#52768a]">{STAGES[active].step} — {STAGES[active].badge}</div>
                <h3 className="text-xl font-semibold tracking-tight text-[#14233c] mt-1">{STAGES[active].title}</h3>
                <p className="text-sm leading-relaxed text-[#4d6176] mt-2">{STAGES[active].desc}</p>
                <ul className="mt-4 space-y-2">
                  {STAGES[active].bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-[#315a71]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3e8fb3] shrink-0" />
                      <span className="font-mono text-xs">{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <div className="lg:col-span-5 rounded-2xl bg-[#14233c]/92 backdrop-blur-sm text-[#dff2f8] p-5 font-mono text-xs leading-relaxed border border-white/30 shadow-[0_16px_34px_rgba(20,35,60,0.2)]">
              <div className="flex items-center justify-between border-b border-white/15 pb-2 mb-3">
                <span className="font-bold text-white">Control plane trace</span>
                <span className="text-[10px] tracking-wide text-white/60">russel-ctrl</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-1"
                >
                  <div className={active >= 0 ? 'text-white' : 'text-white/40'}>[00:00.01] Parse Russelfile → OK {active === 0 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-[#79d5ac] animate-pulse" />}</div>
                  <div className={active >= 1 ? 'text-white' : 'text-white/40'}>[00:00.32] Evaluate derivation → {active >= 1 ? 'OK' : '…'}</div>
                  <div className={active >= 1 ? 'text-white' : 'text-white/40'}>[00:00.89] Store closure /nix/store/a89f…</div>
                  <div className={active >= 2 ? 'text-white' : 'text-white/40'}>[00:01.42] Dispatch: {STAGES[active].badge}</div>
                  <div className="text-[#79d5ac] font-bold pt-2">✓ {STAGES[active].name} · {(420 + active * 180)}ms</div>
                </motion.div>
              </AnimatePresence>
              <div className="mt-4 h-1 rounded-full bg-white/15 overflow-hidden">
                <motion.div className="h-full bg-[#7fc9e0]" initial={{ width: '0%' }} animate={{ width: `${((active + 1) / STAGES.length) * 100}%` }} transition={{ duration: 0.6 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
