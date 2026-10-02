import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Copy } from 'lucide-react';
import { DOCS, GITHUB, GithubIcon, PrimaryButton } from './primitives';
import { HeroTerminal } from './HeroTerminal';
import { AGENTS, AgentMark } from './agentLogos';

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

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

  // Clear over the hero video; once content scrolls under it the bar turns to dark frosted glass.
  return (
    <header
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

        <a
          href={GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          className="vh-in vh-glass ml-auto inline-flex h-10 shrink-0 items-center gap-2 rounded-[7px] px-4 text-[14px] text-white/85 hover:text-white [animation-delay:140ms]"
        >
          <GithubIcon className="h-4 w-4" />
          GitHub
        </a>
      </nav>
    </header>
  );
};

const VIDEO = '/hero.mp4';
// First frame of the video, shown until it can play so the swap is seamless.
const POSTER = '/hero-poster.webp';

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
        poster={POSTER}
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

// Option A from the installation docs: installs russel-ctrl on the server.
const INSTALL =
  'curl -fsSL https://raw.githubusercontent.com/daschinmoy21/russel/main/contrib/install.sh | sudo RUSSEL_VERSION=v0.1.0 bash -s -- host';

/** The install one-liner, shortened for display; the button copies the full command. */
const InstallCommand: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={copy}
      title={INSTALL}
      aria-label="Copy install command"
      className={`vh-glass inline-flex max-w-full cursor-pointer items-center gap-3 rounded-[7px] pr-2 pl-2.5 font-mono text-[13px] text-white/80 hover:text-white ${className}`}
    >
      <span className="shrink-0 rounded-[4px] bg-white/10 px-1.5 py-0.5 text-[11px] text-white/70">Linux</span>
      <span className="min-w-0 truncate">
        <span className="text-white/45">$ </span>curl -fsSL …/install.sh | sudo bash -s -- host
      </span>
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[5px] bg-white/10">
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </span>
    </button>
  );
};

/** The installer is Linux-only for now; macOS and Windows are on the way. */
const OtherPlatforms: React.FC = () => (
  <span
    className="inline-flex items-center gap-2 font-mono text-[12.5px] text-white/45"
    aria-label="macOS and Windows support coming soon"
  >
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-white/70" aria-hidden>
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
    <svg viewBox="0 0 24 24" className="h-3 w-3 fill-white/70" aria-hidden>
      <path d="M0 3.449 9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
    soon
  </span>
);

export const Hero: React.FC = () => (
  <section
    id="top"
    className="vh-screen relative isolate flex min-h-[100svh] flex-col overflow-hidden text-white lg:block lg:h-[100svh] lg:min-h-[720px]"
  >
    <div className="relative z-10 mt-auto flex flex-col items-start gap-10 px-[var(--gutter)] pt-32 pb-[var(--hero-bottom)] lg:absolute lg:inset-x-0 lg:bottom-0 lg:flex-row lg:items-end lg:justify-between lg:pt-0">
      <div className="flex min-w-0 max-w-full flex-col items-start">
        <h1 className="vh-title" aria-label="Self-hosted, reliable deployments for the agentic era.">
          <span className="vh-line" aria-hidden>
            <span className="[animation-delay:300ms]">Self-hosted, reliable deployments</span>
          </span>
          <span className="vh-line" aria-hidden>
            <span className="text-[rgba(211,207,207,.78)] [animation-delay:440ms]">
              for the <span className="vh-shimmer">agentic era</span>.
            </span>
          </span>
        </h1>

        <a
          href="#sandboxes"
          onClick={(e) => {
            e.preventDefault();
            go('sandboxes');
          }}
          className="vh-copy vh-glass mt-[clamp(18px,2.6vh,30px)] inline-flex items-center gap-2 rounded-[7px] px-3 py-1.5 font-mono text-[12.5px] text-white/80 [animation-delay:820ms] hover:text-white"
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

        <div className="vh-in mt-[clamp(24px,3.11vh,36px)] flex max-w-full flex-wrap items-center gap-3 [animation-delay:960ms]">
          <PrimaryButton href={DOCS} className="h-[clamp(40px,4.2vh,46px)] text-[clamp(15px,1.75vh,18px)]">
            Read the docs
          </PrimaryButton>
          <InstallCommand className="h-[clamp(40px,4.2vh,46px)]" />
          <OtherPlatforms />
        </div>
      </div>


      <div className="vh-card relative z-20 w-full max-w-[420px] shrink-0 [animation-delay:1040ms] lg:w-[clamp(320px,26vw,420px)]">
        <HeroTerminal />
      </div>
    </div>
  </section>
);
