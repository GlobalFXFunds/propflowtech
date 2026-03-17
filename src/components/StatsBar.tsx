import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const stats = [
  { value: '99.9%', label: 'Platform Uptime' },
  { value: '48hrs', label: 'Integration Time' },
  { value: '4', label: 'Supported Platforms' },
  { value: '6', label: 'Firms Using Our Tech' },
  { value: '20,000+', label: 'Accounts on Platform' },
];

const ease = [0.16, 1, 0.3, 1];

const StatsBar: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.3);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 2,
        padding: '0 var(--content-padding)',
        marginTop: -40,
        marginBottom: 'var(--section-padding)',
      }}
    >
      <div
        className="glass stats-bar-grid"
        style={{
          maxWidth: 'var(--content-max)',
          margin: '0 auto',
          padding: '36px 48px',
          borderRadius: 20,
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 24,
        }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1, ease }}
            style={{
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                lineHeight: 1.1,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                color: 'var(--text-tertiary)',
                marginTop: 6,
                fontWeight: 400,
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
