import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

const ROLES = ['MicroVM', 'Container', 'Deterministic', 'Nix-Native'];

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle roles every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // HLS Video Initialization
  useEffect(() => {
    const hlsUrl = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        autoStartLoad: true,
        capLevelToPlayerSize: true,
      });
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );

      tl.fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1 },
        '-=0.8'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-bg px-6 pt-28 pb-20"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 opacity-30"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-brightness-90" />
        {/* Bottom Fade Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-bg via-bg/80 to-transparent z-1" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Top Runtime Badge */}
        <div className="blur-in inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/80 border border-white/10 text-xs font-mono text-muted mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>russel-ctrl v0.4.2 • Cloud Hypervisor + Podman</span>
        </div>

        {/* Title / Name */}
        <h1 className="name-reveal text-6xl sm:text-8xl md:text-9xl font-display italic leading-[0.88] tracking-tight text-text-primary mb-6">
          Russel Platform
        </h1>

        {/* Role Line */}
        <div className="blur-in text-lg sm:text-xl md:text-2xl text-muted font-light mb-6 h-10 flex items-center justify-center gap-2">
          <span>A</span>
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block font-normal text-2xl sm:text-3xl"
          >
            {ROLES[roleIndex]}
          </span>
          <span>runtime for self-hosted isolation.</span>
        </div>

        {/* Description */}
        <p className="blur-in text-sm md:text-base text-muted max-w-lg mb-10 text-center leading-relaxed">
          Deploy Nix-built services as hardware-isolated microVMs via KVM and Cloud Hypervisor or rootless Podman containers with zero configuration drift.
        </p>

        {/* Floating Quick Terminal Widget */}
        <div className="blur-in w-full max-w-xl bg-surface/90 border border-stroke rounded-2xl p-4 text-left font-mono text-xs mb-10 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between border-b border-stroke/60 pb-2.5 mb-3 text-[10px] text-muted">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              russel-cli deploy
            </span>
            <span className="text-emerald-400">Spawn-to-Ready: &lt; 900ms</span>
          </div>
          <div className="text-muted/70">
            $ <span className="text-text-primary">russel deploy ./app --runtime microvm -p 8080:3000</span>
          </div>
          <div className="text-sky-400/90 mt-1.5">
            [+] Nix build pure closure: /nix/store/7x8a...-app<br />
            [+] Cloud Hypervisor VMM booted with virtio-fs read-only store<br />
            <span className="text-emerald-400 font-bold">✓ Target 'app' LIVE on http://127.0.0.1:8080</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="blur-in flex flex-wrap items-center justify-center gap-4">
          {/* Join Waitlist Button */}
          <button
            onClick={() => onNavigate('waitlist')}
            className="group relative rounded-full p-[1px] accent-gradient cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary rounded-full px-8 py-4 text-sm font-semibold transition-all duration-300 flex items-center gap-2">
              <span>Join Waitlist</span>
              <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
          </button>

          {/* Try CLI Play Button */}
          <button
            onClick={() => onNavigate('cli')}
            className="group relative rounded-full p-[1px] bg-stroke hover:accent-gradient cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-bg text-text-primary rounded-full px-8 py-4 text-sm font-medium transition-all duration-300 flex items-center gap-2">
              <span>Try CLI Demo</span>
              <span className="text-muted group-hover:text-text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5">↘</span>
            </div>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-[10px] text-muted uppercase tracking-[0.25em] font-mono">SCROLL</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="w-full h-1/2 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};
