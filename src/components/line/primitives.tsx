import React, { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function useInView<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);
  return [ref, seen] as const;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/**
 * Loop progress in [0, 1) over `period` ms, running only while `active`.
 * With reduced motion it holds at `rest` so diagrams show their finished state.
 */
export function useLoop(period: number, active: boolean, rest = 1) {
  const reduced = useReducedMotion();
  const [t, setT] = useState(rest);
  useEffect(() => {
    if (!active || reduced) {
      setT(rest);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      // rAF timestamps are frame-start times and can precede `start`; clamp so t stays in [0, 1).
      setT((Math.max(0, now - start) % period) / period);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [period, active, reduced, rest]);
  return t;
}

/** The dashboard's views, numbered so 1–4 on the keyboard jump between them. */
export const VIEWS = [
  { id: 'runtimes', label: 'runtimes' },
  { id: 'benchmarks', label: 'benchmarks' },
  { id: 'operate', label: 'operate' },
  { id: 'try', label: 'deploy' },
] as const;

/** Two-tone heading: the claim in full white, the qualifier in grey. */
export const SectionTitle: React.FC<{ lead: React.ReactNode; rest?: React.ReactNode; children?: React.ReactNode }> = ({
  lead,
  rest,
  children,
}) => (
  <div className="max-w-3xl">
    <h2 className="font-display text-[34px] sm:text-[48px] font-medium tracking-tight leading-[1.06] text-fg">
      {lead}
      {rest && (
        <>
          <br />
          <span className="text-[rgba(211,207,207,.78)]">{rest}</span>
        </>
      )}
    </h2>
    {children && <p className="mt-5 text-[17px] leading-relaxed text-mute max-w-[58ch]">{children}</p>}
  </div>
);

export const Section: React.FC<{ id?: string; className?: string; children: React.ReactNode }> = ({
  id,
  className = '',
  children,
}) => (
  <section id={id} className={`mx-auto max-w-[1240px] px-4 sm:px-8 pt-28 sm:pt-36 ${className}`}>
    {children}
  </section>
);

/** Glass card from the hero, shared by every section grid. Put the hairline grid inside it as `glass-inner`. */
export const FRAME = 'glass-frame';

/** Cells share hairlines: the grid draws top/left, each cell right/bottom. */
export const Grid: React.FC<{ className?: string; children: React.ReactNode; innerRef?: React.Ref<HTMLDivElement> }> = ({
  className = '',
  children,
  innerRef,
}) => (
  <div className="glass-frame mt-12">
    <div ref={innerRef} className={twMerge('glass-inner grid', className)}>
      {children}
    </div>
  </div>
);

export const Cell: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={twMerge('relative min-w-0 border-r border-b border-line', className)}>{children}</div>
);

export const TileTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h3 className={twMerge('font-mono text-[17px] sm:text-[19px] leading-snug tracking-tight text-fg', className)}>{children}</h3>
);

export const TileBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={twMerge('mt-2 text-[15px] leading-relaxed text-mute', className)}>{children}</p>
);

export const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.2-3.37-1.2-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.64.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8a9.56 9.56 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);

/** The hero's white call to action: label on the left, arrow in a dark box on the right. */
export const PrimaryButton: React.FC<{ onClick?: () => void; children: React.ReactNode; className?: string }> = ({
  onClick,
  children,
  className = '',
}) => (
  <button
    type="button"
    onClick={onClick}
    className={twMerge(
      'inline-flex h-11 cursor-pointer items-center gap-6 rounded-[7px] bg-white pr-[5px] pl-4 text-[16px] tracking-[-0.02em] text-[#111] shadow-[0_1px_5px_rgba(0,0,0,.38)] transition-[filter] hover:brightness-110',
      className,
    )}
  >
    {children}
    <span className="grid h-[calc(100%-10px)] aspect-[33/32] place-items-center rounded-[6px] bg-[#070909]">
      <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M2.5 7h9M7.5 3l4 4-4 4" />
      </svg>
    </span>
  </button>
);
