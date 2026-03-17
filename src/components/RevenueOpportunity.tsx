import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ease = [0.16, 1, 0.3, 1] as const;

const tiers = [
  { challenges: 100, avgPrice: 250, label: 'Launching', icon: '01' },
  { challenges: 300, avgPrice: 300, label: 'Growing', icon: '02' },
  { challenges: 750, avgPrice: 350, label: 'Scaling', icon: '03' },
  { challenges: 1500, avgPrice: 400, label: 'Dominating', icon: '04' },
];

const MAX_MONTHLY = tiers[tiers.length - 1].challenges * tiers[tiers.length - 1].avgPrice;

/* Animated counter — only used for result numbers */
function useAnimatedNumber(target: number, duration = 500): number {
  const [display, setDisplay] = useState(target);
  const frameRef = useRef<number>(0);
  const startRef = useRef(target);
  const startTime = useRef(0);

  useEffect(() => {
    startRef.current = display;
    startTime.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(startRef.current + (target - startRef.current) * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return display;
}

const RevenueOpportunity: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const [selected, setSelected] = useState(1);
  const tier = tiers[selected];
  const monthly = tier.challenges * tier.avgPrice;
  const annual = monthly * 12;
  const barPercent = (monthly / MAX_MONTHLY) * 100;

  const animatedMonthly = useAnimatedNumber(monthly);
  const animatedAnnual = useAnimatedNumber(annual);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 1,
        padding: `var(--section-padding) var(--content-padding)`,
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 900,
          height: 600,
          background: 'radial-gradient(ellipse, rgba(0, 220, 180, 0.08) 0%, rgba(0, 170, 255, 0.05) 40%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
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
            Revenue Calculator
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(30px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: 14,
            }}
          >
            See What You Could Earn
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              maxWidth: 520,
              margin: '0 auto',
            }}
          >
            Prop trading is one of the fastest-growing sectors in retail finance.
            Pick your scale and watch the numbers add up.
          </p>
        </motion.div>

        {/* Calculator card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="glass glass-elevated"
          style={{
            padding: 0,
            borderRadius: 28,
            overflow: 'hidden',
          }}
        >
          {/* Tier selector row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${tiers.length}, 1fr)`,
              borderBottom: '1px solid var(--glass-border)',
            }}
          >
            {tiers.map((t, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                style={{
                  padding: '20px 16px',
                  border: 'none',
                  borderBottom: i === selected ? '2px solid var(--accent)' : '2px solid transparent',
                  background: i === selected ? 'rgba(0, 170, 255, 0.06)' : 'transparent',
                  color: i === selected ? 'var(--accent-bright)' : 'var(--text-tertiary)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
              >
                <span style={{
                  display: 'block',
                  fontSize: 9,
                  fontWeight: 500,
                  color: i === selected ? 'var(--accent)' : 'var(--text-tertiary)',
                  marginBottom: 4,
                  opacity: 0.6,
                  letterSpacing: '0.1em',
                }}>
                  {t.icon}
                </span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Calculator body */}
          <div style={{ padding: 'clamp(28px, 5vw, 52px)' }}>
            {/* Calculation row */}
            <div
              className="revenue-calc-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(20px, 4vw, 44px)',
                flexWrap: 'wrap',
                marginBottom: 40,
              }}
            >
              {/* Challenges — instant update, no animation */}
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(36px, 5vw, 54px)',
                    fontWeight: 900,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  {tier.challenges.toLocaleString()}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  color: 'var(--text-tertiary)',
                  marginTop: 8,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 500,
                }}>
                  challenges / mo
                </div>
              </div>

              {/* Multiply symbol */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 24,
                fontWeight: 300,
                color: 'var(--text-tertiary)',
                opacity: 0.5,
              }}>
                &times;
              </div>

              {/* Avg price — instant update, no animation */}
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(36px, 5vw, 54px)',
                    fontWeight: 900,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                >
                  ${tier.avgPrice}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  color: 'var(--text-tertiary)',
                  marginTop: 8,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 500,
                }}>
                  avg. price
                </div>
              </div>

              {/* Equals symbol */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 24,
                fontWeight: 300,
                color: 'var(--text-tertiary)',
                opacity: 0.5,
              }}>
                =
              </div>

              {/* Result — animated counter */}
              <div style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 200,
                  height: 100,
                  background: 'radial-gradient(circle, rgba(0, 170, 255, 0.15) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                  pointerEvents: 'none',
                }} />
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(40px, 7vw, 64px)',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    color: 'var(--accent)',
                    position: 'relative',
                  }}
                >
                  ${animatedMonthly.toLocaleString()}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  color: 'var(--accent)',
                  marginTop: 8,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>
                  monthly revenue
                </div>
              </div>
            </div>

            {/* Revenue progress bar — CSS transition, no framer-motion */}
            <div style={{ marginBottom: 32 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 10,
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                color: 'var(--text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}>
                <span>Revenue potential</span>
                <span>{Math.round(barPercent)}% of scale</span>
              </div>
              <div style={{
                width: '100%',
                height: 8,
                borderRadius: 4,
                background: 'rgba(255,255,255,0.04)',
                overflow: 'hidden',
              }}>
                <div
                  style={{
                    height: '100%',
                    borderRadius: 4,
                    width: `${barPercent}%`,
                    background: 'linear-gradient(90deg, var(--accent) 0%, #00ddb8 100%)',
                    boxShadow: '0 0 16px rgba(0, 170, 255, 0.25)',
                    transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </div>
            </div>

            {/* Annual projection */}
            <div style={{
              padding: '20px 24px',
              background: 'rgba(0, 220, 180, 0.04)',
              border: '1px solid rgba(0, 220, 180, 0.1)',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 11,
                  color: 'var(--text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: 8,
                }}>
                  Projected annual revenue
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(24px, 3vw, 32px)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: '#00ddb8',
                  lineHeight: 1,
                }}>
                  ${animatedAnnual.toLocaleString()}
                </div>
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                color: 'var(--text-tertiary)',
                textAlign: 'right',
              }}>
                based on {tier.challenges.toLocaleString()} challenges/mo
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .revenue-calc-row {
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default RevenueOpportunity;
