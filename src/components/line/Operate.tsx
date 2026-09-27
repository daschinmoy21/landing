import React from 'react';
import { DriftArt, HostsArt } from './Art';
import { GenerationsDiagram } from './Diagrams';
import { Cell, Grid, Section, SectionTitle, TileBody, TileTitle } from './primitives';

const Footnote: React.FC<{ rows: [string, React.ReactNode][] }> = ({ rows }) => (
  <dl className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-1 font-mono text-[13px]">
    {rows.map(([k, v]) => (
      <div key={k} className="contents">
        <dt className="text-dimmer">{k}</dt>
        <dd className="min-w-0 break-words text-mute">{v}</dd>
      </div>
    ))}
  </dl>
);

const CELLS = [
  {
    title: 'Builds that never drift',
    body: 'Every service is a hash-pinned Nix package, bit-for-bit the same on your laptop and the server.',
    art: DriftArt,
    rows: [
      ['build', 'nix'],
      ['pin', 'commit + Russelfile'],
    ] as [string, string][],
  },
  {
    title: 'Runs on machines you own',
    body: 'Bare metal, an edge box, or a cloud account you control.',
    art: HostsArt,
    rows: [
      ['container', 'any VPS, rootless Podman'],
      ['microvm', 'needs /dev/kvm'],
    ] as [string, string][],
  },
  {
    title: 'Every deploy is a generation',
    body: 'Pinned to its commit and Russelfile, runtime included. A failed redeploy rolls itself back.',
    art: GenerationsDiagram,
    rows: [
      ['kept', 'last 20 generations'],
      ['undo', 'russel rollback api'],
    ] as [string, string][],
  },
];

export const Operate: React.FC = () => (
  <Section id="operate">
    <SectionTitle lead="Yours to run." rest="Reproducible, self-hosted, reversible." />

    <Grid className="lg:grid-cols-3">
      {CELLS.map(({ title, body, art: Art, rows }) => (
        <Cell key={title} className="flex flex-col p-6 sm:p-9">
          <div className="mx-auto w-full max-w-[360px]">
            <Art />
          </div>
          <div className="mt-auto pt-8">
            <TileTitle>{title}</TileTitle>
            <TileBody>{body}</TileBody>
            <Footnote rows={rows} />
          </div>
        </Cell>
      ))}
    </Grid>
  </Section>
);
