import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Link } from 'react-router-dom';

const ease = [0.16, 1, 0.3, 1] as const;

interface CaseStudy {
  firmName: string;
  tagline: string;
  founder: string;
  founderRole: string;
  timeline: string;
  description: string;
  quote: string;
  accentColor: string;
  metrics: { label: string; value: string }[];
  tags: string[];
}

const caseStudies: CaseStudy[] = [
  {
    firmName: 'Prop Firm A',
    tagline: 'From concept to 2,000 active traders in 4 months',
    founder: 'Founder A',
    founderRole: 'Founder & CEO',
    timeline: 'Launched in 3 days',
    description:
      'This firm came to PROPFLOWTECH with a strong brand presence but zero technical infrastructure. Within 72 hours of onboarding, their fully branded platform was live — complete with MT5 integration, automated challenge management, and a custom trader dashboard. Within four months, they scaled to over 2,000 active traders across 14 countries.',
    quote:
      'We went from an idea on a whiteboard to a fully operational prop firm in under a week. The speed was unreal.',
    accentColor: '#00ddb8',
    metrics: [
      { label: 'Time to Launch', value: '3 days' },
      { label: 'Active Traders', value: '2,100+' },
      { label: 'Countries', value: '14' },
      { label: 'Accounts Created', value: '5,400+' },
    ],
    tags: ['MT5', 'Brand-Led Launch', 'High Growth'],
  },
  {
    firmName: 'Prop Firm B',
    tagline: 'Scaled to 4,500 accounts in 6 months across Europe',
    founder: 'Founder B',
    founderRole: 'Managing Director',
    timeline: 'Launched in 2 days',
    description:
      'This firm needed a compliant, multi-language platform to serve the European market. PROPFLOWTECH delivered a white-label solution with TradeLocker integration, multi-currency payment processing, and GDPR-compliant data handling. By focusing on an underserved regional niche, they were able to grow rapidly where larger firms had overlooked the opportunity.',
    quote:
      'The compliance framework alone saved us months of legal work. We were able to focus entirely on building our brand and acquiring traders.',
    accentColor: '#00aaff',
    metrics: [
      { label: 'Time to Launch', value: '2 days' },
      { label: 'Total Accounts', value: '4,500+' },
      { label: 'Avg. Monthly Growth', value: '32%' },
      { label: 'Challenge Completion', value: '18%' },
    ],
    tags: ['TradeLocker', 'European Market', 'Multi-Language'],
  },
  {
    firmName: 'Prop Firm C',
    tagline: 'Educator-led firm hit $120K monthly revenue in 90 days',
    founder: 'Founder C',
    founderRole: 'Founder',
    timeline: 'Launched in 4 days',
    description:
      'Founded by a trading educator with a large online following, this firm leveraged an existing audience to drive immediate traction. PROPFLOWTECH handled the complete technical buildout — including a custom affiliate system that turned their student community into a referral engine. The result: $120K in monthly revenue within 90 days of launch.',
    quote:
      'I had the audience, but I had no idea how to build a prop firm. PROPFLOWTECH made it possible without me writing a single line of code.',
    accentColor: '#7c5cff',
    metrics: [
      { label: 'Time to Launch', value: '4 days' },
      { label: 'Monthly Revenue', value: '$120K' },
      { label: 'Affiliate Referrals', value: '840+' },
      { label: 'Active Traders', value: '3,200+' },
    ],
    tags: ['Educator Launch', 'Affiliate System', 'Rapid Scale'],
  },
];

/* Metric card within a case study */
const MetricCard: React.FC<{ label: string; value: string; accent: string; delay: number; isVisible: boolean }> = ({
  label,
  value,
  accent,
  delay,
  isVisible,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={isVisible ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay, ease }}
    style={{
      padding: '20px',
      background: `${accent}06`,
      border: `1px solid ${accent}18`,
      borderRadius: 16,
      textAlign: 'center',
    }}
  >
    <div
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(22px, 3vw, 30px)',
        fontWeight: 800,
        color: accent,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        marginBottom: 6,
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 11,
        color: 'var(--text-tertiary)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        fontWeight: 500,
      }}
    >
      {label}
    </div>
  </motion.div>
);

