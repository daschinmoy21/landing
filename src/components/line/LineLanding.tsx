import React, { useEffect } from 'react';
import { Hero, Nav } from './Hero';
import { Runtimes } from './Runtimes';
import { Benchmarks } from './Benchmarks';
import { Operate } from './Operate';
import { ControlPlane } from './ControlPlane';
import { Deploy } from './Deploy';
import { Footer } from './Footer';
import { VIEWS } from './primitives';

export const LineLanding: React.FC = () => {
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
    <div className="isolate min-h-screen overflow-x-clip bg-sky font-sans text-fg antialiased selection:bg-vm selection:text-night">
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
