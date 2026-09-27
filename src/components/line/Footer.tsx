import React from 'react';
import { ArrowRight } from 'lucide-react';
import { GithubIcon, VIEWS } from './primitives';

export const Footer: React.FC = () => (
  <footer className="mt-24 sm:mt-32 border-t border-ink">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-8 py-20 sm:py-28">
      <h2 className="font-display text-[44px] sm:text-[72px] font-medium tracking-[-0.03em] leading-[1] text-ink">
        Deploy with zero drift.
      </h2>
      <p className="mt-5 max-w-[52ch] text-[18px] leading-relaxed text-dim">
        Open source under Apache 2.0. Run it on your own hardware, in containers or microVMs, from one CLI.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => document.getElementById('deploy')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-[15px] text-paper hover:bg-[#2a2a2a] cursor-pointer"
        >
          Try the CLI <ArrowRight className="h-4 w-4" />
        </button>
        <span
          aria-disabled="true"
          title="Coming soon"
          className="inline-flex items-center gap-2 border border-rule px-5 py-3 text-[15px] text-faint cursor-not-allowed select-none"
        >
          <GithubIcon className="h-4 w-4" /> View on GitHub <span className="font-mono text-[11px]">soon</span>
        </span>
      </div>
    </div>

    <div className="border-t border-ink">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-4 sm:px-8 py-6 font-mono text-[12px] uppercase tracking-[0.2em] text-dim md:flex-row md:items-center md:justify-between">
        <span className="hidden md:inline">press 1–4 to switch views</span>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {VIEWS.map((v) => (
            <a key={v.id} href={`#${v.id}`} className="hover:text-ink">
              {v.label}
            </a>
          ))}
        </nav>
        <span className="normal-case tracking-normal text-faint">© 2026 Russel · Apache 2.0</span>
      </div>
    </div>
  </footer>
);
