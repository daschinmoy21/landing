import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

type Runtime = 'microvm' | 'container';

const MEMORY = ['128mb', '256mb', '512mb', '1024mb'];
const CPUS = ['1', '2', '4', '8'];

const PHASES: Record<Runtime, [string, string][]> = {
  microvm: [
    ['resolve', 'Resolving source & Russelfile'],
    ['build', 'Building package + ensuring kernel/busybox/modules'],
    ['create', 'Writing deploy config'],
    ['start', 'Setting up network + booting/restoring VM'],
    ['ready', 'Waiting for VM service to be reachable'],
  ],
  container: [
    ['resolve', 'Resolving source & Russelfile'],
    ['build', 'Building package'],
    ['create', 'Preparing container rootfs'],
    ['start', 'Starting rootless Podman container'],
    ['ready', 'Waiting for container service to be reachable'],
  ],
};

const fieldClass =
  'mt-1.5 w-full rounded-xl border border-[#8fb5c6]/45 bg-white/55 backdrop-blur-sm px-3 py-2.5 text-[15px] font-mono font-medium text-[#14233c] placeholder:text-[#8aa3b3] focus:outline-none focus:ring-2 focus:ring-[#4e9fc3]/40 disabled:opacity-45 disabled:cursor-not-allowed';

const Label: React.FC<{ children: React.ReactNode; hint?: string }> = ({ children, hint }) => (
  <span className="flex items-baseline justify-between gap-2 text-xs font-semibold tracking-wide text-[#52768a]">
    {children}
    {hint && <span className="hidden sm:inline font-mono font-medium text-[11px] text-[#7d97a8]">{hint}</span>}
  </span>
);

// Column-align phase labels the way the CLI does (`{:>10}`).
const pad = (s: string) => s.padStart(10, ' ');

