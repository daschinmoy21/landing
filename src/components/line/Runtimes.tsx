import React from 'react';
import { DriftArt, RackArt, RuntimeArt } from './Art';
import { SectionTitle } from './primitives';

const COLUMNS = [
  {
    title: 'Pick the isolation per service',
    body: 'Containers share the host kernel and start fastest. microVMs get their own kernel behind KVM and still boot in under two seconds.',
    art: RuntimeArt,
  },
  {
    title: 'Builds that never drift',
    body: 'Every service is a hash-pinned Nix package. What you tested on your laptop is bit-for-bit what runs on the server.',
    art: DriftArt,
  },
  {
    title: 'Runs on machines you own',
    body: 'Bare metal, an edge box, or a cloud account you control. No external APIs, nothing phoning home, Apache 2.0.',
    art: RackArt,
  },
];

export const Runtimes: React.FC = () => (
  <section id="runtimes" className="mx-auto max-w-[1240px] px-4 sm:px-8 pt-24 sm:pt-32">
    <SectionTitle title="Same build, same config, same CLI.">
      The only thing you choose is how strongly each service is walled off, and you can change your mind later.
    </SectionTitle>

    <div className="mt-12 grid border-t border-l border-ink lg:grid-cols-3">
      {COLUMNS.map(({ title, body, art: Art }) => (
        <article key={title} className="flex flex-col border-r border-b border-ink">
          <div className="border-b border-ink px-4 py-6 sm:px-6">
            <div className="mx-auto max-w-[420px]">
              <Art />
            </div>
          </div>
          <div className="p-6 sm:p-7">
            <h3 className="font-display text-[22px] font-medium tracking-tight text-ink">{title}</h3>
            <p className="mt-2 text-[16px] leading-relaxed text-dim">{body}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
);
