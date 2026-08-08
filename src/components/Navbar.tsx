import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.2-3.37-1.2-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.64.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8a9.56 9.56 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="animate-fade-down relative z-20 w-full px-5 sm:px-8 lg:px-10 py-4 sm:py-5">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Left — text only per request */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center text-gray-900 group cursor-pointer"
        >
          <span className="font-bold text-base sm:text-lg tracking-tight text-gray-900 font-sans">
            Russel
          </span>
        </button>

        {/* Desktop Nav Links (hidden below md) */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick('architecture')}
            className="inline-flex items-center gap-1 text-[13px] text-gray-700 hover:text-gray-900 transition-colors font-medium cursor-pointer"
          >
            <span>Primitives</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>
          <button
            onClick={() => handleNavClick('topology')}
            className="text-[13px] text-gray-700 hover:text-gray-900 transition-colors font-medium cursor-pointer"
          >
            Topology
          </button>
          <button
            onClick={() => handleNavClick('benchmarks')}
            className="text-[13px] text-gray-700 hover:text-gray-900 transition-colors font-medium cursor-pointer"
          >
            Benchmarks
          </button>
          <button
            onClick={() => handleNavClick('cli')}
            className="text-[13px] text-gray-700 hover:text-gray-900 transition-colors font-medium cursor-pointer"
          >
            CLI Demo
          </button>
        </div>

        {/* Right CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/rusel/landing"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 bg-gray-900 text-white text-[13px] font-medium px-4 sm:px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="https://github.com/rusel/landing"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Hamburger (md:hidden) */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 rounded-full text-gray-900 hover:bg-gray-900/10 flex items-center justify-center transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute left-4 right-4 top-full mt-2 rounded-2xl bg-white/90 backdrop-blur-xl ring-1 ring-gray-200 px-5 py-3 animate-fade-up z-50 shadow-2xl flex flex-col">
          <button
            onClick={() => handleNavClick('architecture')}
            className="text-[15px] text-gray-700 hover:text-gray-900 py-3 border-b border-gray-200 flex items-center justify-between font-medium text-left"
          >
            <span>Primitives</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={() => handleNavClick('topology')}
            className="text-[15px] text-gray-700 hover:text-gray-900 py-3 border-b border-gray-200 font-medium text-left"
          >
            Topology
          </button>
          <button
            onClick={() => handleNavClick('benchmarks')}
            className="text-[15px] text-gray-700 hover:text-gray-900 py-3 border-b border-gray-200 font-medium text-left"
          >
            Benchmarks
          </button>
          <button
            onClick={() => handleNavClick('cli')}
            className="text-[15px] text-gray-700 hover:text-gray-900 py-3 border-b border-gray-200 font-medium text-left"
          >
            CLI Demo
          </button>
          <a
            href="https://github.com/rusel/landing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] text-gray-700 hover:text-gray-900 py-3 font-medium text-left inline-flex items-center gap-2"
          >
            <GithubIcon className="w-4 h-4" />
            GitHub
          </a>
        </div>
      )}
    </header>
  );
};
