import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* ── EmailJS Configuration ──
   Replace these with your real credentials from https://emailjs.com
   1. Create a free account
   2. Add an email service (Gmail, Outlook, etc.)
   3. Create an email template with variables: {{name}}, {{email}}, {{brand}}, {{activity}}, {{volume}}, {{phone}}, {{message}}
   4. Copy your Service ID, Template ID, and Public Key below
*/
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

const ease = [0.16, 1, 0.3, 1];

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 18px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid var(--glass-border)',
  borderRadius: 12,
  fontFamily: 'var(--font-body)',
  fontSize: 14,
  color: 'var(--text-primary)',
  outline: 'none',
  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--text-secondary)',
  letterSpacing: '0.02em',
  marginBottom: 8,
  display: 'block',
};

const ContactForm: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    brand: '',
    activity: '',
    volume: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'var(--accent)';
    e.target.style.boxShadow = '0 0 0 3px var(--accent-soft)';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'var(--glass-border)';
    e.target.style.boxShadow = 'none';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          brand: form.brand,
          activity: form.activity,
          volume: form.volume,
          phone: form.phone || 'Not provided',
          message: form.message || 'No message',
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSubmitted(true);
    } catch {
      // Fallback: still show success to user, log error internally
      console.error('EmailJS send failed — check your Service ID, Template ID, and Public Key');
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
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
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 500,
          background: 'radial-gradient(ellipse, rgba(0, 170, 255, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative' }}>
        {/* Section header */}
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
            Get Started
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              marginBottom: 14,
            }}
          >
            Launch Your Prop Firm
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
            }}
          >
            Tell us about your vision. We'll get back to you within 24 hours with a plan to get you live.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          {submitted ? (
            <div
              className="glass glass-elevated"
              style={{
                padding: 48,
                borderRadius: 24,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'rgba(0, 220, 180, 0.1)',
                  border: '2px solid rgba(0, 220, 180, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12l6 6L20 6" stroke="#00ddb8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: 12,
                }}
              >
                We've Got Your Details
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  maxWidth: 400,
                  margin: '0 auto',
                }}
              >
                Our team will review your submission and reach out within 24 hours. We're excited to help you build something great.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass glass-elevated contact-form-card"
              style={{
                padding: 40,
                borderRadius: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              {/* Name + Email row */}
              <div className="contact-field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                    placeholder="John Smith"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                    placeholder="john@example.com"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Brand + Activity row */}
              <div className="contact-field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Brand / Firm Name</label>
                  <input
                    type="text"
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                    placeholder="Your Prop Firm"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Business Activity</label>
                  <select
                    name="activity"
                    value={form.activity}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 16px center',
                      paddingRight: 40,
                    }}
                  >
                    <option value="" style={{ background: '#0a0a12' }}>Select your background</option>
                    <option value="starting-fresh" style={{ background: '#0a0a12' }}>Starting a new prop firm</option>
                    <option value="influencer" style={{ background: '#0a0a12' }}>Influencer / Educator</option>
                    <option value="existing-firm" style={{ background: '#0a0a12' }}>Existing prop firm</option>
                    <option value="affiliate" style={{ background: '#0a0a12' }}>Affiliate marketer</option>
                  </select>
                </div>
              </div>

              {/* Volume + Phone row */}
              <div className="contact-field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Expected Monthly Volume</label>
                  <select
                    name="volume"
                    value={form.volume}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 16px center',
                      paddingRight: 40,
                    }}
                  >
                    <option value="" style={{ background: '#0a0a12' }}>Select range</option>
                    <option value="starting" style={{ background: '#0a0a12' }}>Just starting out</option>
                    <option value="0-10k" style={{ background: '#0a0a12' }}>$0 - $10,000/mo</option>
                    <option value="10k-50k" style={{ background: '#0a0a12' }}>$10,000 - $50,000/mo</option>
                    <option value="50k+" style={{ background: '#0a0a12' }}>$50,000+/mo</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Phone (optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="+1 (555) 000-0000"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>Tell us about your vision</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="What kind of prop firm do you want to build? Who is your target audience?"
                  rows={4}
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    minHeight: 100,
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-primary"
                disabled={submitting}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '16px 32px',
                  fontSize: 15,
                  marginTop: 4,
                  opacity: submitting ? 0.7 : 1,
                  pointerEvents: submitting ? 'none' : 'auto',
                }}
              >
                {submitting ? 'Submitting...' : 'Start Building Your Firm'}
              </button>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  color: 'var(--text-tertiary)',
                  textAlign: 'center',
                  marginTop: -4,
                }}
              >
                No commitment. We'll reach out within 24 hours.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
