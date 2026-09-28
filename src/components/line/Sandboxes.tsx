import React from 'react';
import { AGENTS, AgentMark } from './agentLogos';
import { EgressArt, LifecycleDiagram, SharedTerminal, StoreArt } from './SandboxArt';
import { SandboxFanout } from './SandboxFanout';
import { Cell, Grid, Section, SectionTitle, TileBody, TileTitle } from './primitives';

// Direction from russel-dev: docs/project/agent-sandboxes-plan.md (deferred, not shipped).

const Footnote: React.FC<{ rows: [string, string][] }> = ({ rows }) => (
  <dl className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-1 font-mono text-[13px]">
    {rows.map(([k, v]) => (
      <div key={k} className="contents">
        <dt className="text-dimmer">{k}</dt>
        <dd className="text-mute min-w-0 break-words">{v}</dd>
      </div>
    ))}
  </dl>
);

// The first adapters the plan commits to; everything else in the logo grid is on the list, not promised.
const FIRST = ['Claude Code', 'Codex', 'opencode'];
const ORDERED = [...AGENTS].sort((a, b) => Number(FIRST.includes(b.name)) - Number(FIRST.includes(a.name)));

const TILES: { title: string; body: string; rows: [string, string][]; art: React.FC }[] = [
  {
    title: 'Toolchains stored once',
    body: 'Sandboxes take their tools from the Nix store on your server. Ten attempts on the same stack share one copy; only their files are their own.',
    rows: [
      ['shared', 'toolchains, read-only'],
      ['sees', 'only what it needs'],
      ['own', 'workspace and caches'],
    ],
    art: StoreArt,
  },
  {
    title: 'Step in next to it',
    body: 'SSH into the same sandbox the agent is using to look around, try the app, or take over. It keeps running after you both leave.',
    rows: [
      ['access', 'ssh, same as the agent'],
      ['stays up', 'until its ttl or you delete it'],
    ],
    art: SharedTerminal,
  },
  {
    title: 'You choose what it can reach',
    body: 'Pick a network profile per sandbox. Your server, its control plane and other sandboxes are off-limits by default.',
    rows: [
      ['network', 'offline, packages, git, web'],
      ['ports', 'private unless you share'],
    ],
    art: EgressArt,
  },
];

export const Sandboxes: React.FC = () => (
  <Section id="sandboxes">
    <SectionTitle lead="Agent sandboxes." rest="Coming next.">
      Hand a coding agent its own machine on your server. It does the work, you keep the result, and the machine disappears.
    </SectionTitle>

    <Grid className="lg:grid-cols-3">
      <Cell className="bg-night/60 p-6 sm:p-9 lg:col-span-3">
        <TileTitle>Try every idea at once</TileTitle>
        <TileBody>One prompt, several sandboxes. Each attempt gets its own machine; you keep the one that works and the rest are deleted.</TileBody>
        <div className="mt-10">
          <SandboxFanout />
        </div>
      </Cell>

      <Cell className="p-6 sm:p-9 lg:col-span-2">
        <TileTitle>Bring the agent you already use</TileTitle>
        <TileBody>It stays on your machine, logged in as you, and works in the sandbox over SSH. Nothing to install or log in to inside.</TileBody>

        <ul className="border-line mt-8 grid grid-cols-2 border-t border-l sm:grid-cols-4">
          {ORDERED.map((a) => (
            <li
              key={a.name}
              className={`border-line text-fg flex flex-col items-center justify-center gap-3 border-r border-b px-3 py-6`}
            >
              <AgentMark mark={a} className="h-8 w-8" />
              <span className="text-mute font-mono text-[12px]">{a.name}</span>
            </li>
          ))}
        </ul>
        <p className="text-dimmer mt-4 font-mono text-[12px]">Tested first with Claude Code, Codex and opencode. Logos belong to their owners.</p>
      </Cell>

      <Cell className="flex flex-col p-6 sm:p-9">
        <TileTitle>Keep it or throw it away</TileTitle>
        <TileBody>
          Sandboxes are deleted when the job is done. Keep one instead and its files, tools and caches are there next
          time, or snapshot it and fork a fresh copy.
        </TileBody>
        <Footnote
          rows={[
            ['default', 'deleted when done'],
            ['keep', 'files, tools, caches'],
            ['fork', 'from any snapshot'],
          ]}
        />
        <div className="mt-8 lg:mt-auto lg:pt-8">
          <LifecycleDiagram />
        </div>
      </Cell>

      {TILES.map(({ title, body, rows, art: Art }) => (
        <Cell key={title} className="flex flex-col p-6 sm:p-9">
          {/* Same panel height in each tile so the titles below line up. */}
          <div className="h-[270px]">
            <Art />
          </div>
          <div className="pt-8">
            <TileTitle>{title}</TileTitle>
            <TileBody>{body}</TileBody>
            <Footnote rows={rows} />
          </div>
        </Cell>
      ))}
    </Grid>
  </Section>
);
