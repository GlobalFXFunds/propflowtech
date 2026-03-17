import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ease = [0.16, 1, 0.3, 1];

const steps = [
  {
    num: '01',
    title: 'Tell Us Your Vision',
    desc: 'Share your brand name, target market, and how you want your prop firm to look and feel. We handle the rest.',
    accent: '#00aaff',
  },
  {
    num: '02',
    title: 'We Build It For You',
    desc: 'Your branded platform, domain, payment processing, trading integrations, and compliance framework — set up and ready in days.',
    accent: '#7c5cff',
  },
  {
    num: '03',
    title: 'Launch & Scale',
    desc: 'Start selling challenges, onboarding traders, and processing withdrawals. We maintain the infrastructure while you grow your brand.',
    accent: '#00ddb8',
  },
];

const HowItWorks: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section
      id="how-it-works"
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 1,
        padding: `var(--section-padding) var(--content-padding)`,
      }}
    >
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease }}
          style={{ textAlign: 'center', marginBottom: 70 }}
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
            How It Works
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(30px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
            }}
          >
            Three Steps to Launch
          </h2>
        </motion.div>

        {/* Steps */}
        <div
          className="howitworks-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
            position: 'relative',
          }}
        >
          {/* Connecting line */}
          <motion.div
            className="howitworks-line"
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease }}
            style={{
              position: 'absolute',
              top: 52,
              left: 'calc(16.66% + 20px)',
              right: 'calc(16.66% + 20px)',
              height: 1,
              background: 'linear-gradient(90deg, var(--glass-border) 0%, var(--accent) 50%, var(--glass-border) 100%)',
              opacity: 0.4,
              transformOrigin: 'left',
              zIndex: 0,
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease }}
              style={{
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Step number circle */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: `${step.accent}10`,
                  border: `2px solid ${step.accent}35`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  fontFamily: 'var(--font-display)',
                  fontSize: 20,
                  fontWeight: 800,
                  color: step.accent,
                  letterSpacing: '-0.02em',
                  boxShadow: `0 0 30px ${step.accent}15`,
                }}
              >
                {step.num}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 20,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  marginBottom: 12,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  maxWidth: 320,
                  margin: '0 auto',
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
