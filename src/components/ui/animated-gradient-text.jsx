import React from 'react';

/**
 * AnimatedGradientText Component
 * Displays text with a moving gradient animation matching the site design tokens.
 */
export function AnimatedGradientText({
  children,
  className = '',
  speed = 1,
  colorFrom = 'var(--accent, #63fe13)',
  colorTo = 'var(--accent-alt, #ff40ea)'
}) {
  const duration = `${6 / speed}s`;

  return (
    <span
      className={`animated-gradient-text ${className}`}
      style={{
        '--color-from': colorFrom,
        '--color-to': colorTo,
        background: `linear-gradient(90deg, var(--color-from), var(--color-to), var(--color-from))`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: `gradient-slide ${duration} linear infinite`,
        display: 'inline-block'
      }}
    >
      <style>{`
        @keyframes gradient-slide {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>
      {children}
    </span>
  );
}
