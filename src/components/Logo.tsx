import React from 'react';

const Logo: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <div
    style={{
      fontFamily: 'var(--font-display)',
      fontSize: size,
      fontWeight: 800,
      letterSpacing: '-0.03em',
      lineHeight: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      userSelect: 'none',
    }}
  >
    <span style={{ color: 'var(--text-primary)' }}>PROPFLOW</span>
    <span
      style={{
        color: 'var(--accent)',
        background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-bright) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      TECH
    </span>
  </div>
);

export default Logo;
