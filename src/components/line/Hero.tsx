import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { GithubIcon, PrimaryButton } from './primitives';
import { HeroTerminal } from './HeroTerminal';
import { AGENTS, AgentMark } from './agentLogos';

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const LINKS = [
  { id: 'runtimes', label: 'Runtimes' },
  { id: 'benchmarks', label: 'Benchmarks' },
  { id: 'sandboxes', label: 'Sandboxes' },
  { id: 'try', label: 'Deploy' },
] as const;

/** True at the very top of the page; once anything scrolls under the nav it gets a frosted bar. */
function useAtTop() {
  const [top, setTop] = useState(true);
  useEffect(() => {
    const update = () => setTop(window.scrollY < 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return top;
}

export const Nav: React.FC = () => {
  const top = useAtTop();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Escape or a click outside closes the small-screen menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    go(id);
  };

  // Clear over the hero video; once content scrolls under it the bar turns to dark frosted glass.
  return (
    <header
      ref={ref}
      className={`fixed inset-x-0 top-0 z-30 border-b transition-colors duration-300 ${
        top ? 'border-transparent bg-transparent' : 'border-white/10 bg-black/55 backdrop-blur-xl backdrop-saturate-[1.1]'
      }`}
    >
      <nav className="vh-nav flex h-16 items-center gap-10 px-[clamp(20px,4.1vw,96px)] sm:h-[76px]">
        <a
          href="#top"
          className="vh-in flex items-baseline gap-2 font-mono text-white [animation-delay:60ms] [text-shadow:0_1px_3px_rgba(0,0,0,.5)]"
        >
          <span className="text-[22px] font-bold tracking-tight">russel</span>
          <span className="text-[12px] text-white/55">v0.1</span>
        </a>

        <div className="hidden items-center gap-[clamp(24px,2.6vw,40px)] md:flex">
          {LINKS.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={jump(l.id)}
              className={`vh-in text-[15px] tracking-[-0.01em] text-white/75 hover:text-white ${top ? '[text-shadow:0_1px_3px_rgba(0,0,0,.55)]' : ''}`}
              style={{ animationDelay: `${130 + i * 45}ms` }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <span
          aria-disabled="true"
          title="Coming soon"
          className="vh-in vh-glass ml-auto hidden h-10 shrink-0 cursor-not-allowed items-center gap-2 rounded-[7px] px-4 text-[14px] text-white/85 select-none [animation-delay:220ms] md:inline-flex"
        >
          <GithubIcon className="h-4 w-4" />
          GitHub · soon
        </span>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="hero-menu"
          onClick={() => setOpen((o) => !o)}
          className="vh-in vh-glass ml-auto grid h-11 w-11 cursor-pointer place-items-center rounded-[11px] text-white [animation-delay:140ms] md:hidden"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d={open ? 'M5 5l10 10' : 'M3 7h14'} className="transition-all duration-200" />
            <path d={open ? 'M15 5L5 15' : 'M3 13h14'} className="transition-all duration-200" />
          </svg>
        </button>
      </nav>

      <div
        id="hero-menu"
        inert={!open}
        className={`vh-glass absolute top-[64px] right-[clamp(20px,4.1vw,96px)] w-[min(320px,calc(100vw-40px))] origin-top-right rounded-2xl p-2 transition-all duration-200 md:hidden ${
          open ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible -translate-y-2 scale-[0.985] opacity-0'
        }`}
      >
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={jump(l.id)}
            className="block rounded-[10px] px-4 py-3 text-[16px] text-white/85 hover:bg-white/5 hover:text-white"
          >
            {l.label}
          </a>
        ))}
        <span className="mt-1 flex items-center gap-2 border-t border-white/10 px-4 pt-3 pb-2 text-[14px] text-white/50">
          <GithubIcon className="h-4 w-4" /> GitHub · soon
        </span>
      </div>
    </header>
  );
};

const VIDEO = '/hero.mp4';

/**
 * The hero video, pinned behind the whole page. It plays clear behind the hero; as the hero scrolls
 * away a blurred, darkened layer fades in over it so the sections below sit on frosted video.
 */
export const Backdrop: React.FC = () => {
  const light = useRef<HTMLDivElement>(null);
  const heavy = useRef<HTMLDivElement>(null);
  const warm = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const clamp = (n: number) => Math.min(1, Math.max(0, n));
    const set = (el: HTMLDivElement | null, v: number) => el?.style.setProperty('opacity', String(v));
    // Blur: none in the hero, most through the sections, eased back to a lighter blur at the footer.
    const update = () => {
      const vh = window.innerHeight;
      const leaving = clamp(window.scrollY / (vh * 0.85));
      const toEnd = document.documentElement.scrollHeight - vh - window.scrollY;
      const nearEnd = clamp(1 - toEnd / (vh * 1.2));
      set(light.current, leaving);
      set(heavy.current, Math.min(leaving, 1 - nearEnd));
      // The warm tint fades in over the last ~1.5 screens, pulling some blue out of the video by the footer.
      set(warm.current, clamp(1 - toEnd / (vh * 1.5)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-black" aria-hidden>
      <video
        className="h-full w-full object-cover select-none"
        src={VIDEO}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
      />
      <div className="page-vignette absolute inset-0" />
      <div ref={warm} className="absolute inset-0 bg-[#ffae8c] opacity-0 mix-blend-multiply" />
      <div ref={light} className="page-veil-light absolute inset-0 opacity-0" />
      <div ref={heavy} className="page-veil-heavy absolute inset-0 opacity-0" />
    </div>
  );
};

export const Hero: React.FC = () => (
  <section
    id="top"
    className="vh-screen relative isolate flex min-h-[100svh] flex-col overflow-hidden text-white lg:block lg:h-[100svh] lg:min-h-[720px]"
  >
    <div className="relative z-10 mt-auto flex flex-col items-start gap-10 px-[var(--gutter)] pt-32 pb-[var(--hero-bottom)] lg:absolute lg:inset-x-0 lg:bottom-0 lg:flex-row lg:items-end lg:justify-between lg:pt-0">
      <div className="flex min-w-0 flex-col items-start">
        <h1 className="vh-title" aria-label="Containers or microVMs. Same command.">
          <span className="vh-line" aria-hidden>
            <span className="[animation-delay:300ms]">
              <span className="text-[#8ec2ff]">Containers</span> or <span className="text-[#c3aaff]">microVMs</span>.
            </span>
          </span>
          <span className="vh-line" aria-hidden>
            <span className="text-[rgba(211,207,207,.78)] [animation-delay:440ms]">Same command.</span>
          </span>
        </h1>

        <p className="vh-copy mt-[clamp(15px,2.08vh,24px)] max-w-[44ch] text-[clamp(16px,2vh,20px)] leading-snug tracking-[0.01em] text-[rgba(226,229,228,.84)] [animation-delay:740ms] [text-shadow:0_1px_3px_rgba(0,0,0,.7)]">
          Self-hosted, reliable deployments for the agentic era.
        </p>

        <a
          href="#sandboxes"
          onClick={(e) => {
            e.preventDefault();
            go('sandboxes');
          }}
          className="vh-copy vh-glass mt-4 inline-flex items-center gap-2 rounded-[7px] px-3 py-1.5 font-mono text-[12.5px] text-white/80 [animation-delay:820ms] hover:text-white"
        >
          {/* A small window of agent logos drifting left, fading out at the right edge. */}
          <span className="flex w-[76px] overflow-hidden [mask-image:linear-gradient(90deg,#000_55%,transparent)]" aria-hidden>
            {[0, 1].map((copy) => (
              <span key={copy} className="anim-agent-reel flex shrink-0 items-center gap-2.5 pr-2.5">
                {AGENTS.map((a) => (
                  <AgentMark key={a.name} mark={a} className="h-4 w-4 shrink-0" />
                ))}
              </span>
            ))}
          </span>
          Agent sandboxes
          <span className="text-white/45">· soon</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </a>

        <PrimaryButton
          onClick={() => go('runtimes')}
          className="vh-in mt-[clamp(24px,3.11vh,36px)] h-[clamp(40px,4.2vh,46px)] text-[clamp(15px,1.75vh,18px)] [animation-delay:960ms]"
        >
          Read the specs
        </PrimaryButton>
      </div>


      <div className="vh-card relative z-20 w-full max-w-[420px] shrink-0 [animation-delay:1040ms] lg:w-[clamp(320px,26vw,420px)]">
        <HeroTerminal />
      </div>
    </div>
  </section>
);
