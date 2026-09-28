import React, { useEffect, useRef } from 'react';
import { Hero, Nav } from './Hero';
import { Runtimes } from './Runtimes';
import { Benchmarks } from './Benchmarks';
import { Operate } from './Operate';
import { ControlPlane } from './ControlPlane';
import { Deploy } from './Deploy';
import { Footer } from './Footer';
import { VIEWS } from './primitives';
import Scanner from './Scanner';

export const LineLanding: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  // Soften the background as the hero scrolls out: no blur at the top, full blur once it is gone.
  useEffect(() => {
    const bg = bgRef.current;
    const hero = document.getElementById('top');
    if (!bg || !hero) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = hero.offsetHeight;
      const p = Math.min(1, Math.max(0, (window.scrollY - h * 0.35) / (h * 0.65)));
      bg.style.filter = p > 0 ? `blur(${(p * 8).toFixed(2)}px)` : '';
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Same shortcut as the dashboard: 1–4 jump between views.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      const view = VIEWS[Number(e.key) - 1];
      if (view) document.getElementById(view.id)?.scrollIntoView({ behavior: 'smooth' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="isolate min-h-screen overflow-x-clip bg-night font-sans text-fg antialiased selection:bg-vm selection:text-night">
      {/* Fixed behind every section; -z-10 stays above the root background because of `isolate`. */}
      <div ref={bgRef} className="pointer-events-none fixed -inset-6 -z-10" aria-hidden>
        <Scanner color1="#6ea8ff" color2="#b294ff" color3="#ededed" opacity={0.6} sweepWidth={1.1} />
      </div>
      <Nav />
      <main>
        <Hero />
        <Runtimes />
        <Benchmarks />
        <Operate />
        <ControlPlane />
        <Deploy />
      </main>
      <Footer />
    </div>
  );
};

export default LineLanding;
