import React, { useEffect, useState } from 'react';
import { Check, Copy, RotateCcw } from 'lucide-react';
import { SectionTitle, useInView, useReducedMotion } from './primitives';

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

// Column-align labels the way the CLI does (`{:>10}`).
const pad = (s: string) => s.padStart(10, ' ');

const field =
  'mt-1.5 w-full border border-ink bg-paper px-3 py-2.5 font-mono text-[14px] text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-vm/40 disabled:border-rule disabled:text-faint disabled:cursor-not-allowed';

const Label: React.FC<{ children: React.ReactNode; hint: string }> = ({ children, hint }) => (
  <span className="flex items-baseline justify-between gap-2 text-[13px] text-dim">
    {children}
    <span className="hidden sm:inline font-mono text-[11px] text-faint">{hint}</span>
  </span>
);

export const Deploy: React.FC = () => {
  const [runtime, setRuntime] = useState<Runtime>('microvm');
  const [name, setName] = useState('api');
  const [port, setPort] = useState('3000');
  const [hostPort, setHostPort] = useState('8080');
  const [domain, setDomain] = useState('api.example.com');
  const [cpus, setCpus] = useState('2');
  const [mem, setMem] = useState('256mb');
  const [tab, setTab] = useState<'cli' | 'toml'>('cli');
  const [copied, setCopied] = useState(false);
  const [run, setRun] = useState(0);
  const [shown, setShown] = useState(0);
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const reduced = useReducedMotion();

  const id = name.trim() || 'api';
  const guest = port.trim() || '3000';
  const host = domain.trim();
  const hp = hostPort.trim();
  const repo = `https://github.com/you/${id}.git`;
  const cmd = `russel deploy ${repo}`;

  const toml = [
    '[service]',
    `name = "${id}"`,
    'source = "."',
    `port = ${guest}`,
    `memory = "${mem}"`,
    `type = "${runtime}"`,
    ...(runtime === 'microvm' ? [`cpus = ${cpus}`] : []),
    ...(host || hp ? ['', '[ingress]', ...(host ? [`host = "${host}"`] : []), ...(hp ? [`port = ${hp}`] : [])] : []),
    '',
    '[service.env]',
    'LOG_LEVEL = "info"',
    'DATABASE_URL = "secret://DATABASE_URL"',
  ].join('\n');

  // Output of `russel deploy`, one entry per printed line.
  const lines: React.ReactNode[] = [
    <span className="font-bold text-white">  russel apply</span>,
    <span className="text-[#7a7a7a]">  {repo}</span>,
    '',
    ...PHASES[runtime].map(([p, d]) => (
      <span className="text-[#7a7a7a]">
        {'  '}
        {pad(p)}
        {'  · '}
        {d}
      </span>
    )),
    '',
    <span>
      {'  '}
      <span className="font-bold text-[#b5c85a]">✓</span> Deployed in{' '}
      <span className="font-bold text-white">{runtime === 'microvm' ? '1.4s' : '812ms'}</span>
    </span>,
    '',
    <span>
      <span className="text-[#7a7a7a]">  {pad('service')}</span>
      {'  '}
      {id}
    </span>,
    <span>
      <span className="text-[#7a7a7a]">  {pad('status')}</span>
      {'  '}
      <span className="text-[#b5c85a]">deployed</span>
    </span>,
    ...(host
      ? [
          <span>
            <span className="text-[#7a7a7a]">  {pad('route')}</span>
            {'  '}
            <span className="font-bold text-white">http://{host}</span>
            <span className="text-[#7a7a7a]">  (Traefik Host rule)</span>
          </span>,
        ]
      : []),
    ...(hp
      ? [
          <span>
            <span className="text-[#7a7a7a]">  {pad('backend')}</span>
            {'  '}localhost:<span className="font-bold text-white">{hp}</span> → guest:{guest}
          </span>,
        ]
      : []),
  ];

  // Stream the output in when the terminal scrolls into view, and again on each run.
  useEffect(() => {
    if (!seen) return;
    if (reduced) {
      setShown(Infinity);
      return;
    }
    setShown(0);
    let n = 0;
    const t = setInterval(() => {
      n += 1;
      setShown(n);
      if (n > 20) clearInterval(t);
    }, 170);
    return () => clearInterval(t);
  }, [seen, run, runtime, reduced]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const vmTone = runtime === 'microvm' ? 'text-[#c4a5ff]' : 'text-[#8cb4ff]';

  return (
    <section id="deploy" className="mx-auto max-w-[1240px] px-4 sm:px-8 pt-24 sm:pt-32">
      <SectionTitle title="One file, one command.">
        Describe the service in a <span className="font-mono text-[15px] text-ink">Russelfile.toml</span>, then{' '}
        <span className="font-mono text-[15px] text-ink">russel deploy</span> it. Change the options to see both update.
      </SectionTitle>

      <div className="mt-12 grid border-t border-l border-ink lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="border-r border-b border-ink p-6 sm:p-8">
          <div>
            <Label hint="service.type">Runtime</Label>
            <div className="mt-1.5 grid grid-cols-2 border border-ink">
              {(['microvm', 'container'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  aria-pressed={runtime === r}
                  onClick={() => setRuntime(r)}
                  className={`py-2.5 font-mono text-[14px] cursor-pointer ${
                    runtime === r ? (r === 'microvm' ? 'bg-vm text-paper' : 'bg-ct text-paper') : 'text-dim hover:text-ink'
                  }`}
                >
                  {r === 'microvm' ? 'microVM' : 'container'}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <label className="block">
              <Label hint="service.name">Name</Label>
              <input value={name} onChange={(e) => setName(e.target.value.replace(/[^A-Za-z0-9_-]/g, ''))} maxLength={64} className={field} />
            </label>
            <label className="block">
              <Label hint="service.port">App port</Label>
              <input value={port} onChange={(e) => setPort(e.target.value.replace(/\D/g, '').slice(0, 5))} inputMode="numeric" className={field} />
            </label>
            <label className="block">
              <Label hint="service.memory">Memory</Label>
              <select value={mem} onChange={(e) => setMem(e.target.value)} className={field}>
                {MEMORY.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <Label hint={runtime === 'microvm' ? 'service.cpus' : 'microVM only'}>vCPUs</Label>
              <select value={cpus} onChange={(e) => setCpus(e.target.value)} disabled={runtime !== 'microvm'} className={field}>
                {CPUS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-5 block">
            <Label hint="ingress.host">Domain</Label>
            <input
              value={domain}
              onChange={(e) => setDomain(e.target.value.replace(/[^A-Za-z0-9.-]/g, '').toLowerCase())}
              placeholder="optional"
              className={field}
            />
          </label>
          <label className="mt-5 block">
            <Label hint="ingress.port">Host port</Label>
            <input
              value={hostPort}
              onChange={(e) => setHostPort(e.target.value.replace(/\D/g, '').slice(0, 5))}
              inputMode="numeric"
              placeholder="optional"
              className={field}
            />
          </label>
        </div>

        <div ref={ref} className="flex min-w-0 flex-col border-r border-b border-ink bg-[#141414]">
          <div className="flex items-center justify-between gap-3 border-b border-white/15 px-4 sm:px-6 h-14">
            <div role="tablist" className="flex gap-5 font-mono text-[12px] uppercase tracking-[0.16em]">
              {(['cli', 'toml'] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={tab === k}
                  onClick={() => setTab(k)}
                  className={`cursor-pointer py-1 ${tab === k ? 'font-bold text-white' : 'text-[#7a7a7a] hover:text-[#bdbdbd]'}`}
                >
                  {k === 'cli' ? 'deploy' : 'Russelfile.toml'}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {tab === 'cli' && (
                <button
                  type="button"
                  onClick={() => setRun((r) => r + 1)}
                  aria-label="Run again"
                  className="inline-flex h-8 w-8 items-center justify-center border border-white/25 text-[#bdbdbd] hover:text-white cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => copy(tab === 'cli' ? cmd : toml)}
                aria-label={copied ? "Copied" : "Copy"}
                className="inline-flex h-8 items-center gap-1.5 border border-white/25 px-2.5 sm:px-3 font-mono text-[12px] text-[#e5e5e5] hover:bg-white hover:text-ink cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline">{copied ? 'copied' : 'copy'}</span>
              </button>
            </div>
          </div>

          <div className="min-h-[420px] flex-1 overflow-x-auto p-5 sm:p-6 font-mono text-[13px] leading-[1.7] text-[#d4d4d4]">
            {tab === 'cli' ? (
              <>
                <div className="whitespace-pre-wrap break-all">
                  <span className="select-none text-[#7a7a7a]">$ </span>
                  <span className={vmTone}>{cmd}</span>
                </div>
                <div className="mt-3 whitespace-pre" aria-live="polite">
                  {lines.slice(0, shown).map((l, i) => (
                    <div key={i}>{l || ' '}</div>
                  ))}
                  {shown < lines.length && <span className="anim-blink inline-block h-4 w-2 translate-y-0.5 bg-[#d4d4d4]" />}
                </div>
              </>
            ) : (
              <pre className="whitespace-pre">
                {toml.split('\n').map((line, i) => (
                  <div key={i}>
                    {line.startsWith('[') ? (
                      <span className="text-white font-bold">{line}</span>
                    ) : line.includes(' = ') ? (
                      <>
                        <span className="text-[#bdbdbd]">{line.slice(0, line.indexOf(' = '))}</span>
                        <span className="text-[#7a7a7a]"> = </span>
                        <span className={line.startsWith('type') ? vmTone : 'text-[#b5c85a]'}>{line.slice(line.indexOf(' = ') + 3)}</span>
                      </>
                    ) : (
                      line || ' '
                    )}
                  </div>
                ))}
              </pre>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
