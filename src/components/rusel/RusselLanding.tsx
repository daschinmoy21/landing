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
    <div className="relative min-h-screen overflow-x-clip bg-[#eaf6fa] font-sans antialiased text-[#14233c] selection:bg-[#14233c] selection:text-white">
      {/* Keep the lower page in the same open, blue-sky atmosphere as the hero. */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <GradientWaves
          horizonColor="#b9dfed"
          waveColor="#70b5d0"
          crestColor="#f5fcff"
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
          brightness={1.02}
          opacity={0.58}
          mouseInteraction={true}
          parallaxStrength={0.45}
          grain={true}
          grainIntensity={0.04}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#dff3f8]/75 via-[#eaf6fa]/25 to-[#f7fcfd]/75" />
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
