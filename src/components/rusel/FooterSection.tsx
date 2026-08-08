import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';

export const FooterSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // HLS Video Initialization (Flipped Vertically)
  useEffect(() => {
    const hlsUrl = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({ autoStartLoad: true, capLevelToPlayerSize: true });
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
      if (hls) hls.destroy();
    };
  }, []);

  // GSAP Infinite Marquee Animation
  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const animation = gsap.to(marquee, {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      animation.kill();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
  };

  const MARQUEE_TEXT = 'HARDWARE ISOLATION • DETERMINISTIC NIX • ZERO DRIFT • DUAL RUNTIME • OPEN SOURCE • ';
  const REPEATED_MARQUEE = MARQUEE_TEXT.repeat(10);

  return (
    <footer
      id="waitlist"
      className="pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden relative"
    >
      <div className="relative z-10 w-full overflow-hidden border-y border-white/15 py-4 mb-16 select-none bg-white/5 backdrop-blur-sm">
        <div ref={marqueeRef} className="whitespace-nowrap inline-block flex items-center">
          <span className="font-instrument italic text-2xl sm:text-3xl md:text-4xl text-white/70 tracking-widest uppercase">
            {REPEATED_MARQUEE}
          </span>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center mb-20">
        <span className="text-xs text-white/60 uppercase tracking-[0.3em] font-mono mb-4 inline-block">
          OPEN SOURCE
        </span>
        <h2 className="font-instrument italic text-white text-4xl sm:text-6xl md:text-7xl mb-4 tracking-tight text-glow">
          Deploy with zero drift.
        </h2>
        <p className="text-sm md:text-base text-white/70 mb-8 leading-relaxed">
          Self-hosted, MIT-licensed. Clone, build, and run — or grab the installer.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://github.com/rusel/landing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#010A17] px-6 py-3 rounded-full text-sm font-medium hover:bg-white/90 transition-colors button-glow"
          >
            View on GitHub ↗
          </a>
          <button
            onClick={() => document.getElementById('cli')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/15 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium hover:bg-white/15 transition-colors cursor-pointer"
          >
            Read docs
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-8 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/60 font-mono">
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/rusel/landing"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a href="#architecture" className="hover:text-white transition-colors">
            Documentation
          </a>
          <a href="#cli" className="hover:text-white transition-colors">
            Install
          </a>
          <a href="#benchmarks" className="hover:text-white transition-colors">
            Benchmarks
          </a>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
          <span>Engine Status: Operational</span>
        </div>

        <div>© 2026 Russel Platform. MIT License.</div>
      </div>
    </footer>
  );
};
