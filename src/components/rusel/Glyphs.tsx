import React from 'react';

// Custom glyphs drawn from the page's own diagrams (shared kernel vs one kernel per VM),
// so icons read as Russel rather than as a stock icon set. Prop shape mirrors lucide
// (color, strokeWidth, x/y/width/height) so they can drop in anywhere a LucideIcon is used.
type GlyphProps = Omit<React.SVGProps<SVGSVGElement>, 'color' | 'strokeWidth'> & {
  color?: string;
  strokeWidth?: number;
};
export type Glyph = React.FC<GlyphProps>;

const make = (paint: () => React.ReactNode): Glyph =>
  function GlyphSvg({ color = 'currentColor', strokeWidth = 1.75, ...rest }) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        {...rest}
      >
        <g fill={color}>{paint()}</g>
      </svg>
    );
  };

/** Three apps sitting on one shared kernel. */
export const ContainerGlyph = make(() => (
  <>
    {[3, 9.5, 16].map((x) => (
      <rect key={x} x={x} y="4" width="5" height="7.5" rx="1.3" stroke="none" fillOpacity={0.4} />
    ))}
    <rect x="3" y="14" width="18" height="5.5" rx="1.5" stroke="none" />
  </>
));

/** Walled cells, each with its own app and its own kernel. */
export const MicroVMGlyph = make(() => (
  <>
    {[2.5, 13].map((x) => (
      <g key={x}>
        <rect x={x} y="2.5" width="8.5" height="19" rx="2" fill="none" />
        <rect x={x + 2.5} y="5.25" width="3.5" height="7" rx="1" stroke="none" fillOpacity={0.4} />
        <rect x={x + 2.5} y="14.25" width="3.5" height="4.5" rx="1" stroke="none" />
      </g>
    ))}
  </>
));
