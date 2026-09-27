import React, { useEffect } from 'react';
import { Hero } from './Hero';
import { Runtimes } from './Runtimes';
import { Benchmarks } from './Benchmarks';
import { Pipeline } from './Pipeline';
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
    <div className="min-h-screen overflow-x-clip bg-paper font-sans text-ink antialiased selection:bg-ink selection:text-paper">
      <main>
        <Hero />
        <Runtimes />
        <Benchmarks />
        <Pipeline />
        <Deploy />
      </main>
      <Footer />
    </div>
  );
};

export default LineLanding;
