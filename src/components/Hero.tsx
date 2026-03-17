import React from 'react';
import { motion } from 'framer-motion';
import DashboardMockup from './DashboardMockup';

const ease = [0.16, 1, 0.3, 1];

const Hero: React.FC = () => {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 0,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 'clamp(140px, 20vh, 200px)',
        paddingBottom: 'var(--section-padding)',
        overflow: 'hidden',
      }}
    >
      {/* Hero glow behind the dashboard */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(0, 140, 255, 0.12) 0%, rgba(80, 40, 220, 0.06) 40%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="content-wrapper" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.6, ease }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(42px, 6.5vw, 80px)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            color: 'var(--text-primary)',
            maxWidth: 900,
            margin: '0 auto 24px',
          }}
        >
          Your Prop Firm.{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, #7c5cff 50%, #00ddb8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Launched in Days.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.85, ease }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(16px, 2vw, 19px)',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            maxWidth: 620,
            margin: '0 auto 44px',
          }}
        >
          Everything you need to run a professional prop trading firm
          — infrastructure, technology, compliance, and payments — all
          out of the box. You focus on your brand.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            marginBottom: 'clamp(60px, 8vh, 100px)',
            flexWrap: 'wrap',
          }}
        >
          <a href="#contact" className="btn-primary">
            Launch Your Firm
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 2 }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#features" className="btn-ghost">
            See What's Included
          </a>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 1.3, ease }}
          style={{ perspective: 1200 }}
        >
          <motion.div
            initial={{ rotateX: 8 }}
            animate={{ rotateX: 2 }}
            transition={{ duration: 2, delay: 1.5, ease }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <DashboardMockup />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
