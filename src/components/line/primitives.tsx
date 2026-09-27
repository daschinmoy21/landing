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
      setT(((now - start) % period) / period);
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
  { id: 'deploy', label: 'deploy' },
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
          <span className="text-mute">{rest}</span>
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

/** Cells share hairlines: the grid draws top/left, each cell right/bottom. */
export const Grid: React.FC<{ className?: string; children: React.ReactNode; innerRef?: React.Ref<HTMLDivElement> }> = ({
  className = '',
  children,
  innerRef,
}) => (
  <div ref={innerRef} className={twMerge('mt-12 grid border-t border-l border-line', className)}>
    {children}
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

/** `└ label ....... value` — the dashboard's tree row. */
export const TreeRow: React.FC<{ label: React.ReactNode; value?: React.ReactNode; className?: string }> = ({
  label,
  value,
  className = '',
}) => (
  <div className={`grid grid-cols-[16px_minmax(0,1fr)_auto] items-baseline gap-x-2 font-mono text-[14px] ${className}`}>
    <span className="text-dimmer select-none" aria-hidden>
      └
    </span>
    <span className="min-w-0 text-fg">{label}</span>
    {value !== undefined && <span className="tabular-nums text-mute">{value}</span>}
  </div>
);

export const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.2-3.37-1.2-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.64.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8a9.56 9.56 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);
