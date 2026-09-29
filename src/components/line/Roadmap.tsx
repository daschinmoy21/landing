import React from 'react';
import { GuestArt, HardenedArt, PushArt, ReplicasArt, ResizeArt } from './RoadmapArt';
import { Cell, Grid, Section, SectionTitle, TileBody, TileTitle } from './primitives';

// Planned work from russel-dev issues (#507, #505, #506, #335, #340, #341, #234, #334)
// and the vertical-scaling plan.
const ITEMS: { title: string; body: string; rows: [string, string][]; art: React.FC }[] = [
  {
    title: 'Hardened containers',
    art: HardenedArt,
    body: 'Run untrusted code under gVisor on any VPS, no /dev/kvm required.',
    rows: [
      ['russelfile', 'isolation = "gvisor"'],
      ['runtime', 'runsc systrap, fails closed'],
    ],
  },
  {
    title: 'Deploy on git push',
    art: PushArt,
    body: 'Push to a branch and Russel builds and deploys it, with signed webhooks and no CI to set up.',
    rows: [
      ['trigger', 'signed webhook'],
      ['release', 'migrations run before traffic moves'],
    ],
  },
  {
    title: 'Replicas',
    art: ReplicasArt,
    body: 'Run N copies of one service behind a single hostname, then create and destroy them from load.',
    rows: [
      ['routing', 'Traefik multi-backend'],
      ['scale', 'manual, then autoscale'],
    ],
  },
  {
    title: 'Live resize',
    art: ResizeArt,
    body: 'Give a running microVM more vCPUs or memory without a reboot or a redeploy.',
    rows: [
      ['microvm', 'cpu + memory hotplug'],
      ['container', 'first-class cpus limit'],
    ],
  },
  {
    title: 'Full Linux guests',
    art: GuestArt,
    body: 'Boot a Linux userspace with systemd inside the guest instead of the minimal busybox init.',
    rows: [
      ['russelfile', 'service.guest = "linux"'],
      ['microvm', 'volumes + extra ports'],
    ],
  },
];

export const Roadmap: React.FC = () => (
  <Section id="roadmap">
    <SectionTitle lead="Coming soon." rest="What we’re building next." />

    <Grid className="sm:grid-cols-2 lg:grid-cols-3">
      {ITEMS.map(({ title, body, rows, art: Art }, i) => {
        // Five tiles: the last one spans two columns (art beside text) so no grid slot is left empty.
        const wide = i === ITEMS.length - 1;
        return (
          <Cell
            key={title}
            className={
              wide
                ? 'flex flex-col p-6 sm:col-span-2 sm:grid sm:grid-cols-2 sm:items-center sm:gap-x-10 sm:p-8'
                : 'flex flex-col p-6 sm:p-8'
            }
          >
            {/* Same panel height in each tile so the titles below line up. */}
            <div className="mx-auto h-[270px] w-full max-w-[400px]">
              <Art />
            </div>
            <div className={wide ? 'flex flex-col pt-8 sm:pt-0' : 'flex flex-1 flex-col pt-8'}>
              <TileTitle>{title}</TileTitle>
              <TileBody>{body}</TileBody>
              <dl className="mt-auto grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-1 pt-6 font-mono text-[13px]">
                {rows.map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-dimmer">{k}</dt>
                    <dd className="min-w-0 break-words text-mute">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Cell>
        );
      })}
    </Grid>
  </Section>
);
