import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { GithubIcon, useReducedMotion } from './primitives';
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

/** Headline words, split into letters that rise in one after another. */
const LINES: { text: string; className?: string; sheen?: boolean; stop?: boolean }[][] = [
  [
    { text: 'Containers', className: 'text-ct', sheen: true },
    { text: 'or' },
    { text: 'microVMs', className: 'text-vm', sheen: true, stop: true },
  ],
  [{ text: 'Same' }, { text: 'command.' }],
];
const LETTER_MS = 28;

const Headline: React.FC = () => {
  let i = 0;
  const delay = () => ({ animationDelay: `${120 + i++ * LETTER_MS}ms` });
  return (
    <h1
      aria-label="Containers or microVMs. Same command."
      className="font-display text-[44px] leading-[0.98] font-medium tracking-[-0.035em] min-[420px]:text-[54px] sm:text-[80px] lg:text-[104px]"
    >
      {LINES.map((words, li) => (
        <span key={li} className="block" aria-hidden>
          {words.map((w, wi) => {
            const letters = [...w.text].map((ch, ci) => (
              <span key={ci} className="hero-letter" style={delay()}>
                {ch}
              </span>
            ));
            const stop = w.stop ? (
              <span className="hero-letter text-fg" style={delay()}>
                .
              </span>
            ) : null;
            // A short pause between words reads as a beat rather than a stream.
            i += 2;
            return (
              <React.Fragment key={wi}>
                {wi > 0 && ' '}
                <span className={`relative inline-block whitespace-nowrap ${w.className ?? ''}`}>
                  {letters}
                  {w.sheen && (
                    <span className="hero-sheen pointer-events-none absolute inset-0" aria-hidden>
                      {w.text}
                    </span>
                  )}
                  {stop}
                </span>
              </React.Fragment>
            );
          })}
        </span>
      ))}
    </h1>
  );
};

const CLOUDS = [
  { top: '6%', w: 560, h: 150, dur: 70, delay: -10, o: 0.55 },
  { top: '24%', w: 420, h: 110, dur: 95, delay: -60, o: 0.4 },
  { top: '2%', w: 720, h: 180, dur: 120, delay: -85, o: 0.35 },
];

const VALLEY =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';
const FADE_S = 0.5;

/** The valley clip, looped by hand so each pass fades in and out instead of cutting. */
const Valley: React.FC = () => {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (reduced) {
      v.pause();
      v.style.opacity = '1';
      return;
    }
    let raf = 0;
    let restart = 0;
    // Pick the target opacity each frame; the CSS transition does the actual 0.5s fade,
    // so it stays smooth even when the browser throttles frames.
    const tick = () => {
      const { currentTime: t, duration: d } = v;
      if (d) v.style.opacity = t > 0.05 && t < d - FADE_S ? '1' : '0';
      raf = requestAnimationFrame(tick);
    };
    const onEnded = () => {
      v.style.opacity = '0';
      restart = window.setTimeout(() => {
        v.currentTime = 0;
        v.play().catch(() => {});
      }, 100);
    };
    // Browsers pause media in background tabs; pick the loop back up on return.
    const onVisible = () => {
      if (!document.hidden && v.paused) v.play().catch(() => {});
    };
    v.addEventListener('ended', onEnded);
    document.addEventListener('visibilitychange', onVisible);
    v.play().catch(() => {});
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(restart);
      v.removeEventListener('ended', onEnded);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [reduced]);

  return (
    <video
      ref={ref}
      src={VALLEY}
      muted
      playsInline
      preload="auto"
      className="absolute inset-x-0 bottom-0 h-[78%] w-full object-cover transition-opacity duration-500 ease-in-out object-[50%_75%] opacity-0 [mask-image:linear-gradient(to_bottom,transparent,#000_35%)]"
    />
  );
};

/** The sky photo drifts slowly, soft clouds pass in front of it, and the valley clip plays along the bottom. */
const Sky: React.FC<{ y: MotionValue<string> }> = ({ y }) => (
  <motion.div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#bcd9ee]" style={{ y }} aria-hidden>
    <div className="hero-sky absolute inset-0 bg-[url('/hero-bg.webp')] bg-cover bg-[position:70%_bottom]" />
    <Valley />
    {CLOUDS.map((c, k) => (
      <div
        key={k}
        className="hero-cloud absolute left-0 rounded-full bg-white blur-3xl"
        style={{
          top: c.top,
          width: c.w,
          height: c.h,
          opacity: c.o,
          animationDuration: `${c.dur}s`,
          animationDelay: `${c.delay}s`,
        }}
      />
    ))}
    {/* Soft wash at the top so the nav and headline read over the brightest part of the sky. */}
    <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-white/35 via-white/10 to-transparent" />
  </motion.div>
);

export const Hero: React.FC = () => {
  const [method, setMethod] = useState<Method>('curl');
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const skyY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '22%']);
  const copyY = useTransform(scrollYProgress, [0, 0.6], [0, reduced ? 0 : -60]);
  const copyFade = useTransform(scrollYProgress, [0, 0.45], [1, reduced ? 1 : 0]);
  // The terminal starts tipped back and stands up as you scroll to it.
  const tilt = useTransform(scrollYProgress, [0, 0.35], [reduced ? 0 : 14, 0]);
  const lift = useTransform(scrollYProgress, [0, 0.35], [reduced ? 1 : 0.95, 1]);

  return (
    <section id="top" ref={ref} className="text-fg relative overflow-clip">
      <Sky y={skyY} />
      {/* Stays put while the sky slides down, so the hero always melts into the page. */}
      <div className="to-sky pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent" aria-hidden />

      <div className="relative mx-auto flex max-w-[1240px] flex-col items-center px-4 pt-32 pb-24 text-center sm:px-8 sm:pt-44 sm:pb-32">
        <motion.div style={{ y: copyY, opacity: copyFade }} className="flex w-full flex-col items-center">
          <Headline />
          <p className="animate-fade-up text-mute mt-8 max-w-[46ch] text-lg leading-snug [animation-delay:700ms] sm:text-[22px]">
            Self-hosted, reliable deployments for the agentic era.
          </p>
          <a
            href="#sandboxes"
            onClick={(e) => {
              e.preventDefault();
              go('sandboxes');
            }}
            className="animate-fade-up border-line bg-cell/60 text-mute hover:text-fg hover:border-vm/50 mt-5 inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[12.5px] backdrop-blur-md [animation-delay:800ms]"
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

          <div className="animate-fade-up mt-10 flex w-full max-w-[760px] flex-col items-stretch gap-3 [animation-delay:900ms] sm:flex-row">
            <div className="border-line bg-cell/80 flex min-w-0 flex-1 items-stretch border shadow-[0_18px_40px_-24px_rgba(20,55,95,0.45)] backdrop-blur-xl">
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
            <button
              type="button"
              onClick={() => go('runtimes')}
              className="bg-fg text-night hover:bg-fg/90 inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 px-5 py-3 text-[15px] transition-transform hover:scale-[1.03]"
            >
              Read the specs <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <p className="animate-fade-up text-mute mt-3 font-mono text-[12px] [animation-delay:950ms]">
            Installer ships with the first public release.
          </p>
        </motion.div>

        <div className="mt-16 w-full max-w-[920px] [perspective:1600px] sm:mt-20">
          <motion.div style={{ rotateX: tilt, scale: lift, transformOrigin: '50% 100%' }}>
            <div className="animate-hero-rise text-left [animation-delay:1000ms]">
              <HeroTerminal />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
