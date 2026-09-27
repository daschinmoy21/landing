import React, { useEffect, useRef, useState } from 'react';

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

/** The dashboard's views, numbered so 1–4 on the keyboard jump between them. */
export const VIEWS = [
  { id: 'runtimes', label: 'runtimes' },
  { id: 'benchmarks', label: 'benchmarks' },
  { id: 'pipeline', label: 'pipeline' },
  { id: 'deploy', label: 'deploy' },
] as const;

export const SectionTitle: React.FC<{ title: React.ReactNode; children?: React.ReactNode }> = ({ title, children }) => (
  <div className="max-w-2xl">
    <h2 className="font-display text-[34px] sm:text-[46px] font-medium tracking-tight leading-[1.04] text-ink">
      {title}
    </h2>
    {children && <p className="mt-4 text-[17px] leading-relaxed text-dim max-w-[56ch]">{children}</p>}
  </div>
);

/** `└ label ....... value  note` — the dashboard's tree row. */
export const TreeRow: React.FC<{
  label: React.ReactNode;
  value?: React.ReactNode;
  note?: React.ReactNode;
  className?: string;
}> = ({ label, value, note, className = '' }) => (
  <div className={`grid grid-cols-[16px_minmax(0,1fr)_auto] items-baseline gap-x-2 font-mono text-[14px] ${className}`}>
    <span className="text-faint select-none" aria-hidden>
      └
    </span>
    <span className="min-w-0 text-ink">
      {label}
      {note && <span className="ml-3 text-dim">{note}</span>}
    </span>
    {value !== undefined && <span className="tabular-nums text-ink">{value}</span>}
  </div>
);

export const Square: React.FC<{ className?: string }> = ({ className = 'bg-ok' }) => (
  <span className={`inline-block w-2.5 h-2.5 ${className}`} aria-hidden />
);

export const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.2-3.37-1.2-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.64.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8a9.56 9.56 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);
