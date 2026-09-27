import React, { useEffect, useState } from 'react';
import { SectionTitle, useInView, useReducedMotion } from './primitives';

const STEPS: { title: string; body: string; detail: React.ReactNode }[] = [
  {
    title: 'Push',
    body: 'Point russel deploy at a git repo. Its Russelfile.toml describes the service.',
    detail: 'git · Russelfile.toml',
  },
  {
    title: 'Resolve',
    body: 'The control plane clones the repo and reads the Russelfile, runtime included.',
    detail: 'russel-ctrl',
  },
  {
    title: 'Build',
    body: 'Detects Rust, Go or static sites and builds a reproducible, hash-pinned package.',
    detail: 'nix build',
  },
  {
    title: 'Run',
    body: 'Boots that same package as a microVM or a rootless container.',
    detail: (
      <>
        <span className="text-vm">cloud-hypervisor</span> | <span className="text-ct">podman</span>
      </>
    ),
  },
  {
    title: 'Route',
    body: 'Waits until the port answers, adds a Traefik route, then drains the old version.',
    detail: 'traefik',
  },
];

export const Pipeline: React.FC = () => {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    if (!seen || reduced || hover !== null) return;
    const t = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 1800);
    return () => clearInterval(t);
  }, [seen, reduced, hover]);

  const on = hover ?? active;

  return (
    <section id="deploy" className="mx-auto max-w-[1240px] px-4 sm:px-8 pt-28 sm:pt-36">
      <SectionTitle lead="From source to serving." rest="Five steps, one command.">
        You describe the service once. Russel builds it, runs it on the runtime you picked, and puts it behind a route.
      </SectionTitle>

      <div ref={ref} className="mt-12 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((s, i) => (
          <div
            key={s.title}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="relative flex flex-col border-r border-b border-line p-6"
          >
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-fg origin-left transition-transform duration-500 ${on === i ? 'scale-x-100' : 'scale-x-0'}`}
              aria-hidden
            />
            <div className="flex items-baseline justify-between font-mono text-[13px]">
              <span className={on === i ? 'text-fg' : 'text-dimmer'}>{i + 1}</span>
              {i < STEPS.length - 1 && (
                <span className="hidden lg:inline text-dimmer" aria-hidden>
                  →
                </span>
              )}
            </div>
            <h3 className="mt-6 font-mono text-[19px] tracking-tight text-fg">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-mute">{s.body}</p>
            <div className="mt-auto pt-6 font-mono text-[12px] text-mute">└ {s.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
