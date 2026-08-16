import React from 'react';
import { Hero } from '../Hero';
import { SelectedWorks } from './SelectedWorks';
import { ArchitecturePipeline } from './ArchitecturePipeline';
import { BenchmarkSection } from './BenchmarkSection';
import { CliPlayground } from './CliPlayground';
import { FooterSection } from './FooterSection';

export const RusselLanding: React.FC = () => {
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#cfeaf6] font-sans antialiased text-[#14233c] selection:bg-[#14233c] selection:text-white">
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-[#8ecce8] via-[#c5e8f6] to-[#f3fbff]"
        aria-hidden
      />

      <main className="relative z-10">
        <Hero onNavigate={handleNavigate} />
        <SelectedWorks />
        <ArchitecturePipeline />
        <BenchmarkSection />
        <CliPlayground />
        <FooterSection />
      </main>
    </div>
  );
};

export default RusselLanding;
