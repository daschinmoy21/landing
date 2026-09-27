import React, { useState } from 'react';
import { DriftArt, RackArt } from './Art';
import { GenerationsDiagram, SecretsDiagram } from './Diagrams';
import { Cell, Grid, Section, SectionTitle, TileBody, TileTitle } from './primitives';

const D = ({ children }: { children: React.ReactNode }) => <span className="text-dimmer">{children}</span>;
const Cmd = ({ children }: { children: React.ReactNode }) => (
  <div>
    <span className="select-none text-dimmer">$ </span>
    <span className="text-fg">{children}</span>
  </div>
);
// Column-align labels the way the CLI does (`{:>10}`).
const pad = (s: string) => s.padStart(10, ' ');

const ITEMS: { title: string; body: string; screen: React.ReactNode }[] = [
  {
    title: 'Start from a Russelfile',
    body: 'russel init writes a starter file. Runtime, port and memory live there, next to your code.',
    screen: (
      <>
        <Cmd>russel init --type microvm --port 3000</Cmd>
        <Cmd>cat Russelfile.toml</Cmd>
        {'\n'}
        <span className="text-fg">[service]</span>
        {'\nname   = '}
        <span className="text-ok">"api"</span>
        {'\nsource = '}
        <span className="text-ok">"."</span>
        {'\nport   = '}
        <span className="text-ok">3000</span>
        {'\nmemory = '}
        <span className="text-ok">"256mb"</span>
        {'\ntype   = '}
        <span className="text-vm">"microvm"</span>
        {'\n'}
      </>
    ),
  },
  {
    title: 'See every service',
    body: 'Both runtimes in one list, with ports and uptime. The same data the dashboard shows.',
    screen: (
      <>
        <Cmd>russel ps</Cmd>
        {'\n'}
        <D>{'  ID          RUNTIME    STATUS    STATE    PORTS      UPTIME'}</D>
        {'\n  '}
        <span className="font-bold text-fg">api       </span>
        {'  '}
        <span className="text-vm">microvm  </span>
        {'  '}
        <span className="text-ok">deployed</span>
        {'  running  8080→3000  4d 6h\n  '}
        <span className="font-bold text-fg">gitea     </span>
        {'  '}
        <span className="text-ct">container</span>
        {'  '}
        <span className="text-ok">deployed</span>
        {'  running  3100→3000  2d 1h\n  '}
        <span className="font-bold text-fg">notes-api </span>
        {'  '}
        <span className="text-vm">microvm  </span>
        {'  '}
        <span className="text-warn">stopped </span>
        {'  stopped  —          —\n\n'}
        <Cmd>russel logs api</Cmd>
        <D>listening on 0.0.0.0:3000</D>
      </>
    ),
  },
  {
    title: 'Roll back to any generation',
    body: 'Every deploy is pinned to its commit and Russelfile. A failed redeploy rolls itself back.',
    screen: (
      <>
        <Cmd>russel rollback api --version 2</Cmd>
        {'\n'}
        <span className="font-bold text-fg">{'  russel rollback'}</span>
        {'  api\n\n'}
        <D>{`  ${pad('resolve')}  · Resolving source & Russelfile\n  ${pad('build')}  · Building package\n  ${pad('create')}  · Preparing container rootfs\n  ${pad('start')}  · Starting rootless Podman container\n  ${pad('ready')}  · Waiting for container service to be reachable`}</D>
        {'\n\n  '}
        <span className="font-bold text-ok">✓</span>
        {' Deployed in '}
        <span className="font-bold text-fg">812ms</span>
        {'\n\n'}
        <D>{`  ${pad('service')}`}</D>
        {'  api\n'}
        <D>{`  ${pad('status')}`}</D>
        {'  '}
        <span className="text-ok">deployed</span>
        {'\n'}
        <D>{`  ${pad('rev')}`}</D>
        {'  9e0b21d4c1aa'}
      </>
    ),
  },
  {
    title: 'Keep secrets off the repo',
    body: 'Values live on the control plane. The Russelfile only holds a secret:// reference.',
    screen: (
      <>
        <Cmd>printf '%s' "$DATABASE_URL" | russel secrets set DATABASE_URL</Cmd>
        {'\n'}
        <span className="font-bold text-fg">{'  secrets'}</span>
        {'\n'}
        <D>{`  ${pad('set')}`}</D>
        {'  DATABASE_URL\n\n'}
        <Cmd>russel secrets list</Cmd>
        {'\n'}
        <span className="font-bold text-fg">{'  secrets'}</span>
        {'\n  DATABASE_URL\n  STRIPE_KEY'}
      </>
    ),
  },
];

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
    body: 'Bare metal, an edge box, or a cloud account you control. Nothing phones home.',
    art: RackArt,
    rows: [
      ['container', 'any VPS, rootless Podman'],
      ['microvm', 'needs /dev/kvm'],
    ] as [string, string][],
  },
  {
    title: 'Secrets stay on the host',
    body: 'Referenced by name, stored on the control plane, handed to the service at deploy.',
    art: SecretsDiagram,
    rows: [
      ['store', 'russel secrets set'],
      ['use', 'secret://NAME'],
    ] as [string, string][],
  },
];

export const Operate: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <Section id="operate">
      <SectionTitle lead="Operate it from one CLI." rest="Inspect, roll back, rotate secrets." />

      <Grid className="lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <Cell>
          <div role="tablist" aria-label="CLI tasks" aria-orientation="vertical">
            {ITEMS.map((it, i) => (
              <button
                key={it.title}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`relative block w-full cursor-pointer border-b border-line px-6 py-6 text-left last:border-b-0 sm:px-9 sm:py-7 ${
                  active === i ? 'bg-raise' : 'hover:bg-cell'
                }`}
              >
                <span
                  className={`absolute inset-y-0 left-0 w-0.5 ${active === i ? 'bg-vm' : 'bg-transparent'}`}
                  aria-hidden
                />
                <TileTitle className={active === i ? '' : 'text-mute'}>{it.title}</TileTitle>
                <TileBody className={active === i ? '' : 'text-dimmer'}>{it.body}</TileBody>
              </button>
            ))}
          </div>
        </Cell>
        <Cell className="flex min-h-[420px] flex-col bg-cell">
          <div className="flex h-12 items-center justify-between border-b border-line px-5 font-mono text-[12px] text-dimmer">
            <span>~/api</span>
            <span>
              {active + 1} / {ITEMS.length}
            </span>
          </div>
          <pre key={active} className="animate-fade-up flex-1 overflow-x-auto whitespace-pre p-5 sm:p-7 font-mono text-[13px] leading-[1.75] text-mute">
            {ITEMS[active].screen}
          </pre>
        </Cell>
      </Grid>

      <Grid className="mt-0 border-t-0">
        <Cell className="px-6 pt-10 pb-8 sm:px-9">
          <GenerationsDiagram />
          <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <TileTitle>Every deploy is a generation</TileTitle>
              <TileBody>
                Pinned to its commit and Russelfile, runtime included. The last 20 are kept, and a failed redeploy rolls
                itself back.
              </TileBody>
            </div>
            <Footnote
              rows={[
                ['update', 'russel update api --refresh'],
                ['rollback', 'russel rollback api --version N'],
              ]}
            />
          </div>
        </Cell>
      </Grid>

      <Grid className="mt-0 border-t-0 lg:grid-cols-3">
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
};
