import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

export const FooterSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <footer
      id="waitlist"
      className="pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden relative"
    >
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center mb-20">
        <span className="text-xs text-[#52768a] uppercase tracking-[0.3em] font-mono mb-4 inline-block">
          OPEN SOURCE
        </span>
        <h2 className="font-instrument italic text-[#14233c] text-4xl sm:text-6xl md:text-7xl mb-4 tracking-tight text-glow">
          Deploy with zero drift.
        </h2>
        <p className="text-sm md:text-base text-[#4d6176] mb-8 leading-relaxed">
          Self-hosted, MIT-licensed. Clone, build, and run — or grab the installer.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://github.com/rusel/landing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#14233c] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#203651] transition-colors button-glow"
          >
            View on GitHub ↗
          </a>
          <button
            onClick={() => document.getElementById('cli')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-white/45 text-[#315a71] border border-white/75 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium hover:bg-white/75 transition-colors cursor-pointer"
          >
            Read docs
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-8 border-t border-[#214b65]/15 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#708599] font-mono">
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/rusel/landing"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#14233c] transition-colors"
          >
            GitHub
          </a>
          <a href="#architecture" className="hover:text-[#14233c] transition-colors">
            Documentation
          </a>
          <a href="#cli" className="hover:text-[#14233c] transition-colors">
            Install
          </a>
          <a href="#benchmarks" className="hover:text-[#14233c] transition-colors">
            Benchmarks
          </a>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/45 border border-white/75 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#3a9a72] animate-pulse" />
          <span>Engine Status: Operational</span>
        </div>

        <div>© 2026 Russel Platform. MIT License.</div>
      </div>
    </footer>
  );
};
