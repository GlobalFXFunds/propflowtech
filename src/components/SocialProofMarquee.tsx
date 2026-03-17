import React from 'react';
import { motion } from 'framer-motion';

const items = [
  { value: '99.9%', label: 'platform uptime' },
  { value: '20,000+', label: 'accounts on platform' },
  { value: '6', label: 'prop firms launched' },
  { value: '48hrs', label: 'average integration time' },
  { value: '4', label: 'supported trading platforms' },
  { value: '24/7', label: 'infrastructure monitoring' },
  { value: '3,200+', label: 'active traders managed' },
  { value: '100%', label: 'white-label branded' },
];

const SocialProofMarquee: React.FC = () => {
  const renderItems = () =>
    items.map((item, i) => (
      <div
        key={i}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '0 40px',
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
          }}
        >
          {item.value}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'var(--text-tertiary)',
          }}
        >
          {item.label}
        </span>
        <span
          style={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: 'var(--accent)',
            opacity: 0.4,
            marginLeft: 32,
            flexShrink: 0,
          }}
        />
      </div>
    ));

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2 }}
      style={{
        position: 'relative',
        zIndex: 2,
        padding: '24px 0',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        overflow: 'hidden',
        marginBottom: 20,
      }}
    >
      <div className="marquee-track">
        {renderItems()}
        {renderItems()}
      </div>
    </motion.section>
  );
};

export default SocialProofMarquee;
