import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ease = [0.16, 1, 0.3, 1] as const;

interface Platform {
  name: string;
  sub: string;
  logo: string;
  accent: string;
  gridArea: string;
  logoHeight: number;
}

const platforms: Platform[] = [
  {
    name: 'MetaTrader 4',
    sub: 'Industry standard',
    logo: '/logos/mt4.png',
    accent: '#ff9f43',
    gridArea: 'mt4',
    logoHeight: 64,
  },
  {
    name: 'MetaTrader 5',
    sub: 'Next generation',
    logo: '/logos/mt5.png',
    accent: '#00aaff',
    gridArea: 'mt5',
    logoHeight: 64,
  },
  {
    name: 'cTrader',
    sub: 'Spotware',
    logo: '/logos/ctrader.png',
    accent: '#e8423f',
    gridArea: 'ct',
    logoHeight: 52,
  },
  {
    name: 'TradeLocker',
    sub: 'Next-gen platform',
    logo: '/logos/tradelocker.webp',
    accent: '#00ddb8',
    gridArea: 'tl',
    logoHeight: 32,
  },
];

const PlatformLogos: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 1,
        padding: 'var(--section-padding) var(--content-padding)',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: 16,
            }}
          >
            Integrations
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              marginBottom: 14,
            }}
          >
            Pre-Wired Trading Platforms
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              maxWidth: 480,
              margin: '0 auto',
            }}
          >
            Every account provisioned automatically. Your traders connect and trade from day one.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div
          className="platform-bento"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto auto',
            gridTemplateAreas: `
              "mt4 mt5"
              "ct tl"
            `,
            gap: 16,
          }}
        >
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease }}
              className="glass platform-bento-cell"
              style={{
                gridArea: p.gridArea,
                padding: 'clamp(28px, 4vw, 40px)',
                borderRadius: 22,
                cursor: 'default',
                transition: 'border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: 16,
                minHeight: 180,
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${p.accent}40`;
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = `0 16px 48px rgba(0,0,0,0.3), 0 0 0 1px ${p.accent}20, inset 0 0 80px ${p.accent}06`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--glass-border)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Subtle accent glow behind logo */}
              <div
                style={{
                  position: 'absolute',
                  top: '30%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 120,
                  height: 120,
                  background: `radial-gradient(circle, ${p.accent}10 0%, transparent 70%)`,
                  filter: 'blur(30px)',
                  pointerEvents: 'none',
                }}
              />

              {/* Logo */}
              <img
                src={p.logo}
                alt={`${p.name} logo`}
                style={{
                  height: p.logoHeight,
                  width: 'auto',
                  maxWidth: '80%',
                  objectFit: 'contain',
                  position: 'relative',
                  filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.3))',
                }}
              />

              {/* Text */}
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 17,
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    marginBottom: 4,
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    color: 'var(--text-tertiary)',
                  }}
                >
                  {p.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .platform-bento {
            grid-template-columns: 1fr !important;
            grid-template-areas:
              "mt4"
              "mt5"
              "ct"
              "tl" !important;
          }
          .platform-bento-cell {
            min-height: 150px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PlatformLogos;
