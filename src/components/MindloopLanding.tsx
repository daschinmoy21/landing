import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hls from 'hls.js';

// Reusable fadeUp animation helper with staggered delays
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1.0] as const }
});

// Scroll-driven Word Reveal component for Mission section
interface ScrollWordProps {
  word: string;
  progress: any;
  range: [number, number];
  isHighlighted?: boolean;
}

const ScrollWord: React.FC<ScrollWordProps> = ({ word, progress, range, isHighlighted }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.25em] ${
        isHighlighted ? 'text-foreground font-semibold' : 'text-[hsl(var(--hero-subtitle))]'
      }`}
    >
      {word}
    </motion.span>
  );
};

export default function MindloopLanding() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const hlsVideoRef = useRef<HTMLVideoElement | null>(null);

  // Mission section scroll tracking
  const missionContainerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: missionProgress } = useScroll({
    target: missionContainerRef,
    offset: ['start 0.8', 'end 0.4']
  });

  // HLS stream setup for CTA section background video
  useEffect(() => {
    const video = hlsVideoRef.current;
    if (!video) return;

    const hlsUrl = 'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8';

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true
      });
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSubscribed(true);
  };

  // Word arrays for mission section
  const paragraph1Text =
    "We're building a space where curiosity meets clarity — where readers find depth, writers find reach, and every newsletter becomes a conversation worth having.".split(
      ' '
    );

  const paragraph2Text =
    'A platform where content, community, and insight flow together — with less noise, less friction, and more meaning for everyone involved.'.split(
      ' '
    );

  const highlightedWords = ['curiosity', 'meets', 'clarity', 'clarity —'];

  return (
    <div className="bg-background text-foreground font-sans min-h-screen overflow-x-hidden selection:bg-foreground/20 selection:text-foreground">
      {/* 1. Fixed Transparent Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 px-8 md:px-28 py-4 bg-transparent flex items-center justify-between">
        {/* Left: Concentric circles logo + text */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-7 h-7 rounded-full border-2 border-foreground/60 flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-3 h-3 rounded-full border border-foreground/60" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">Mindloop</span>
        </a>

        {/* Center-left: Nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#" className="text-foreground transition-colors">
            Home
          </a>
          <span className="text-muted-foreground/40">•</span>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">
            How It Works
          </a>
          <span className="text-muted-foreground/40">•</span>
          <a href="#philosophy" className="hover:text-foreground transition-colors">
            Philosophy
          </a>
          <span className="text-muted-foreground/40">•</span>
          <a href="#use-cases" className="hover:text-foreground transition-colors">
            Use Cases
          </a>
        </div>

        {/* Right: 3 social icons in liquid-glass circular buttons */}
        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:scale-[1.05] transition-transform"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:scale-[1.05] transition-transform"
            aria-label="LinkedIn"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:scale-[1.05] transition-transform"
            aria-label="Twitter"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </nav>

      {/* 2. Hero Section (Full Viewport Height) */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Fullscreen Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4"
        />

        {/* Bottom Fade Gradient to Pure Black */}
        <div className="h-64 bg-gradient-to-t from-background to-transparent absolute bottom-0 inset-x-0 z-1 pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 pt-28 md:pt-32 px-6 max-w-5xl mx-auto flex flex-col items-center">
          {/* Avatar Row */}
          <motion.div {...fadeUp(0.1)} className="flex items-center">
            <div className="flex -space-x-2">
              <img
                src="/assets/avatar-1.png"
                alt="Subscriber Avatar 1"
                className="w-8 h-8 rounded-full border-2 border-background object-cover"
              />
              <img
                src="/assets/avatar-2.png"
                alt="Subscriber Avatar 2"
                className="w-8 h-8 rounded-full border-2 border-background object-cover"
              />
              <img
                src="/assets/avatar-3.png"
                alt="Subscriber Avatar 3"
                className="w-8 h-8 rounded-full border-2 border-background object-cover"
              />
            </div>
            <span className="text-muted-foreground text-sm font-medium ml-3">
              7,000+ people already subscribed
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            {...fadeUp(0.2)}
            className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-2px] text-foreground max-w-6xl mt-6 leading-[1.05]"
          >
            Get{' '}
            <span
              className="font-serif italic font-normal"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Inspired
            </span>{' '}
            with Us
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.3)}
            className="text-lg max-w-xl mx-auto mt-6 leading-relaxed"
            style={{ color: 'hsl(var(--hero-subtitle))' }}
          >
            Join our feed for meaningful updates, news around technology and a shared journey toward
            depth and direction.
          </motion.p>

          {/* Email Form */}
          <motion.form
            {...fadeUp(0.4)}
            onSubmit={handleSubscribe}
            className="liquid-glass rounded-full p-2 max-w-lg w-full mx-auto flex items-center gap-2 mt-8"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent text-foreground placeholder:text-muted-foreground outline-none px-5 py-2 flex-1 text-sm border-none focus:outline-none"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-foreground text-background font-semibold rounded-full px-8 py-3 text-xs tracking-wider uppercase transition-transform cursor-pointer"
            >
              {subscribed ? 'SUBSCRIBED!' : 'SUBSCRIBE'}
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* 3. "Search has changed" Section */}
      <section className="pt-52 md:pt-64 pb-6 md:pb-9 max-w-7xl mx-auto px-6" id="how-it-works">
        {/* Heading */}
        <motion.h2
          {...fadeUp(0.1)}
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-2px] text-center text-foreground leading-[1.05]"
        >
          Search has{' '}
          <span
            className="font-serif italic font-normal"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            changed.
          </span>{' '}
          Have you?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-muted-foreground text-lg max-w-2xl mx-auto text-center mt-6 mb-24 leading-relaxed"
        >
          As artificial intelligence reshapes how information is discovered, building direct, trusted
          channels is no longer optional.
        </motion.p>

        {/* 3 Platform Cards */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-20">
          {/* Card 1: ChatGPT */}
          <motion.div
            {...fadeUp(0.3)}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-48 h-48 md:w-52 md:h-52 object-contain mx-auto mb-6 rounded-2xl bg-card border border-border/40 p-6 shadow-xl flex items-center justify-center transition-transform group-hover:scale-[1.02]">
              <img
                src="/assets/icon-chatgpt.png"
                alt="ChatGPT Icon"
                className="w-full h-full object-contain filter invert"
              />
            </div>
            <h3 className="font-semibold text-base text-foreground mb-2">ChatGPT</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Answers synthesize information instantly, bypassing traditional search results and
              index rankings.
            </p>
          </motion.div>

          {/* Card 2: Perplexity */}
          <motion.div
            {...fadeUp(0.4)}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-48 h-48 md:w-52 md:h-52 object-contain mx-auto mb-6 rounded-2xl bg-card border border-border/40 p-6 shadow-xl flex items-center justify-center transition-transform group-hover:scale-[1.02]">
              <img
                src="/assets/icon-perplexity.png"
                alt="Perplexity Icon"
                className="w-full h-full object-contain filter invert"
              />
            </div>
            <h3 className="font-semibold text-base text-foreground mb-2">Perplexity</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Conversational search engine citing direct sources and curated original publications.
            </p>
          </motion.div>

          {/* Card 3: Google AI */}
          <motion.div
            {...fadeUp(0.5)}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-48 h-48 md:w-52 md:h-52 object-contain mx-auto mb-6 rounded-2xl bg-card border border-border/40 p-6 shadow-xl flex items-center justify-center transition-transform group-hover:scale-[1.02]">
              <img
                src="/assets/icon-google.png"
                alt="Google AI Icon"
                className="w-full h-full object-contain filter invert"
              />
            </div>
            <h3 className="font-semibold text-base text-foreground mb-2">Google AI Overviews</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Generative summaries placed above search links prioritize authoritative content.
            </p>
          </motion.div>
        </div>

        {/* Bottom Tagline */}
        <motion.p
          {...fadeUp(0.6)}
          className="text-muted-foreground text-sm text-center font-medium tracking-wide"
        >
          If you don't answer the questions, someone else will.
        </motion.p>
      </section>

      {/* 4. Mission Section (Scroll-Driven Word Reveal) */}
      <section
        ref={missionContainerRef}
        className="pt-0 pb-32 md:pb-44 max-w-6xl mx-auto px-6 text-center"
        id="philosophy"
      >
        {/* Large Looping Video */}
        <motion.div {...fadeUp(0.1)} className="max-w-2xl aspect-square mx-auto rounded-3xl overflow-hidden mb-16 shadow-2xl border border-border/30">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4"
          />
        </motion.div>

        {/* Scroll-Driven Word Reveal Paragraph 1 */}
        <div className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-[-1px] max-w-5xl mx-auto text-center leading-snug">
          {paragraph1Text.map((word, i) => {
            const step = 0.4 / paragraph1Text.length;
            const start = i * step;
            const end = start + step * 2;
            const isHighlight = highlightedWords.includes(word.toLowerCase().replace(/[^a-z]/g, ''));
            return (
              <ScrollWord
                key={`p1-${i}`}
                word={word}
                progress={missionProgress}
                range={[start, Math.min(0.5, end)]}
                isHighlighted={isHighlight}
              />
            );
          })}
        </div>

        {/* Scroll-Driven Word Reveal Paragraph 2 */}
        <div className="text-xl md:text-2xl lg:text-3xl font-medium mt-10 max-w-4xl mx-auto text-center leading-relaxed">
          {paragraph2Text.map((word, i) => {
            const step = 0.4 / paragraph2Text.length;
            const start = 0.5 + i * step;
            const end = start + step * 2;
            return (
              <ScrollWord
                key={`p2-${i}`}
                word={word}
                progress={missionProgress}
                range={[start, Math.min(0.95, end)]}
              />
            );
          })}
        </div>
      </section>

      {/* 5. Solution Section */}
      <section className="py-32 md:py-44 border-t border-border/30 max-w-7xl mx-auto px-6" id="use-cases">
        {/* Label & Heading */}
        <motion.span
          {...fadeUp(0.1)}
          className="text-xs tracking-[3px] uppercase text-muted-foreground font-semibold mb-4 block"
        >
          SOLUTION
        </motion.span>

        <motion.h2
          {...fadeUp(0.2)}
          className="text-4xl md:text-6xl font-medium tracking-[-1px] text-foreground mb-12"
        >
          The platform for{' '}
          <span
            className="font-serif italic font-normal"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            meaningful
          </span>{' '}
          content
        </motion.h2>

        {/* Solution Video Banner */}
        <motion.div {...fadeUp(0.3)} className="rounded-2xl overflow-hidden aspect-[3/1] w-full mb-16 shadow-2xl border border-border/30">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4"
          />
        </motion.div>

        {/* 4-column feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div {...fadeUp(0.4)} className="flex flex-col">
            <h3 className="font-semibold text-base text-foreground mb-2">Curated Feed</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Algorithm-free feed delivering only high-signal publications you subscribe to.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.5)} className="flex flex-col">
            <h3 className="font-semibold text-base text-foreground mb-2">Writer Tools</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Distraction-free editor with native Markdown support, rich analytics, and subscriber
              management.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.6)} className="flex flex-col">
            <h3 className="font-semibold text-base text-foreground mb-2">Community</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Direct reader comments, private discussion threads, and subscriber-only Q&As.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.7)} className="flex flex-col">
            <h3 className="font-semibold text-base text-foreground mb-2">Distribution</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Multi-channel delivery across web, mobile apps, and instant email dispatch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6. CTA Section (HLS Video Background) */}
      <section className="py-32 md:py-44 border-t border-border/30 relative overflow-hidden flex items-center justify-center">
        {/* Background HLS Video */}
        <video
          ref={hlsVideoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-background/45 z-[1]" />

        {/* CTA Content Container */}
        <div className="z-10 relative flex flex-col items-center text-center max-w-3xl mx-auto px-6">
          {/* Concentric Circles Logo Icon */}
          <motion.div
            {...fadeUp(0.1)}
            className="w-10 h-10 rounded-full border-2 border-foreground/60 flex items-center justify-center mb-6"
          >
            <div className="w-5 h-5 rounded-full border border-foreground/60" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            {...fadeUp(0.2)}
            className="text-4xl md:text-6xl font-medium tracking-[-1px] text-foreground mb-4"
          >
            Start Your{' '}
            <span
              className="font-serif italic font-normal"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Journey
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.3)}
            className="text-muted-foreground text-base max-w-lg mb-10 leading-relaxed"
          >
            Join thousands of readers and writers who have found their home for long-form thought and
            deep conversation.
          </motion.p>

          {/* Buttons */}
          <motion.div {...fadeUp(0.4)} className="flex flex-wrap items-center justify-center gap-4">
            <button className="bg-foreground text-background font-semibold rounded-lg px-8 py-3.5 text-sm transition-transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
              Subscribe Now
            </button>
            <button className="liquid-glass text-foreground font-semibold rounded-lg px-8 py-3.5 text-sm transition-transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
              Start Writing
            </button>
          </motion.div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="py-12 px-8 md:px-28 border-t border-border/30 bg-background flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-muted-foreground text-sm font-medium">
          © 2026 Mindloop. All rights reserved.
        </span>
        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}