export const CliPlayground: React.FC = () => {
  const [runtime, setRuntime] = useState<Runtime>('microvm');
  const [name, setName] = useState('api');
  const [port, setPort] = useState('3000');
  const [hostPort, setHostPort] = useState('8080');
  const [domain, setDomain] = useState('api.example.com');
  const [cpus, setCpus] = useState('2');
  const [mem, setMem] = useState('256mb');
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<'cli' | 'toml'>('cli');

  const id = name.trim() || 'api';
  const guest = port.trim() || '3000';
  const host = domain.trim();
  const publish = hostPort.trim() ? `${hostPort.trim()}:${guest}` : '';
  const repo = `https://github.com/you/${id}.git`;

  const toml = [
    '[service]',
    `name = "${id}"`,
    'source = "."',
    `port = ${guest}`,
    `memory = "${mem}"`,
    `type = "${runtime}"`,
    ...(runtime === 'microvm' ? [`cpus = ${cpus}`] : []),
    ...(host ? ['', '[ingress]', `host = "${host}"`] : []),
    '',
    '[service.env]',
    'LOG_LEVEL = "info"',
    'DATABASE_URL = "secret://DATABASE_URL"',
  ].join('\n');

  const cmd = `russel deploy ${repo} --vm-id ${id}${publish ? ` -p ${publish}` : ''} --runtime ${runtime}`;

  const copy = async (t: string) => {
    try {
      await navigator.clipboard.writeText(t);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <section id="cli" className="relative overflow-hidden py-14 md:py-20">
      <div className="relative max-w-[1080px] mx-auto px-6 md:px-10">
        <SectionHeader title="One file," accent="one command.">
          Describe the service in a <span className="font-mono font-semibold text-[#14233c]">Russelfile.toml</span>, then{' '}
          <span className="font-mono font-semibold text-[#14233c]">russel deploy</span> it. Change the options on the left to
          see both update.
        </SectionHeader>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 rounded-3xl liquid-glass p-6"
          >
            <h3 className="relative z-10 text-base font-semibold tracking-tight text-[#14233c]">Configure a service</h3>
            <div className="relative z-10 mt-4 space-y-4">
              <div>
                <Label hint="service.type">Runtime</Label>
                <div className="mt-1.5 grid grid-cols-2 gap-2 rounded-2xl bg-[#dff2f8]/75 p-1 border border-white/75">
                  {(['microvm', 'container'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      aria-pressed={runtime === r}
                      onClick={() => setRuntime(r)}
                      className={`rounded-xl px-3 py-2 text-sm font-semibold border backdrop-blur-sm transition-colors cursor-pointer ${runtime === r ? 'bg-[#14233c] text-white border-[#14233c]' : 'bg-white/55 text-[#315a71] border-white/70 hover:bg-white/80'}`}
                    >
                      {r === 'microvm' ? 'microVM' : 'Container'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <Label hint="service.name">Name</Label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value.replace(/[^A-Za-z0-9_-]/g, ''))}
                    maxLength={64}
                    className={fieldClass}
                  />
                </label>
                <label className="block">
                  <Label hint="service.port">App port</Label>
                  <input
                    value={port}
                    onChange={(e) => setPort(e.target.value.replace(/\D/g, '').slice(0, 5))}
                    inputMode="numeric"
                    className={fieldClass}
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <Label hint="service.memory">Memory</Label>
                  <select value={mem} onChange={(e) => setMem(e.target.value)} className={fieldClass}>
                    {MEMORY.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <Label hint={runtime === 'microvm' ? 'service.cpus' : 'microVM only'}>vCPUs</Label>
                  <select
                    value={cpus}
                    onChange={(e) => setCpus(e.target.value)}
                    disabled={runtime !== 'microvm'}
                    className={fieldClass}
                  >
                    {CPUS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <Label hint="ingress.host">Domain</Label>
                <input
                  value={domain}
                  onChange={(e) => setDomain(e.target.value.replace(/[^A-Za-z0-9.-]/g, '').toLowerCase())}
                  placeholder={`${id}.russel.local`}
                  className={fieldClass}
                />
              </label>

              <label className="block">
                <Label hint="-p HOST:GUEST">Host port</Label>
                <input
                  value={hostPort}
                  onChange={(e) => setHostPort(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  inputMode="numeric"
                  placeholder="optional"
                  className={fieldClass}
                />
              </label>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 rounded-3xl bg-[#0b1320] border border-white/15 overflow-hidden flex flex-col shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
          >
            <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2 min-w-0">
                <span className="hidden sm:block w-3 h-3 rounded-full bg-red-400" />
                <span className="hidden sm:block w-3 h-3 rounded-full bg-amber-400" />
                <span className="hidden sm:block w-3 h-3 rounded-full bg-emerald-400" />
                <div role="tablist" className="sm:ml-3 flex rounded-full bg-white/10 p-0.5">
                  {(['cli', 'toml'] as const).map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setTab(k)}
                      role="tab"
                      aria-selected={tab === k}
                      className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold font-mono whitespace-nowrap cursor-pointer ${tab === k ? 'bg-white text-[#14233c]' : 'text-white/80 hover:text-white'}`}
                    >
                      {k === 'cli' ? 'russel deploy' : 'Russelfile.toml'}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => copy(tab === 'cli' ? cmd : toml)}
                aria-label={copied ? 'Copied' : 'Copy to clipboard'}
                className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full bg-white text-[#14233c] hover:bg-[#dff2f8] transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="p-5 font-mono text-[13px] sm:text-sm lg:text-[13px] font-medium leading-relaxed flex-1 overflow-x-auto">
              {tab === 'cli' ? (
                <div>
                  <div className="text-[#aee0ef] whitespace-pre-wrap break-words">
                    <span className="text-white/45 select-none">$ </span>
                    {cmd}
                  </div>
                  <div className="mt-4 whitespace-pre text-white/50">
                    <div className="text-[#7fd0ff] font-semibold">  russel deploy</div>
                    <div>  {repo}</div>
                    <div className="mt-1">
                      {PHASES[runtime].map(([p, d]) => (
                        <div key={p}>
                          {'  '}
                          {pad(p)}
                          {'  · '}
                          {d}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-white">
                      {'  '}
                      <span className="text-[#5fd39a] font-bold">✓</span> Deployed in{' '}
                      <span className="font-bold">{runtime === 'microvm' ? '1.4s' : '812ms'}</span>
                    </div>
                    <div className="mt-2">
                      <div>
                        {'  '}
                        {pad('vm-id')}
                        {'  '}
                        <span className="text-white/85">{id}</span>
                      </div>
                      <div>
                        {'  '}
                        {pad('status')}
                        {'  '}
                        <span className="text-[#9de1bd]">deployed</span>
                      </div>
                      <div>
                        {'  '}
                        {pad('route')}
                        {'  '}
                        <span className="text-white font-bold">http://{host || `${id}.russel.local`}</span>
                      </div>
                      {publish && (
                        <div>
                          {'  '}
                          {pad('backend')}
                          {'  '}
                          <span className="text-white/85">
                            localhost:{hostPort.trim()} → guest:{guest}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <pre className="text-[#dff2f8] whitespace-pre">
                  {toml.split('\n').map((line, i) => (
                    <div key={i}>
                      {line.startsWith('[') ? (
                        <span className="text-[#7fd0ff]">{line}</span>
                      ) : line.includes(' = ') ? (
                        <>
                          <span className="text-[#aee0ef]">{line.slice(0, line.indexOf(' = '))}</span>
                          <span className="text-white/45"> = </span>
                          <span className="text-[#9de1bd]">{line.slice(line.indexOf(' = ') + 3)}</span>
                        </>
                      ) : (
                        line || ' '
                      )}
                    </div>
                  ))}
                </pre>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
