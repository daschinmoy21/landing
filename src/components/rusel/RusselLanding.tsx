import React from 'react';
import { Hero } from '../Hero';
import { QuoteSection } from './QuoteSection';
import { SelectedWorks } from './SelectedWorks';
import { ArchitecturePipeline } from './ArchitecturePipeline';
import { BenchmarkSection } from './BenchmarkSection';
import { CliPlayground } from './CliPlayground';
import { FooterSection } from './FooterSection';
import GradientWaves from '../GradientWaves';

export const RusselLanding: React.FC = () => {
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans antialiased selection:bg-slate-900 selection:text-white relative">
      {/* Fixed animated gradient-wave background — visible below hero, hero covers it */}
      <div className="fixed inset-0 z-0" aria-hidden>
        <GradientWaves
          horizonColor="#071428"
          waveColor="#134B6A"
          crestColor="#9ED1EA"
          speed={0.22}
          amplitude={3.2}
          waveScale={0.62}
          waveRatio={0.9}
          swell={34}
          turbulence={18}
          tilt={1.12}
          zoom={1.0}
          height={5.6}
          fogDepth={14}
          detail="medium"
          brightness={1.08}
          opacity={0.95}
          mouseInteraction={true}
          parallaxStrength={0.45}
          grain={true}
          grainIntensity={0.04}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#010A17]/20 via-transparent to-transparent" />
      </div>

      <main className="relative z-10">
        <Hero onNavigate={handleNavigate} />
        <QuoteSection />
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
