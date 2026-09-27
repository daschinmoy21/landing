import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { GithubIcon, SpecRow, VIEWS } from './primitives';

const INSTALL = {
  curl: 'curl -fsSL https://russel.dev/install.sh | sh',
  nix: 'nix run github:rusel/landing#russel -- --help',
} as const;
type Method = keyof typeof INSTALL;

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export const Nav: React.FC = () => (
  <header className="sticky top-0 z-30 border-b border-line bg-night/85 backdrop-blur-md">
    <nav className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-4 sm:px-8 h-16">
      <a href="#top" className="font-mono text-[22px] font-bold tracking-tight text-fg">
        russel
      </a>
      <div className="hidden md:flex items-center gap-8 font-mono text-[13px] uppercase tracking-[0.18em]">
        {VIEWS.map((v, i) => (
          <button key={v.id} type="button" onClick={() => go(v.id)} className="group cursor-pointer text-mute hover:text-fg">
            <span className="text-dimmer group-hover:text-mute">{i + 1}</span> {v.label}
          </button>
        ))}
      </div>
      <span
        aria-disabled="true"
        title="Coming soon"
        className="inline-flex h-9 items-center gap-2 border border-line px-3 font-mono text-[12px] uppercase tracking-[0.14em] text-dimmer cursor-not-allowed select-none"
      >
        <GithubIcon className="w-4 h-4" />
        <span className="hidden sm:inline">github · soon</span>
      </span>
    </nav>
  </header>
);

export const Hero: React.FC = () => {
  const [method, setMethod] = useState<Method>('curl');

  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8 pt-16 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div className="min-w-0">
            <h1 className="animate-fade-up font-display font-medium tracking-[-0.03em] leading-[0.98] text-fg text-[48px] min-[420px]:text-[56px] sm:text-[76px] lg:text-[72px] xl:text-[92px]">
              One command.
              <br />
              <span className="text-mute">Either runtime.</span>
            </h1>
            <p className="animate-fade-up [animation-delay:100ms] mt-6 text-xl sm:text-2xl text-fg">
              <span className="text-ct">Containers</span> for speed. <span className="text-vm">VMs</span> for isolation.
            </p>

            <div className="animate-fade-up [animation-delay:180ms] mt-9 max-w-[620px]">
              <div className="flex items-stretch border border-line bg-cell">
                <div role="tablist" aria-label="Install method" className="flex shrink-0 border-r border-line font-mono text-[13px]">
                  {(Object.keys(INSTALL) as Method[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      role="tab"
                      aria-selected={method === m}
                      onClick={() => setMethod(m)}
                      className={`px-3 sm:px-4 cursor-pointer ${method === m ? 'bg-fg text-night' : 'text-mute hover:text-fg'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <code className="flex-1 min-w-0 truncate px-4 py-3.5 font-mono text-[13px] sm:text-[14px] text-dimmer" title={INSTALL[method]}>
                  <span className="select-none">$ </span>
                  {INSTALL[method]}
                </code>
                <span className="hidden sm:flex shrink-0 items-center border-l border-line px-4 font-mono text-[12px] text-dimmer">
                  soon
                </span>
              </div>
              <p className="mt-2 font-mono text-[12px] text-dimmer">Installer ships with the first public release.</p>
            </div>

            <div className="animate-fade-up [animation-delay:260ms] mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => go('runtimes')}
                className="inline-flex h-12 items-center gap-2 bg-fg px-5 font-mono text-[13px] uppercase tracking-[0.14em] text-night hover:bg-white cursor-pointer"
              >
                Read the specs <ArrowRight className="w-4 h-4" />
              </button>
              <span
                aria-disabled="true"
                title="Coming soon"
                className="inline-flex h-12 items-center gap-2 border border-line px-5 font-mono text-[13px] uppercase tracking-[0.14em] text-dimmer cursor-not-allowed select-none"
              >
                <GithubIcon className="w-4 h-4" /> GitHub · soon
              </span>
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:320ms] hidden lg:block border-l border-line pl-8 pb-1">
            <div className="space-y-3">
              <SpecRow label="runtimes" value={<><span className="text-ct">podman</span> · <span className="text-vm">kvm</span></>} />
              <SpecRow label="microVM boot" value="< 2 s" />
              <SpecRow label="builds" value="nix, hash-pinned" />
              <SpecRow label="ingress" value="traefik" />
              <SpecRow label="hosting" value="self-hosted" />
              <SpecRow label="license" value="apache 2.0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
