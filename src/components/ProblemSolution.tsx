import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ease = [0.16, 1, 0.3, 1];

const problems = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13" stroke="rgba(255,100,100,0.4)" strokeWidth="1.5" />
        <path d="M14 8v6M14 18h.01" stroke="rgba(255,100,100,0.8)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    problem: 'Building a prop firm from scratch costs hundreds of thousands',
    solution: 'We provide the entire stack — platform, integrations, and infrastructure — at a fraction of the cost.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="22" height="22" rx="5" stroke="rgba(255,100,100,0.4)" strokeWidth="1.5" />
        <path d="M9 14h10M14 9v10" stroke="rgba(255,100,100,0.8)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    problem: 'Technical complexity kills momentum before you launch',
    solution: 'Plug and play. No developers needed. Your branded platform is live in days, not months.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" stroke="rgba(255,100,100,0.4)" strokeWidth="1.5" fill="none" />
        <circle cx="14" cy="14" r="3" stroke="rgba(255,100,100,0.8)" strokeWidth="1.5" />
      </svg>
    ),
    problem: 'Compliance, banking, and payments are a nightmare to set up',
    solution: 'All pre-arranged. Payment processing, company structure, and compliance — handled from day one.',
  },
];

const ProblemSolution: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 1,
        padding: `0 var(--content-padding) var(--section-padding)`,
      }}
    >
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
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
            The Problem
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
              margin: '0 auto',
            }}
          >
            Launching a Prop Firm Shouldn't Require an Army
          </h2>
        </motion.div>

        {/* Cards */}
        <div
          className="problem-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}
        >
          {problems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease }}
              className="glass"
              style={{
                padding: 32,
                borderRadius: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--glass-border-bright)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--glass-border)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div>{item.icon}</div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 17,
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    lineHeight: 1.35,
                    letterSpacing: '-0.01em',
                    marginBottom: 10,
                  }}
                >
                  {item.problem}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {item.solution}
                </p>
              </div>
              {/* Accent line */}
              <div
                style={{
                  marginTop: 'auto',
                  height: 2,
                  borderRadius: 1,
                  background: `linear-gradient(90deg, var(--accent) 0%, transparent 100%)`,
                  opacity: 0.3,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
