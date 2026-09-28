import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { GithubIcon } from './primitives';
import { HeroTerminal } from './HeroTerminal';
import { AGENTS, AgentMark } from './agentLogos';

const INSTALL = {
  curl: 'curl -fsSL https://russel.dev/install.sh | sh',
  nix: 'nix run github:rusel/landing#russel -- --help',
} as const;
type Method = keyof typeof INSTALL;

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

/** True at the very top of the page; once anything scrolls under the nav it gets a frosted bar. */
function useAtTop() {
  const [over, setOver] = useState(true);
  useEffect(() => {
    const update = () => setOver(window.scrollY < 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return over;
}

export const Nav: React.FC = () => {
  const sky = useAtTop();
  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 border-b transition-colors duration-300 ${
        sky ? 'border-transparent bg-transparent' : 'border-line bg-sky/80 backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-4 sm:px-8">
        <a href="#top" className="text-fg flex items-baseline gap-2 font-mono">
          <span className="text-[22px] font-bold tracking-tight">russel</span>
          <span className="text-dimmer text-[12px]">v0.1</span>
        </a>
        <span
          aria-disabled="true"
          title="Coming soon"
          className="border-line bg-cell/50 text-dimmer inline-flex h-9 shrink-0 cursor-not-allowed items-center gap-2 border px-3 font-mono text-[12px] tracking-[0.14em] whitespace-nowrap uppercase backdrop-blur-md select-none"
        >
          <GithubIcon className="h-4 w-4" />
          <span className="hidden lg:inline">github · soon</span>
        </span>
      </nav>
    </header>
  );
};

export const Hero: React.FC = () => {
  const [method, setMethod] = useState<Method>('curl');

  return (
    <section id="top" className="text-fg relative">
      <div
        className="pointer-events-none absolute inset-0 bg-[#bcd9ee] bg-[url('/hero-bg.webp')] bg-cover bg-[position:70%_bottom]"
        aria-hidden
      >
        {/* Soft wash at the top so the nav and headline read over the brightest part of the sky. */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/25 to-transparent" />
        <div className="to-sky absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-4 pt-32 sm:px-8 sm:pt-40 pb-28 sm:pb-40 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-14">
        <div className="min-w-0 text-center lg:text-left">
          <h1 className="animate-fade-up font-display text-[44px] leading-[0.98] font-medium tracking-[-0.03em] min-[420px]:text-[52px] sm:text-[72px] lg:text-[64px] xl:text-[76px]">
            <span className="text-ct">Containers</span> or <span className="text-vm">microVMs</span>
            .
            <br />
            Same command.
          </h1>
          <p className="animate-fade-up text-mute mx-auto mt-7 max-w-[46ch] text-lg leading-snug [animation-delay:100ms] sm:text-[21px] lg:mx-0">
            Self-hosted, reliable deployments for the agentic era.
          </p>
          <a
            href="#sandboxes"
            onClick={(e) => {
              e.preventDefault();
              go('sandboxes');
            }}
            className="animate-fade-up border-line bg-cell/60 text-mute hover:text-fg hover:border-vm/50 mt-5 inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[12.5px] backdrop-blur-md [animation-delay:140ms]"
          >
            {/* A small window of agent logos drifting left, fading out at the right edge. */}
            <span
              className="flex w-[76px] overflow-hidden [mask-image:linear-gradient(90deg,#000_55%,transparent)]"
              aria-hidden
            >
              {[0, 1].map((copy) => (
                <span key={copy} className="anim-agent-reel flex shrink-0 items-center gap-2.5 pr-2.5">
                  {AGENTS.map((a) => (
                    <AgentMark key={a.name} mark={a} className="h-4 w-4 shrink-0" />
                  ))}
                </span>
              ))}
            </span>
            Agent sandboxes
            <span className="text-dimmer">· soon</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>

          <div className="animate-fade-up mx-auto mt-10 max-w-[640px] [animation-delay:180ms] lg:mx-0">
            <div className="border-line bg-cell/80 flex items-stretch border shadow-[0_18px_40px_-24px_rgba(20,55,95,0.45)] backdrop-blur-xl">
              <div
                role="tablist"
                aria-label="Install method"
                className="border-line flex shrink-0 border-r font-mono text-[13px]"
              >
                {(Object.keys(INSTALL) as Method[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    role="tab"
                    aria-selected={method === m}
                    onClick={() => setMethod(m)}
                    className={`cursor-pointer px-3 sm:px-4 ${method === m ? 'bg-fg text-night' : 'text-mute hover:text-fg'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <code
                className="text-mute min-w-0 flex-1 truncate px-4 py-3.5 text-left font-mono text-[13px] sm:text-[14px]"
                title={INSTALL[method]}
              >
                <span className="text-dimmer select-none">$ </span>
                {INSTALL[method]}
              </code>
              <span className="border-line text-dimmer hidden shrink-0 items-center border-l px-4 font-mono text-[12px] sm:flex">
                soon
              </span>
            </div>
            <p className="text-mute mt-3 font-mono text-[12px]">Installer ships with the first public release.</p>
          </div>

          <div className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3 [animation-delay:260ms] lg:justify-start">
            <button
              type="button"
              onClick={() => go('runtimes')}
              className="bg-fg text-night hover:bg-fg/90 inline-flex cursor-pointer items-center gap-2 px-5 py-3 text-[15px]"
            >
              Read the specs <ArrowRight className="h-4 w-4" />
            </button>
            <span
              aria-disabled="true"
              title="Coming soon"
              className="border-line bg-cell/60 text-dimmer inline-flex cursor-not-allowed items-center gap-2 border px-5 py-3 text-[15px] backdrop-blur-md select-none"
            >
              <GithubIcon className="h-4 w-4" /> View on GitHub <span className="font-mono text-[11px]">soon</span>
            </span>
          </div>
        </div>

        <div className="animate-hero-rise min-w-0 text-left [animation-delay:200ms]">
          <HeroTerminal />
        </div>
      </div>
    </section>
  );
};
