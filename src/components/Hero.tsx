import React from 'react';
import { ChevronDown, Copy } from 'lucide-react';
import { Navbar } from './Navbar';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.2-3.37-1.2-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.64.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8a9.56 9.56 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);

const BG_IMAGE_URL = '/hero-bg.webp';

interface HeroProps {
  onNavigate?: (sectionId: string) => void;
}

const INSTALL_CMDS = {
  curl: 'curl -fsSL https://russel.dev/install.sh | sh',
  nix: 'nix run github:rusel/landing#russel -- --help',
} as const;

type InstallMethod = keyof typeof INSTALL_CMDS;

const INSTALL_LABELS: Record<InstallMethod, string> = {
  curl: 'curl',
  nix: 'nix',
};

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const installMethod: InstallMethod = 'curl';
  const activeCmd = INSTALL_CMDS[installMethod];

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden flex flex-col font-sans"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${BG_IMAGE_URL}")`,
          filter: 'saturate(1.45) contrast(1.04)',
        }}
        aria-hidden
      />
      {/* Top Navbar */}
      <Navbar onNavigate={onNavigate} />

      {/* Flex Spacer 1 */}
      <div className="flex-1 min-h-8 sm:min-h-12 lg:min-h-16 shrink-0" />

      {/* Hero Content (Centered) */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Headline */}
        <h1 className="text-gray-900 font-normal leading-[1.05] tracking-tight text-[40px] min-[400px]:text-[44px] sm:text-6xl lg:text-7xl xl:text-[80px]">
          <span className="block animate-fade-up">One command.</span>
          <span className="block animate-fade-up [animation-delay:80ms]">Either runtime.</span>
        </h1>
        <p className="animate-fade-up [animation-delay:120ms] mt-5 sm:mt-6 text-gray-800 text-xl sm:text-2xl lg:text-[28px] font-semibold tracking-tight leading-snug">
          Containers for speed. VMs for isolation.
        </p>

        {/* Install command — greyed until release */}
        <div className="animate-fade-up [animation-delay:220ms] mt-5 sm:mt-6 w-full max-w-xl mx-auto">
          <div className="relative">
            <div
              aria-disabled="true"
              className="flex items-center gap-2 rounded-full bg-white/55 backdrop-blur-md ring-1 ring-gray-200/80 pl-1.5 pr-1.5 py-1.5 shadow-sm opacity-50 pointer-events-none select-none"
            >
              <div className="relative shrink-0">
                <button
                  type="button"
                  disabled
                  aria-haspopup="listbox"
                  aria-expanded={false}
                  aria-label="Install method"
                  className="inline-flex items-center gap-0.5 rounded-full px-2.5 py-1.5 text-xs font-semibold text-gray-600 cursor-not-allowed"
                >
                  {INSTALL_LABELS[installMethod]}
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>
              </div>
              <span className="h-5 w-px shrink-0 bg-gray-200/90" aria-hidden />
              <span
                title={activeCmd}
                className="flex-1 min-w-0 text-left text-sm sm:text-[15px] font-mono font-medium text-gray-600 truncate"
              >
                $ {activeCmd}
              </span>
              <button
                type="button"
                disabled
                aria-label="Copy install command (coming soon)"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-400 text-white shrink-0 flex items-center justify-center cursor-not-allowed shadow-md"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <span className="absolute -top-2.5 right-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500 ring-1 ring-gray-200">
              Coming soon
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="animate-fade-up [animation-delay:460ms] mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-3">
          <span
            aria-disabled="true"
            title="Coming soon"
            className="inline-flex items-center gap-2 bg-gray-300/85 text-gray-500 text-base font-semibold px-6 py-2.5 rounded-full cursor-not-allowed select-none"
          >
            <GithubIcon className="w-4 h-4" />
            View on GitHub
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500/90">
              Coming soon
            </span>
          </span>
          <button
            onClick={() => onNavigate && onNavigate('architecture')}
            className="text-gray-800 text-base font-semibold px-6 py-2.5 rounded-full ring-1 ring-gray-300 hover:bg-gray-100 transition-colors inline-block bg-white/40 backdrop-blur-xs cursor-pointer"
          >
            Read Specs
          </button>
        </div>

      </div>

      {/* Flex Spacer 2 */}
      <div className="flex-1 min-h-10 sm:min-h-12 lg:min-h-16 shrink-0" />

      {/* Dashboard image */}
      <div className="animate-hero-rise [animation-delay:620ms] relative z-0 w-[92%] sm:w-[84%] lg:w-[72%] max-w-4xl mx-auto shrink-0 -mb-10 sm:-mb-20 lg:-mb-32">
        <img
          src="/dash.webp"
          alt="Russel dashboard"
          width={1917}
          height={1127}
          className="w-full h-auto rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.35)] ring-1 ring-black/10"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </section>
  );
};
