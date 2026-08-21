import React from 'react';

export const FooterSection: React.FC = () => {
  return (
    <footer
      id="waitlist"
      className="pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden relative"
    >
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center mb-20">
        <h2 className="font-sans font-normal text-[#14233c] text-4xl sm:text-5xl md:text-6xl mb-4 tracking-tight text-glow">
          Deploy with zero drift.
        </h2>
        <p className="text-lg font-medium text-[#315a71] mb-8 leading-relaxed">
          Self-hosted, Apache 2.0. Clone, build, and run — or grab the installer.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <span
            aria-disabled="true"
            title="Coming soon"
            className="inline-flex items-center gap-2 bg-[#8aa3b3] text-white/85 px-6 py-3 rounded-full text-base font-semibold cursor-not-allowed select-none"
          >
            View on GitHub ↗
            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
              Coming soon
            </span>
          </span>
          <button
            onClick={() => document.getElementById('cli')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-white/45 text-[#315a71] border border-white/75 backdrop-blur-sm px-6 py-3 rounded-full text-base font-semibold hover:bg-white/75 transition-colors cursor-pointer"
          >
            Read docs
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-8 border-t border-[#214b65]/15 flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-semibold text-[#52768a]">
        <div className="flex items-center gap-6">
          <span
            aria-disabled="true"
            title="Coming soon"
            className="inline-flex items-center gap-1.5 text-[#8aa3b3] cursor-not-allowed select-none"
          >
            GitHub
            <span className="text-[9px] font-semibold uppercase tracking-wider">Coming soon</span>
          </span>
          <a href="#architecture" className="hover:text-[#14233c] transition-colors">
            Documentation
          </a>
          <a href="#cli" className="hover:text-[#14233c] transition-colors">
            Install
          </a>
          <a href="#benchmarks" className="hover:text-[#14233c] transition-colors">
            Benchmarks
          </a>
        </div>

        <div>© 2026 Russel Platform. Apache 2.0.</div>
      </div>
    </footer>
  );
};
