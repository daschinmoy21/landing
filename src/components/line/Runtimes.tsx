import React from 'react';
import { RuntimeArt } from './Art';
import { CutoverDiagram, RusselfileDiagram } from './Diagrams';
import { Cell, Grid, Section, SectionTitle, TileBody, TileTitle } from './primitives';

// From xl up, the tall Russelfile spans both rows on the left and the two shorter
// tiles stack on the right. Below that every tile is a full-width row with its
// text beside its diagram, so no cell is left stretching around empty space.
const row = 'md:grid md:items-center md:gap-10';

export const Runtimes: React.FC = () => (
  <Section id="runtimes">
    <SectionTitle lead="Same build, same config, same CLI." rest="Only the isolation changes." />

    <Grid className="xl:grid-cols-2">
      <Cell className={`p-6 sm:p-9 ${row} md:grid-cols-[minmax(0,1fr)_minmax(0,400px)] xl:row-span-2 xl:flex xl:flex-col xl:items-stretch`}>
        <div>
          <TileTitle>Everything in one Russelfile</TileTitle>
          <TileBody>
            Runtime, resources, routing and secrets, versioned next to your code. Apps run unprivileged by default.
          </TileBody>
        </div>
        <div className="mt-8 md:mt-0 xl:mt-8 xl:flex xl:flex-1 xl:flex-col xl:justify-center">
          <RusselfileDiagram />
        </div>
      </Cell>

      <Cell className={`p-6 sm:p-9 ${row} md:grid-cols-[minmax(0,1fr)_minmax(0,300px)] xl:grid-cols-[minmax(0,1fr)_minmax(0,280px)]`}>
        <div>
          <TileTitle>Isolation you pick per service</TileTitle>
          <TileBody>Containers share the host kernel. microVMs get their own, behind a hardware boundary.</TileBody>
        </div>
        <div className="mx-auto mt-8 max-w-[340px] md:mt-0 md:max-w-none">
          <RuntimeArt />
        </div>
      </Cell>

      <Cell className={`p-6 sm:p-9 ${row} md:grid-cols-[minmax(0,1fr)_minmax(0,400px)] xl:block`}>
        <div>
          <TileTitle>Switch in one line</TileTitle>
          <TileBody>Redeploy, and the new version takes traffic before the old one drains.</TileBody>
        </div>
        <div className="mt-8 md:mt-0 xl:mt-8">
          <CutoverDiagram />
        </div>
      </Cell>
    </Grid>
  </Section>
);
