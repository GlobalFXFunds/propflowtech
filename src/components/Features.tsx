import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ease = [0.16, 1, 0.3, 1];

const features = [
  {
    title: 'Branded Trader Dashboard',
    desc: 'Your logo, your colors, your domain. Traders see your brand — not ours.',
    accent: '#00aaff',
  },
  {
    title: 'Challenge Management',
    desc: 'Automated breach detection, phase progression, and profit target enforcement.',
    accent: '#7c5cff',
  },
  {
    title: 'Multi-Platform Support',
    desc: 'Pre-wired integrations with MT4, MT5, cTrader, and TradeLocker. Accounts provisioned automatically.',
    accent: '#00ddb8',
  },
  {
    title: 'Automated Withdrawals',
    desc: 'Multiple withdrawal methods, automated processing, and full audit trail.',
    accent: '#ff9f43',
  },
  {
    title: 'Payment Processing',
    desc: 'Payment gateway integration out of the box. Accept payments globally from day one.',
    accent: '#00aaff',
  },
  {
    title: 'Admin Control Panel',
    desc: 'Full oversight — manage accounts, review withdrawals, monitor risk, and control everything.',
    accent: '#7c5cff',
  },
  {
    title: 'Email & Notifications',
    desc: 'Automated emails for purchases, breaches, withdrawals, and more. Fully branded.',
    accent: '#00ddb8',
  },
  {
    title: 'Affiliate System',
    desc: 'Built-in referral program. Your traders bring more traders. Track commissions automatically.',
    accent: '#ff9f43',
  },
  {
    title: 'Analytics & Risk Desk',
    desc: 'Real-time P&L tracking, trader statistics, fraud monitoring, and breach detection.',
    accent: '#00aaff',
  },
  {
    title: 'Compliance Framework',
    desc: 'Company structure, terms of service, and regulatory considerations — all pre-arranged.',
    accent: '#7c5cff',
  },
  {
    title: 'Certificate System',
    desc: 'Branded funded trader certificates. Auto-generated and verifiable.',
    accent: '#00ddb8',
  },
  {
    title: '24/7 Infrastructure',
    desc: 'We host, monitor, and maintain everything. 99.9% uptime guaranteed.',
    accent: '#ff9f43',
  },
];

const Features: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.08);

  return (
    <section
      id="features"
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 1,
        padding: `var(--section-padding) var(--content-padding)`,
      }}
    >
      {/* Section glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 500,
          background: 'radial-gradient(ellipse, rgba(120, 80, 255, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', position: 'relative' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease }}
          style={{ textAlign: 'center', marginBottom: 60 }}
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
            What's Included
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(30px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              maxWidth: 700,
              margin: '0 auto 16px',
            }}
          >
            Everything. Out of the Box.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              maxWidth: 520,
              margin: '0 auto',
            }}
          >
            No third-party tools. No additional vendors. One platform with everything your prop firm needs to operate.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div
          className="features-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
          }}
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 * i, ease }}
              className="glass"
              style={{
                padding: '28px 24px',
                borderRadius: 18,
                cursor: 'default',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${f.accent}40`;
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = `0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px ${f.accent}20`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--glass-border)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Accent dot */}
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: f.accent,
                  boxShadow: `0 0 12px ${f.accent}60`,
                  marginBottom: 18,
                }}
              />
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 15,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.3,
                  marginBottom: 8,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: 'var(--text-tertiary)',
                }}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
