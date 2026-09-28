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
  'mt-1.5 w-full border border-line bg-night px-3 py-2.5 font-mono text-[14px] text-fg placeholder:text-dimmer focus:outline-none focus:ring-2 focus:ring-vm/40 disabled:border-line disabled:text-dimmer disabled:cursor-not-allowed';

const Label: React.FC<{ children: React.ReactNode; hint: string }> = ({ children, hint }) => (
  <span className="flex items-baseline justify-between gap-2 text-[13px] text-mute">
    {children}
    <span className="hidden sm:inline font-mono text-[11px] text-dimmer">{hint}</span>
  </span>
);

const IconButton: React.FC<{ label: string; onClick: () => void; children: React.ReactNode }> = ({ label, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    title={label}
    className="inline-flex h-7 w-7 cursor-pointer items-center justify-center text-dimmer hover:bg-raise hover:text-fg"
  >
    {children}
  </button>
);

const Caret = () => <span className="anim-blink inline-block h-4 w-2 translate-y-0.5 bg-[#d4d4d4]" aria-hidden />;

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
    `cpus = ${cpus}`,
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
    <section id="try" className="mx-auto max-w-[1240px] px-4 sm:px-8 pt-20 sm:pt-28">
      <SectionTitle lead="One file, one command." rest="Try it.">
        Describe the service in a <span className="font-mono text-[15px] text-fg">Russelfile.toml</span>, then{' '}
        <span className="font-mono text-[15px] text-fg">russel deploy</span> it. Change the options to see both update.
      </SectionTitle>

      <div className="mt-12 grid border-t border-l border-line bg-night lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="border-r border-b border-line p-6 sm:p-8">
          <div>
            <Label hint="service.type">Runtime</Label>
            <div className="mt-1.5 grid grid-cols-2 border border-line">
              {(['microvm', 'container'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  aria-pressed={runtime === r}
                  onClick={() => setRuntime(r)}
                  className={`py-2.5 font-mono text-[14px] cursor-pointer ${
                    runtime === r ? (r === 'microvm' ? 'bg-vm text-night' : 'bg-ct text-night') : 'text-mute hover:text-fg'
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
              <Label hint="service.cpus">CPUs</Label>
              <select value={cpus} onChange={(e) => setCpus(e.target.value)} className={field}>
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

        <div ref={ref} className="min-w-0 border-r border-b border-line bg-cell p-3 sm:p-6">
          <div className="overflow-hidden rounded-[10px] border border-white/10 bg-night font-mono shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]">
            {/* title bar */}
            <div className="relative flex h-9 items-center bg-raise px-3.5">
              <span className="flex gap-2" aria-hidden>
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </span>
              <span className="pointer-events-none absolute inset-x-24 truncate text-center text-[12px] text-mute">
                ~/{id} — russel
              </span>
              <span className="ml-auto flex items-center gap-0.5">
                {tab === 'cli' && (
                  <IconButton label="Run again" onClick={() => setRun((r) => r + 1)}>
                    <RotateCcw className="h-3.5 w-3.5" />
                  </IconButton>
                )}
                <IconButton label={copied ? 'Copied' : 'Copy'} onClick={() => copy(tab === 'cli' ? cmd : toml)}>
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </IconButton>
              </span>
            </div>

            {/* tabs */}
            <div role="tablist" className="flex border-y border-black/60 bg-[#141414] text-[12px]">
              {(['cli', 'toml'] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={tab === k}
                  onClick={() => setTab(k)}
                  className={`h-8 flex-1 cursor-pointer border-r border-black/60 last:border-r-0 ${
                    tab === k ? 'bg-night text-fg' : 'text-dimmer hover:bg-white/[0.03] hover:text-mute'
                  }`}
                >
                  {k === 'cli' ? 'deploy' : 'Russelfile.toml'}
                </button>
              ))}
            </div>

            <div className="min-h-[440px] overflow-x-auto p-5 text-[13px] leading-[1.7] text-[#d4d4d4]">
              {tab === 'cli' ? (
                <>
                  <div className="whitespace-pre-wrap [overflow-wrap:anywhere]">
                    <span className="select-none text-[#7a7a7a]">$ </span>
                    <span className={vmTone}>{cmd}</span>
                  </div>
                  <div className="mt-3 whitespace-pre" aria-live="polite">
                    {lines.slice(0, shown).map((l, i) => (
                      <div key={i}>{l || ' '}</div>
                    ))}
                    {shown < lines.length ? (
                      <Caret />
                    ) : (
                      <div>
                        <span className="select-none text-[#7a7a7a]">$ </span>
                        <Caret />
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <pre className="whitespace-pre">
                  {toml.split('\n').map((line, i) => (
                    <div key={i}>
                      {line.startsWith('[') ? (
                        <span className="font-bold text-white">{line}</span>
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
      </div>
    </section>
  );
};
