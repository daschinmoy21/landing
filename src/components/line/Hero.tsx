import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { GithubIcon, TreeRow, VIEWS } from './primitives';

const INSTALL = {
  curl: 'curl -fsSL https://russel.dev/install.sh | sh',
  nix: 'nix run github:rusel/landing#russel -- --help',
} as const;
type Method = keyof typeof INSTALL;

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export const Nav: React.FC = () => (
  <header className="relative z-10 border-b border-ink">
    <nav className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-4 sm:px-8 h-16 sm:h-[72px]">
      <a href="#top" className="font-mono text-[22px] sm:text-[26px] font-bold tracking-tight text-ink">
        russel
      </a>
      <div className="hidden md:flex items-center gap-8 font-mono text-[13px] uppercase tracking-[0.2em]">
        {VIEWS.map((v, i) => (
          <button key={v.id} type="button" onClick={() => go(v.id)} className="group cursor-pointer text-dim hover:text-ink">
            <span className="text-faint group-hover:text-dim">{i + 1}</span> {v.label}
          </button>
        ))}
      </div>
      <span
        aria-disabled="true"
        title="Coming soon"
        className="inline-flex items-center gap-2 font-mono text-[13px] text-faint cursor-not-allowed select-none"
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
      <Nav />

      <div className="mx-auto max-w-[1240px] px-4 sm:px-8 pt-14 sm:pt-20 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div className="min-w-0">
            <h1 className="animate-fade-up font-display font-medium tracking-[-0.03em] leading-[0.98] text-ink text-[48px] min-[420px]:text-[56px] sm:text-[76px] lg:text-[92px]">
              One command.
              <br />
              <span className="text-faint">Either runtime.</span>
            </h1>
            <p className="animate-fade-up [animation-delay:100ms] mt-6 text-xl sm:text-2xl text-ink">
              <span className="text-ct">Containers</span> for speed. <span className="text-vm">VMs</span> for isolation.
            </p>

            <div className="animate-fade-up [animation-delay:180ms] mt-9 max-w-[620px]">
              <div className="flex items-stretch border border-ink bg-paper">
                <div role="tablist" aria-label="Install method" className="flex shrink-0 border-r border-ink font-mono text-[13px]">
                  {(Object.keys(INSTALL) as Method[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      role="tab"
                      aria-selected={method === m}
                      onClick={() => setMethod(m)}
                      className={`px-3 sm:px-4 cursor-pointer ${method === m ? 'bg-ink text-paper' : 'text-dim hover:text-ink'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <code className="flex-1 min-w-0 truncate px-4 py-3.5 font-mono text-[13px] sm:text-[14px] text-faint" title={INSTALL[method]}>
                  <span className="select-none">$ </span>
                  {INSTALL[method]}
                </code>
                <span className="hidden sm:flex shrink-0 items-center border-l border-rule px-4 font-mono text-[12px] text-faint">
                  soon
                </span>
              </div>
              <p className="mt-2 font-mono text-[12px] text-faint">Installer ships with the first public release.</p>
            </div>

            <div className="animate-fade-up [animation-delay:260ms] mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => go('pipeline')}
                className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-[15px] text-paper hover:bg-[#2a2a2a] cursor-pointer"
              >
                Read the specs <ArrowRight className="w-4 h-4" />
              </button>
              <span
                aria-disabled="true"
                title="Coming soon"
                className="inline-flex items-center gap-2 border border-rule px-5 py-3 text-[15px] text-faint cursor-not-allowed select-none"
              >
                <GithubIcon className="w-4 h-4" /> View on GitHub
                <span className="font-mono text-[11px]">soon</span>
              </span>
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:320ms] hidden lg:block border-l border-ink pl-8 pb-1">
            <div className="space-y-3">
              <TreeRow label="runtimes" value={<><span className="text-ct">podman</span> · <span className="text-vm">kvm</span></>} />
              <TreeRow label="microVM boot" value="< 2 s" />
              <TreeRow label="builds" value="nix, hash-pinned" />
              <TreeRow label="ingress" value="traefik" />
              <TreeRow label="hosting" value="self-hosted" />
              <TreeRow label="license" value="apache 2.0" />
            </div>
          </div>
        </div>

        <figure className="animate-hero-rise [animation-delay:420ms] mt-16 sm:mt-20">
          <div className="border border-ink bg-ink p-1.5 sm:p-2">
            <img
              src="/dash.webp"
              alt="The Russel dashboard: fleet health, services by runtime, and composition"
              width={1882}
              height={1159}
              className="block w-full h-auto"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <figcaption className="mt-3 flex flex-wrap justify-between gap-2 font-mono text-[12px] text-dim">
            <span>└ the dashboard: every service, both runtimes, one fleet view</span>
            <span className="hidden sm:inline text-faint">press 1–4 to switch views</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
