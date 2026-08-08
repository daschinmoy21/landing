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
      className="pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden relative border-t border-slate-200/40"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/20 via-transparent to-sky-50/20 pointer-events-none" />

      <div className="relative z-10 w-full overflow-hidden border-y border-slate-200/60 py-4 mb-16 select-none bg-white/70 backdrop-blur-sm">
        <div ref={marqueeRef} className="whitespace-nowrap inline-block flex items-center">
          <span className="font-display italic text-2xl sm:text-3xl md:text-4xl text-slate-700/70 tracking-widest uppercase">
            {REPEATED_MARQUEE}
          </span>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center mb-20">
        <span className="text-xs text-slate-500 uppercase tracking-[0.3em] font-mono mb-4 inline-block">
          OPEN SOURCE
        </span>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-display italic text-slate-900 mb-4 tracking-tight">
          Deploy with zero drift.
        </h2>
        <p className="text-sm md:text-base text-slate-600 mb-8 leading-relaxed">
          Self-hosted, MIT-licensed. Clone, build with Nix, and run — or grab the installer.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://github.com/rusel/landing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-black transition-colors"
          >
            View on GitHub ↗
          </a>
          <button
            onClick={() => document.getElementById('cli')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-6 py-3 rounded-full text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Read docs
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-8 border-t border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-mono">
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/rusel/landing"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 transition-colors"
          >
            GitHub
          </a>
          <a href="#architecture" className="hover:text-slate-900 transition-colors">
            Documentation
          </a>
          <a href="#cli" className="hover:text-slate-900 transition-colors">
            Install
          </a>
          <a href="#benchmarks" className="hover:text-slate-900 transition-colors">
            Benchmarks
          </a>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Engine Status: Operational</span>
        </div>

        {/* Right Copyright */}
        <div>© 2026 Russel Platform. MIT License.</div>
      </div>
    </footer>
  );
};
