import React, { useEffect, useState } from 'react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Overview' },
    { id: 'architecture', label: 'Primitives' },
    { id: 'topology', label: 'Topology' },
    { id: 'benchmarks', label: 'Benchmarks' },
    { id: 'cli', label: 'CLI' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <nav
        className={`inline-flex items-center gap-1 sm:gap-1.5 rounded-full backdrop-blur-md border border-slate-200/60 bg-white/90 px-2 py-1.5 transition-all duration-300 pointer-events-auto ${
          isScrolled ? 'shadow-lg shadow-black/10 border-slate-200 bg-white' : ''
        }`}
      >
        <button
          onClick={() => onNavigate('hero')}
          className="px-2.5 py-1 rounded-full text-[13px] font-bold tracking-tight text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          title="Russel Home"
        >
          Russel
        </button>

        {/* Divider */}
        <div className="w-px h-4 bg-stroke mx-0.5 hidden sm:block" />

        {/* Nav Links */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-[11px] sm:text-xs rounded-full px-2.5 sm:px-3.5 py-1 sm:py-1.5 transition-all duration-200 cursor-pointer font-medium ${
                  isActive
                    ? 'text-text-primary bg-stroke/60 font-semibold'
                    : 'text-muted hover:text-text-primary hover:bg-stroke/40'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-stroke mx-0.5 hidden sm:block" />

        <a
          href="https://github.com/rusel/landing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full bg-slate-900 text-white px-3.5 py-1.5 text-[11px] sm:text-xs font-medium hover:bg-black transition-colors shrink-0 ml-0.5"
        >
          GitHub ↗
        </a>
      </nav>
    </header>
  );
};