/* Individual case study section */
const CaseStudyCard: React.FC<{ study: CaseStudy; index: number }> = ({ study, index }) => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const isReversed = index % 2 !== 0;

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '0 var(--content-padding)',
        marginBottom: 'clamp(80px, 10vh, 140px)',
      }}
    >
      {/* Subtle glow behind each card */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: isReversed ? '20%' : '70%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          height: 400,
          background: `radial-gradient(circle, ${study.accentColor}08 0%, transparent 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease }}
        className="glass glass-elevated"
        style={{
          maxWidth: 'var(--content-max)',
          margin: '0 auto',
          borderRadius: 28,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            height: 3,
            background: `linear-gradient(90deg, transparent 0%, ${study.accentColor} 50%, transparent 100%)`,
            opacity: 0.6,
          }}
        />

        <div style={{ padding: 'clamp(32px, 5vw, 56px)' }}>
          {/* Header row: firm name, timeline badge, tags */}
          <div
            className="cs-header-row"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 24,
              marginBottom: 32,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                {/* Firm initial avatar */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: `${study.accentColor}15`,
                    border: `1px solid ${study.accentColor}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: 16,
                    fontWeight: 800,
                    color: study.accentColor,
                  }}
                >
                  {study.firmName.charAt(0)}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(20px, 3vw, 28px)',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                    }}
                  >
                    {study.firmName}
                  </h3>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 12,
                      color: 'var(--text-tertiary)',
                      marginTop: 2,
                    }}
                  >
                    {study.founder} — {study.founderRole}
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(16px, 2vw, 19px)',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  letterSpacing: '-0.01em',
                  maxWidth: 500,
                }}
              >
                {study.tagline}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flexShrink: 0 }}>
              {/* Timeline badge */}
              <span
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  background: `${study.accentColor}12`,
                  border: `1px solid ${study.accentColor}25`,
                  fontFamily: 'var(--font-display)',
                  fontSize: 11,
                  fontWeight: 700,
                  color: study.accentColor,
                  letterSpacing: '0.02em',
                }}
              >
                {study.timeline}
              </span>
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    fontWeight: 500,
                    color: 'var(--text-tertiary)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics row */}
          <div
            className="cs-metrics-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 12,
              marginBottom: 36,
            }}
          >
            {study.metrics.map((m, i) => (
              <MetricCard
                key={m.label}
                label={m.label}
                value={m.value}
                accent={study.accentColor}
                delay={0.15 + i * 0.08}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              lineHeight: 1.8,
              color: 'var(--text-secondary)',
              marginBottom: 32,
              maxWidth: 720,
            }}
          >
            {study.description}
          </motion.p>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            style={{
              padding: '24px 28px',
              borderLeft: `3px solid ${study.accentColor}`,
              background: `${study.accentColor}04`,
              borderRadius: '0 14px 14px 0',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                fontStyle: 'italic',
                lineHeight: 1.7,
                color: 'var(--text-primary)',
                marginBottom: 8,
              }}
            >
              "{study.quote}"
            </p>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 12,
                fontWeight: 600,
                color: study.accentColor,
              }}
            >
              — {study.founder}, {study.firmName}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const CaseStudies: React.FC = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);

  return (
    <main>
      {/* Hero section */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: 'clamp(140px, 20vh, 200px)',
          paddingBottom: 'clamp(60px, 8vh, 100px)',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Hero glow */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            height: 500,
            background:
              'radial-gradient(ellipse, rgba(0, 170, 255, 0.1) 0%, rgba(124, 92, 255, 0.06) 40%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />

        <div className="content-wrapper" style={{ position: 'relative' }}>
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            style={{ marginBottom: 28 }}
          >
            <Link
              to="/"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                color: 'var(--text-tertiary)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
            >
              Home
            </Link>
            <span style={{ margin: '0 10px', color: 'var(--text-tertiary)', opacity: 0.4 }}>/</span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                color: 'var(--text-secondary)',
              }}
            >
              Case Studies
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={heroVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease }}
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
              Real Results
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5.5vw, 64px)',
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: '-0.04em',
                color: 'var(--text-primary)',
                maxWidth: 700,
                margin: '0 auto 20px',
              }}
            >
              Firms Built with{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--accent) 0%, #7c5cff 50%, #00ddb8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                PROPFLOWTECH
              </span>
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px, 1.8vw, 18px)',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                maxWidth: 560,
                margin: '0 auto',
              }}
            >
              See how ambitious founders used our infrastructure to launch, scale, and dominate the prop trading space.
            </p>
          </motion.div>

          {/* Summary stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="glass cs-summary-stats"
            style={{
              display: 'inline-grid',
              gridTemplateColumns: 'repeat(4, auto)',
              gap: 'clamp(24px, 4vw, 56px)',
              padding: '24px clamp(28px, 4vw, 48px)',
              borderRadius: 18,
              marginTop: 48,
            }}
          >
            {[
              { value: '6', label: 'Firms Launched' },
              { value: '48hrs', label: 'Avg Launch Time' },
              { value: '10,000+', label: 'Traders Onboarded' },
              { value: '4', label: 'Platforms Integrated' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(20px, 2.5vw, 28px)',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    color: 'var(--text-tertiary)',
                    marginTop: 6,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case study cards */}
      {caseStudies.map((study, i) => (
        <CaseStudyCard key={study.firmName} study={study} index={i} />
      ))}

      {/* Bottom CTA */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(60px, 10vh, 120px) var(--content-padding)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 400,
            background: 'radial-gradient(circle, rgba(0, 170, 255, 0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            Ready to Be Our Next Success Story?
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              marginBottom: 36,
            }}
          >
            Join the founders who launched their prop firms in days, not months. We handle the tech — you build the brand.
          </p>
          <Link to="/#contact" className="btn-primary">
            Launch Your Firm
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 2 }}>
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .cs-metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .cs-summary-stats {
            grid-template-columns: repeat(2, auto) !important;
            gap: 20px !important;
          }
          .cs-header-row {
            flex-direction: column !important;
          }
        }
      `}</style>
    </main>
  );
};

export default CaseStudies;
