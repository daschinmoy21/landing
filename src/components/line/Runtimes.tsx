import React from 'react';
import { RuntimeArt } from './Art';
import { CutoverDiagram, RusselfileDiagram } from './Diagrams';
import { Cell, Grid, Section, SectionTitle, TileBody, TileTitle } from './primitives';

const TILES = [
  {
    title: 'Everything in one Russelfile',
    body: 'Runtime, resources, routing and secrets, versioned next to your code. Apps run unprivileged by default.',
    art: RusselfileDiagram,
  },
  {
    title: 'Isolation you pick per service',
    body: 'Containers share the host kernel. microVMs get their own, behind a hardware boundary.',
    art: RuntimeArt,
  },
  {
    title: 'Switch in one line',
    body: 'Redeploy, and the new version takes traffic before the old one drains.',
    art: CutoverDiagram,
  },
];

export const Runtimes: React.FC = () => (
  <Section id="runtimes">
    <SectionTitle lead="Same build, same config, same CLI." rest="Only the isolation changes." />

    <Grid className="lg:grid-cols-3">
      {TILES.map(({ title, body, art: Art }) => (
        <Cell key={title} className="flex flex-col p-6 sm:p-9">
          <TileTitle>{title}</TileTitle>
          <TileBody>{body}</TileBody>
          <div className="mt-auto pt-10">
            <div className="mx-auto max-w-[380px] lg:max-w-none">
              <Art />
            </div>
          </div>
        </Cell>
      ))}
    </Grid>
  </Section>
);
