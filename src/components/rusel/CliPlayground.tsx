import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const CliPlayground: React.FC = () => {
  const [runtime, setRuntime] = useState<'microvm' | 'container'>('microvm');
  const [svc, setSvc] = useState('prod-api');
  const [port, setPort] = useState('8080:3000');
  const [cpus, setCpus] = useState('2');
  const [mem, setMem] = useState('512M');
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<'cli' | 'toml'>('cli');

  const toml = `# Russelfile.toml
[service.${svc}]
type = "${runtime}"
image = "nix.#${svc}"
ports = ["${port}"]
cpus = ${cpus}
memory = "${mem}"

[ingress]
domain = "${svc}.russel.local"
ssl = true`;

  const cmd = `./russel-cli deploy . \\
  --runtime ${runtime} \\
  -p ${port} \\
  --vm-id ${svc} \\
  --cpus ${cpus} \\
  --mem ${mem}`;

  const copy = async (t: string) => {
    try {
      await navigator.clipboard.writeText(t);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <section id="cli" className="relative overflow-hidden py-16 md:py-24">
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-white/30" />
            <span className="text-xs tracking-[0.22em] font-mono text-white/70">DEVELOPER ERGONOMICS</span>
          </div>
          <h2 className="font-instrument font-normal tracking-tight text-white text-3xl sm:text-4xl md:text-5xl">
            One surface, <span className="italic text-white/80">both runtimes.</span>
          </h2>
          <p className="text-[15px] leading-relaxed text-white/70 mt-3">
            Declarative <span className="font-mono text-white">Russelfile.toml</span> or imperative <span className="font-mono text-white">russel-cli</span>. Same control plane for containers and microVMs.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 rounded-3xl liquid-glass p-6"
          >
            <h3 className="relative z-10 text-sm font-semibold tracking-tight text-white">Manifest</h3>
            <div className="relative z-10 mt-4 space-y-4">
              <div>
                <div className="text-[11px] font-mono tracking-wide text-white/60 mb-1.5">ISOLATION</div>
                <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white/10 p-1 border border-white/15">
                  {(['microvm', 'container'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setRuntime(r)}
                      className={`rounded-xl px-3 py-2 text-xs font-mono border backdrop-blur-sm transition-colors cursor-pointer ${runtime === r ? 'bg-white text-[#010A17] border-white' : 'bg-white/10 text-white/80 border-white/15 hover:bg-white/15'}`}
                    >
                      {r === 'microvm' ? 'microVM (KVM)' : 'Container (Podman)'}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="text-[11px] font-mono tracking-wide text-white/60">SERVICE</span>
                <input value={svc} onChange={(e) => setSvc(e.target.value)} className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm px-3 py-2.5 text-sm font-mono text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20" />
              </label>

              <label className="block">
                <span className="text-[11px] font-mono tracking-wide text-white/60">PORTS (HOST:GUEST)</span>
                <input value={port} onChange={(e) => setPort(e.target.value)} className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm px-3 py-2.5 text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-white/20" />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-[11px] font-mono tracking-wide text-white/60">vCPUS</span>
                  <select value={cpus} onChange={(e) => setCpus(e.target.value)} className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm px-3 py-2.5 text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-white/20">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="8">8</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-[11px] font-mono tracking-wide text-white/60">MEMORY</span>
                  <select value={mem} onChange={(e) => setMem(e.target.value)} className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm px-3 py-2.5 text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-white/20">
                    <option value="256M">256 MiB</option>
                    <option value="512M">512 MiB</option>
                    <option value="1GiB">1 GiB</option>
                    <option value="2GiB">2 GiB</option>
                  </select>
                </label>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 rounded-3xl bg-[#010A17]/60 backdrop-blur-xl border border-white/15 overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.03]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <div className="ml-3 flex rounded-full bg-white/10 p-0.5">
                  {(['cli', 'toml'] as const).map((k) => (
                    <button
                      key={k}
                      onClick={() => setTab(k)}
                      className={`px-3 py-1 rounded-full text-[11px] font-mono cursor-pointer ${tab === k ? 'bg-white text-[#010A17]' : 'text-white/70 hover:text-white'}`}
                    >
                      {k === 'cli' ? 'russel-cli' : 'Russelfile.toml'}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => copy(tab === 'cli' ? cmd : toml)} className="text-xs font-mono px-3 py-1.5 rounded-full bg-white text-[#010A17] hover:bg-white/90 transition-colors cursor-pointer">
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="p-5 font-mono text-xs leading-relaxed flex-1">
              {tab === 'cli' ? (
                <div className="space-y-3">
                  <div className="text-white/60"># Deploy via control plane</div>
                  <div className="text-sky-200 whitespace-pre-wrap break-words">{cmd}</div>
                  <div className="pt-3 text-emerald-200 space-y-1">
                    <div>[+] Resolving derivations…</div>
                    <div>[+] Building closure /nix/store/a89f…</div>
                    <div>[+] Booting {runtime === 'microvm' ? 'Cloud Hypervisor' : 'Podman'} ({cpus} vCPU, {mem})</div>
                    <div>[+] TAP ready · 10G virtio-net</div>
                    <div className="text-white font-bold">✓ {svc} LIVE → http://127.0.0.1:{port.split(':')[0]}</div>
                  </div>
                </div>
              ) : (
                <pre className="text-sky-100 whitespace-pre-wrap break-words">{toml}</pre>
              )}
            </div>

            <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/60">
              <span>target 127.0.0.1:7878</span>
              <span className="text-emerald-200">100% zero-drift closure</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
