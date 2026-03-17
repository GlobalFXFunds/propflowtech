import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => (
  <footer
    style={{
      position: 'relative',
      zIndex: 1,
      borderTop: '1px solid var(--glass-border)',
      padding: '48px var(--content-padding)',
    }}
  >
    <div
      style={{
        maxWidth: 'var(--content-max)',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 24,
      }}
    >
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Logo size={15} />
      </Link>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          color: 'var(--text-tertiary)',
          flexWrap: 'wrap',
        }}
      >
        <Link
          to="/case-studies"
          style={{ color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
        >
          Case Studies
        </Link>
        <span style={{ color: 'rgba(255,255,255,0.08)' }}>|</span>
        <a
          href="mailto:hello@propflowtech.com"
          style={{ color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
        >
          Contact
        </a>
        <span style={{ color: 'rgba(255,255,255,0.08)' }}>|</span>
        <span>&copy; {new Date().getFullYear()} PROPFLOWTECH</span>
      </div>
    </div>
  </footer>
);

export default Footer;
