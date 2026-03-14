import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

/* Simulated data for the mockup */
const stats = [
  { label: 'Active Traders', value: '2,847', change: '+12%', positive: true },
  { label: 'Revenue (MTD)', value: '$184,920', change: '+23%', positive: true },
  { label: 'Funded Accounts', value: '412', change: '+8%', positive: true },
  { label: 'Payout Ratio', value: '94.2%', change: '+1.8%', positive: true },
];

const recentTraders = [
  { name: 'A. Martinez', account: '#204891', status: 'Funded', amount: '$50,000', color: '#00ddb8' },
  { name: 'K. Petrov', account: '#204887', status: 'Phase 2', amount: '$100,000', color: '#7c5cff' },
  { name: 'J. Williams', account: '#204882', status: 'Funded', amount: '$25,000', color: '#00ddb8' },
  { name: 'L. Chen', account: '#204879', status: 'Phase 1', amount: '$200,000', color: '#00aaff' },
  { name: 'R. Silva', account: '#204875', status: 'Funded', amount: '$50,000', color: '#00ddb8' },
];

const equityPoints = [40, 42, 38, 45, 52, 48, 55, 60, 58, 65, 70, 68, 75, 78, 82, 80, 85, 88, 92, 95];

const DashboardMockup: React.FC = () => {
  /* Build SVG path from equity points */
  const w = 300, h = 100;
  const stepX = w / (equityPoints.length - 1);
  const min = Math.min(...equityPoints);
  const max = Math.max(...equityPoints);
  const normalize = (v: number) => h - ((v - min) / (max - min)) * h * 0.85 - h * 0.08;
  const pathD = equityPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${i * stepX},${normalize(p)}`).join(' ');
  const areaD = `${pathD} L${w},${h} L0,${h} Z`;

  return (
    <div
      className="glass glass-elevated"
      style={{
        maxWidth: 980,
        margin: '0 auto',
        padding: 0,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Window chrome bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '14px 20px',
          borderBottom: '1px solid var(--glass-border)',
          background: 'rgba(255,255,255,0.015)',
        }}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,80,80,0.7)' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,190,50,0.7)' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(50,215,75,0.7)' }} />
        </div>
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            color: 'var(--text-tertiary)',
            letterSpacing: '0.02em',
          }}
        >
          yourbrand.com/admin
        </div>
        <div style={{ width: 46 }} /> {/* Balance the dots */}
      </div>

      {/* Dashboard content */}
      <div style={{ display: 'flex', minHeight: 380 }}>
        {/* Sidebar */}
        <div
          style={{
            width: 200,
            borderRight: '1px solid var(--glass-border)',
            padding: '20px 0',
            background: 'rgba(255,255,255,0.01)',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Brand placeholder */}
          <div style={{ padding: '0 20px 20px', borderBottom: '1px solid var(--glass-border)' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Your Brand
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--text-tertiary)', marginTop: 2 }}>
              Admin Dashboard
            </div>
          </div>

          {/* Nav items */}
          <div style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { label: 'Overview', active: true },
              { label: 'Traders', active: false },
              { label: 'Accounts', active: false },
              { label: 'Payouts', active: false },
              { label: 'Challenges', active: false },
              { label: 'Revenue', active: false },
              { label: 'Settings', active: false },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: item.active ? 500 : 400,
                  color: item.active ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  background: item.active ? 'var(--glass-bg-hover)' : 'transparent',
                  cursor: 'default',
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Main content area */}
        <div style={{ flex: 1, padding: 24, overflow: 'hidden' }}>
          {/* Page title */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Overview
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>
              Last 30 days performance
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.0 + i * 0.1, ease }}
                style={{
                  padding: '14px 16px',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 12,
                }}
              >
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--text-tertiary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {stat.label}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                    {stat.value}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, color: stat.positive ? '#00ddb8' : '#ff6b6b' }}>
                    {stat.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chart + Table row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {/* Chart */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.5, ease }}
              style={{
                padding: '16px',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: 12,
              }}
            >
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Revenue Trend
              </div>
              <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 100 }}>
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={areaD} fill="url(#chartGrad)" />
                <path d={pathD} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>

            {/* Recent traders table */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.7, ease }}
              style={{
                padding: '16px',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: 12,
              }}
            >
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Recent Traders
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {recentTraders.map((t, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: i < recentTraders.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 6,
                          background: `${t.color}18`,
                          border: `1px solid ${t.color}30`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'var(--font-display)',
                          fontSize: 9,
                          fontWeight: 700,
                          color: t.color,
                        }}
                      >
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, color: 'var(--text-primary)' }}>
                          {t.name}
                        </div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, color: 'var(--text-tertiary)' }}>
                          {t.account}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 9,
                          fontWeight: 600,
                          color: t.color,
                          padding: '2px 8px',
                          background: `${t.color}12`,
                          borderRadius: 4,
                          display: 'inline-block',
                        }}
                      >
                        {t.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Reflection gradient at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: 'linear-gradient(to top, rgba(5,5,10,0.6) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default DashboardMockup;
