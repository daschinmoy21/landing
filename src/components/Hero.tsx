import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';
import { Navbar } from './Navbar';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.2-3.37-1.2-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.64.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8a9.56 9.56 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);

const BG_IMAGE_URL =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260611_133301_d5f2a94a-b22e-4e4a-a6b6-eacdddf1f5b0.png&w=1280&q=85';

const GRASS_IMAGE_URL =
  'https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1781191264/grass_eam204.png';

interface HeroProps {
  onNavigate?: (sectionId: string) => void;
}

const INSTALL_CMDS = {
  curl: 'curl -fsSL https://russel.dev/install.sh | sh',
  nix: 'nix run github:rusel/landing#russel -- --help',
} as const;

type InstallMethod = keyof typeof INSTALL_CMDS;

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [installMethod, setInstallMethod] = useState<InstallMethod>('curl');
  const [copied, setCopied] = useState(false);
  const activeCmd = INSTALL_CMDS[installMethod];
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-cover bg-center flex flex-col font-sans"
      style={{ backgroundImage: `url("${BG_IMAGE_URL}")` }}
    >
      {/* Top Navbar */}
      <Navbar onNavigate={onNavigate} />

      {/* Flex Spacer 1 */}
      <div className="flex-1 min-h-8 sm:min-h-12 lg:min-h-16 shrink-0" />

      {/* Hero Content (Centered) */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Headline */}
        <h1 className="text-gray-900 font-normal leading-[1.05] tracking-tight text-[40px] min-[400px]:text-[44px] sm:text-6xl lg:text-7xl xl:text-[80px]">
          <span className="block animate-fade-up">Deploy services.</span>
          <span className="block animate-fade-up [animation-delay:100ms]">Stay in control.</span>
        </h1>

        {/* Install command — single toggleable line (curl / nix) */}
        <div className="animate-fade-up [animation-delay:220ms] mt-5 sm:mt-6 w-full max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-1.5 mb-2.5">
            {(['curl', 'nix'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setInstallMethod(m)}
                className={`px-3.5 py-1 rounded-full text-[11px] font-mono tracking-wide border transition-colors cursor-pointer ${installMethod === m ? 'bg-gray-900 text-white border-gray-900' : 'bg-white/70 text-gray-700 border-gray-200 hover:bg-white'}`}
              >
                {m === 'curl' ? 'curl' : 'nix run'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 rounded-full bg-white/80 backdrop-blur-md ring-1 ring-gray-200 pl-5 pr-1.5 py-1.5 shadow-sm">
            <span className="flex-1 text-left text-[13px] sm:text-sm font-mono text-gray-900 truncate select-all">
              $ {activeCmd}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy install command"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-900 text-white hover:bg-black active:scale-95 transition-all shrink-0 flex items-center justify-center cursor-pointer shadow-md"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="animate-fade-up [animation-delay:340ms] mt-4 sm:mt-5 text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mx-auto">
          Deploy any service as a fast container or an isolated microVM, on infrastructure you control.
          <Sparkles className="inline w-4 h-4 ml-1 -mt-1 text-gray-700" />
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-up [animation-delay:460ms] mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://github.com/rusel/landing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-800 hover:shadow-lg transition-all cursor-pointer"
          >
            <GithubIcon className="w-4 h-4" />
            View on GitHub
          </a>
          <button
            onClick={() => onNavigate && onNavigate('architecture')}
            className="text-gray-700 text-sm font-medium px-6 py-2.5 rounded-full ring-1 ring-gray-300 hover:bg-gray-100 transition-colors inline-block bg-white/40 backdrop-blur-xs cursor-pointer"
          >
            Read Specs
          </button>
        </div>

      </div>

      {/* Flex Spacer 2 */}
      <div className="flex-1 min-h-10 sm:min-h-12 lg:min-h-16 shrink-0" />

      {/* Dashboard image — use dash.png */}
      <div className="animate-hero-rise [animation-delay:620ms] relative z-0 w-[92%] sm:w-[84%] lg:w-[72%] max-w-4xl mx-auto shrink-0 -mb-10 sm:-mb-20 lg:-mb-32">
        <img
          src="/dash.png"
          alt="Russel dashboard"
          className="w-full h-auto rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.35)] ring-1 ring-black/10"
          loading="eager"
        />
      </div>

      {/* Grass Overlay PNG at bottom */}
      <img
        src={GRASS_IMAGE_URL}
        alt=""
        className="pointer-events-none absolute bottom-0 left-0 z-10 w-full select-none"
      />
    </section>
  );
};
