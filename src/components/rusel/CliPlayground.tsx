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
image = "${svc}:latest"
ports = ["${port}"]
cpus = ${cpus}
memory = "${mem}"

[ingress]
domain = "${svc}.russel.local"
ssl = true`;

  const cmd = `./russel-cli deploy . --runtime ${runtime} -p ${port} --vm-id ${svc} --cpus ${cpus} --mem ${mem}`;

  const copy = async (t: string) => {
    try {
      await navigator.clipboard.writeText(t);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <section id="cli" className="relative overflow-hidden py-14 md:py-20">
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-2xl">
          <h2 className="font-sans font-normal tracking-tight text-[#14233c] text-3xl sm:text-4xl md:text-[44px] leading-[1.08]">
            One surface, <span className="text-[#3e7895]">both runtimes.</span>
          </h2>
          <p className="text-[17px] sm:text-lg font-medium leading-relaxed text-[#315a71] mt-3">
            Declarative <span className="font-mono font-semibold text-[#14233c]">Russelfile.toml</span> or imperative <span className="font-mono font-semibold text-[#14233c]">russel-cli</span>. Same control plane for containers and microVMs.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 rounded-3xl liquid-glass p-6"
          >
            <h3 className="relative z-10 text-base font-semibold tracking-tight text-[#14233c]">Manifest</h3>
            <div className="relative z-10 mt-4 space-y-4">
              <div>
                <div className="text-xs font-semibold tracking-wide text-[#52768a] mb-1.5">Isolation</div>
                <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#dff2f8]/75 p-1 border border-white/75">
                  {(['microvm', 'container'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setRuntime(r)}
                      className={`rounded-xl px-3 py-2 text-sm font-semibold border backdrop-blur-sm transition-colors cursor-pointer ${runtime === r ? 'bg-[#14233c] text-white border-[#14233c]' : 'bg-white/55 text-[#315a71] border-white/70 hover:bg-white/80'}`}
                    >
                      {r === 'microvm' ? 'microVM (KVM)' : 'Container (Podman)'}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="text-xs font-semibold tracking-wide text-[#52768a]">Service</span>
                <input value={svc} onChange={(e) => setSvc(e.target.value)} className="mt-1.5 w-full rounded-xl border border-[#8fb5c6]/45 bg-white/55 backdrop-blur-sm px-3 py-2.5 text-[15px] font-mono font-medium text-[#14233c] placeholder:text-[#708599] focus:outline-none focus:ring-2 focus:ring-[#4e9fc3]/40" />
              </label>

              <label className="block">
                <span className="text-xs font-semibold tracking-wide text-[#52768a]">Ports (host:guest)</span>
                <input value={port} onChange={(e) => setPort(e.target.value)} className="mt-1.5 w-full rounded-xl border border-[#8fb5c6]/45 bg-white/55 backdrop-blur-sm px-3 py-2.5 text-[15px] font-mono font-medium text-[#14233c] focus:outline-none focus:ring-2 focus:ring-[#4e9fc3]/40" />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs font-semibold tracking-wide text-[#52768a]">vCPUs</span>
                  <select value={cpus} onChange={(e) => setCpus(e.target.value)} className="mt-1.5 w-full rounded-xl border border-[#8fb5c6]/45 bg-white/55 backdrop-blur-sm px-3 py-2.5 text-[15px] font-mono font-medium text-[#14233c] focus:outline-none focus:ring-2 focus:ring-[#4e9fc3]/40">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="8">8</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-semibold tracking-wide text-[#52768a]">Memory</span>
                  <select value={mem} onChange={(e) => setMem(e.target.value)} className="mt-1.5 w-full rounded-xl border border-[#8fb5c6]/45 bg-white/55 backdrop-blur-sm px-3 py-2.5 text-[15px] font-mono font-medium text-[#14233c] focus:outline-none focus:ring-2 focus:ring-[#4e9fc3]/40">
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
            className="lg:col-span-7 rounded-3xl bg-black border border-white/15 overflow-hidden flex flex-col shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <div className="ml-3 flex rounded-full bg-white/10 p-0.5">
                  {(['cli', 'toml'] as const).map((k) => (
                    <button
                      key={k}
                      onClick={() => setTab(k)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold font-mono cursor-pointer ${tab === k ? 'bg-white text-[#14233c]' : 'text-white/80 hover:text-white'}`}
                    >
                      {k === 'cli' ? 'russel-cli' : 'Russelfile.toml'}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => copy(tab === 'cli' ? cmd : toml)} className="text-sm font-semibold font-mono px-3 py-1.5 rounded-full bg-white text-[#14233c] hover:bg-[#dff2f8] transition-colors cursor-pointer">
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="p-5 font-mono text-sm font-medium leading-relaxed flex-1">
              {tab === 'cli' ? (
                <div className="space-y-3">
                  <div className="text-white/60"># Deploy via control plane</div>
                  <div className="text-[#aee0ef] whitespace-pre-wrap break-words">{cmd}</div>
                  <div className="pt-3 text-[#9de1bd] space-y-1">
                    <div>[+] Resolving artifact…</div>
                    <div>[+] Building closure a89f…</div>
                    <div>[+] Booting {runtime === 'microvm' ? 'Cloud Hypervisor' : 'Podman'} ({cpus} vCPU, {mem})</div>
                    <div>[+] TAP ready · 10G virtio-net</div>
                    <div className="text-white font-bold">✓ {svc} LIVE → http://127.0.0.1:{port.split(':')[0]}</div>
                  </div>
                </div>
              ) : (
                <pre className="text-[#dff2f8] whitespace-pre-wrap break-words">{toml}</pre>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
