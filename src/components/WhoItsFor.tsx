import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ease = [0.16, 1, 0.3, 1];

const WhoItsFor: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 1,
        padding: `var(--section-padding) var(--content-padding)`,
        overflow: 'hidden',
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '-10%',
          transform: 'translateY(-50%)',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(0, 220, 180, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', position: 'relative' }}>
        <div className="whoitsfor-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
            animate={isVisible ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.9, ease }}
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
              Built For You
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                fontWeight: 800,
                letterSpacing: '-0.035em',
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                marginBottom: 24,
              }}
            >
              For Ambitious Founders,
              <br />
              <span style={{ color: 'var(--accent)' }}>Not Engineers</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                marginBottom: 32,
                maxWidth: 460,
              }}
            >
              You want to build a brand that traders trust. You want to focus on
              marketing, community, and growth — not spend months wiring up
              payment gateways, trading platforms, and compliance frameworks.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                marginBottom: 40,
                maxWidth: 460,
              }}
            >
              PropFlowTech handles the entire technical foundation so you can
              launch a professional prop firm without writing a single line of
              code or hiring a single developer.
            </p>
            <a href="#contact" className="btn-primary">
              Start Building
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          {/* Right: Visual checklist */}
          <motion.div
            initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
            animate={isVisible ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            <div className="glass glass-elevated" style={{ padding: 36, borderRadius: 20 }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 14,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                  marginBottom: 24,
                }}
              >
                What you get on day one
              </div>
              {[
                'Fully branded trader-facing platform',
                'Admin dashboard with full control',
                'MT4, MT5, cTrader & TradeLocker wired up',
                'Payment processing configured',
                'Automated challenge management & breach detection',
                'Email notification system (branded)',
                'Affiliate & referral program',
                'Compliance documentation & terms of service',
                'Ongoing hosting, maintenance & monitoring',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.06, ease }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '12px 0',
                    borderBottom: i < 8 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 6,
                      background: 'rgba(0, 220, 180, 0.1)',
                      border: '1px solid rgba(0, 220, 180, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#00ddb8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
