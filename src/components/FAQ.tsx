import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ease = [0.16, 1, 0.3, 1];

const faqs = [
  {
    q: 'How quickly can I launch my prop firm?',
    a: 'Most firms are fully operational within 7 days. We handle the technical setup, trading platform integrations, payment processing, and compliance framework so you can start selling challenges as fast as possible.',
  },
  {
    q: 'Do I need any technical experience?',
    a: 'None at all. The entire platform is managed by us. You never touch code, configure servers, or deal with APIs. If you can use social media, you can run a prop firm with PROPFLOWTECH.',
  },
  {
    q: 'Do I need to set up a company or handle compliance?',
    a: 'No. We take care of the compliance framework, terms of service, and operational structure. You focus entirely on building your brand and acquiring traders.',
  },
  {
    q: 'What if I have never run a prop firm before?',
    a: 'Most of our clients have not. That is exactly the point. We built PROPFLOWTECH specifically for ambitious entrepreneurs with zero prop firm experience. We provide the infrastructure and the expertise.',
  },
  {
    q: 'What trading platforms will my traders use?',
    a: 'Your traders get access to MetaTrader 4, MetaTrader 5, cTrader, and TradeLocker — the most widely used trading platforms in the industry. All four are pre-integrated and ready to go from day one.',
  },
  {
    q: 'What ongoing support do you provide?',
    a: 'We handle all infrastructure maintenance, platform updates, security monitoring, and technical support. Your platform runs 24/7 with 99.9% uptime. If anything needs attention, we handle it.',
  },
  {
    q: 'Can I fully customize the platform with my brand?',
    a: 'Absolutely. Your traders see your logo, your colors, your domain name. The entire experience is white-labeled to your brand. There is no mention of PROPFLOWTECH anywhere your traders can see.',
  },
];

const FAQ: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 1,
        padding: `var(--section-padding) var(--content-padding)`,
      }}
    >
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
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
            FAQ
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
            }}
          >
            Common Questions
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.05 * i, ease }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 24px',
                    background: isOpen ? 'var(--glass-bg-hover)' : 'var(--glass-bg)',
                    border: `1px solid ${isOpen ? 'var(--glass-border-bright)' : 'var(--glass-border)'}`,
                    borderRadius: isOpen ? '16px 16px 0 0' : 16,
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'var(--font-display)',
                    fontSize: 15,
                    fontWeight: 600,
                    color: isOpen ? 'var(--text-primary)' : 'var(--text-secondary)',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                  }}
                >
                  {faq.q}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontSize: 20,
                      fontWeight: 300,
                      color: isOpen ? 'var(--accent)' : 'var(--text-tertiary)',
                      flexShrink: 0,
                      marginLeft: 16,
                      lineHeight: 1,
                    }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          padding: '20px 24px',
                          background: 'var(--glass-bg)',
                          borderLeft: '1px solid var(--glass-border-bright)',
                          borderRight: '1px solid var(--glass-border-bright)',
                          borderBottom: '1px solid var(--glass-border-bright)',
                          borderRadius: '0 0 16px 16px',
                          fontFamily: 'var(--font-body)',
                          fontSize: 14,
                          lineHeight: 1.75,
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
