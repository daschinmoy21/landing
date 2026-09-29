import React from 'react';
import { GuestArt, HardenedArt, JobsArt, PushArt, ReplicasArt, ResizeArt } from './RoadmapArt';
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
    title: 'Scheduled jobs',
    art: JobsArt,
    body: 'Run one-off tasks and cron jobs with a service’s code, env and volumes, in a short-lived guest.',
    rows: [
      ['cli', 'russel run <service> -- <cmd>'],
      ['russelfile', '[jobs.<name>] schedule'],
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
      {ITEMS.map(({ title, body, rows, art: Art }) => (
        <Cell key={title} className="flex flex-col p-6 sm:p-8">
          {/* Same panel height in each tile so the titles below line up. */}
          <div className="mx-auto h-[270px] w-full max-w-[400px]">
            <Art />
          </div>
          <TileTitle className="pt-8">{title}</TileTitle>
          <TileBody>{body}</TileBody>
          <dl className="mt-auto grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-1 pt-6 font-mono text-[13px]">
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-dimmer">{k}</dt>
                <dd className="min-w-0 break-words text-mute">{v}</dd>
              </div>
            ))}
          </dl>
        </Cell>
      ))}
    </Grid>
  </Section>
);
