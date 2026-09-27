import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { GithubIcon, VIEWS } from './primitives';

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
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center xl:grid-cols-[minmax(0,1fr)_minmax(0,480px)]">
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

          <figure className="animate-hero-rise [animation-delay:320ms] relative">
            <div
              className="pointer-events-none absolute inset-0 sm:-inset-8 bg-[radial-gradient(ellipse_at_30%_40%,rgba(178,148,255,0.12),transparent_65%)]"
              aria-hidden
            />
            <div className="relative border border-line bg-[#121212] p-1.5">
              {/* Left half of the dashboard; the cut edge fades out instead of slicing through the bars. */}
              <img
                src="/dash-left.webp"
                alt="The Russel dashboard: fleet health and services across both runtimes"
                width={1000}
                height={1159}
                className="block w-full h-auto [mask-image:linear-gradient(to_right,#000_72%,transparent)]"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
};
