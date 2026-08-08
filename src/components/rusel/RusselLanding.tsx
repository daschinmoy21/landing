import React from 'react';
import { Hero } from '../Hero';
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
      {/* Fixed animated gradient-wave background behind everything (hero sits above it) */}
      <div className="fixed inset-0 z-0" aria-hidden>
        <GradientWaves
          horizonColor="#55B9E8"
          waveColor="#36A878"
          crestColor="#F7FFF9"
          speed={0.35}
          amplitude={3.4}
          waveScale={0.62}
          waveRatio={0.9}
          swell={34}
          turbulence={18}
          tilt={1.12}
          zoom={1.0}
          height={5.6}
          fogDepth={14}
          detail="medium"
          brightness={1.15}
          opacity={0.95}
          mouseInteraction={true}
          parallaxStrength={0.5}
          grain={true}
          grainIntensity={0.04}
        />
        {/* Soft light overlay so cards/text stay readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/10 via-white/5 to-emerald-50/10" />
      </div>

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
