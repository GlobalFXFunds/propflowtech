import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* Hash links need to work from any page — navigate to / then scroll */
  const handleHashClick = (hash: string) => {
    setMobileOpen(false);
    if (isLanding) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/' + hash;
    }
  };

  const navLinks = [
    { label: 'Features', href: '#features', isHash: true },
    { label: 'How It Works', href: '#how-it-works', isHash: true },
    { label: 'Case Studies', href: '/case-studies', isHash: false },
    { label: 'FAQ', href: '#faq', isHash: true },
  ];

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--text-tertiary)',
    textDecoration: 'none',
    transition: 'color 0.2s',
    padding: '6px 0',
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0 var(--content-padding)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--content-max)',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 72,
            padding: '0 24px',
            borderRadius: scrolled ? '0 0 20px 20px' : '0',
            background: scrolled || mobileOpen ? 'rgba(5, 5, 10, 0.8)' : 'transparent',
            backdropFilter: scrolled || mobileOpen ? 'blur(40px)' : 'none',
            WebkitBackdropFilter: scrolled || mobileOpen ? 'blur(40px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo />
          </Link>

          {/* Desktop nav links */}
          <div
            className="nav-desktop-only"
            style={{
              alignItems: 'center',
              gap: 28,
            }}
          >
            {navLinks.map((item) =>
              item.isHash ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleHashClick(item.href);
                  }}
                  style={linkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  style={{
                    ...linkStyle,
                    color: location.pathname === item.href ? 'var(--accent)' : 'var(--text-tertiary)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      location.pathname === item.href ? 'var(--accent)' : 'var(--text-tertiary)')
                  }
                >
                  {item.label}
                </Link>
              ),
            )}

            <a
              href="#contact"
              className="btn-primary"
              style={{ padding: '10px 24px', fontSize: '13px' }}
              onClick={(e) => {
                e.preventDefault();
                handleHashClick('#contact');
              }}
            >
              Get Started
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-mobile-only"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: mobileOpen ? 0 : 5,
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
            }}
          >
            <span
              style={{
                display: 'block',
                width: 20,
                height: 2,
                borderRadius: 1,
                background: 'var(--text-primary)',
                transition: 'all 0.3s ease',
                transform: mobileOpen ? 'rotate(45deg) translateY(0)' : 'none',
                transformOrigin: 'center',
              }}
            />
            {!mobileOpen && (
              <span
                style={{
                  display: 'block',
                  width: 20,
                  height: 2,
                  borderRadius: 1,
                  background: 'var(--text-primary)',
                }}
              />
            )}
            <span
              style={{
                display: 'block',
                width: 20,
                height: 2,
                borderRadius: 1,
                background: 'var(--text-primary)',
                transition: 'all 0.3s ease',
                transform: mobileOpen ? 'rotate(-45deg) translateY(0)' : 'none',
                transformOrigin: 'center',
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="nav-mobile-only"
            style={{
              position: 'fixed',
              top: 72,
              left: 0,
              right: 0,
              zIndex: 99,
              padding: '16px var(--content-padding)',
            }}
          >
            <div
              style={{
                maxWidth: 'var(--content-max)',
                margin: '0 auto',
                background: 'rgba(5, 5, 10, 0.95)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 20,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {navLinks.map((item) =>
                item.isHash ? (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleHashClick(item.href);
                    }}
                    style={{
                      display: 'block',
                      padding: '14px 16px',
                      borderRadius: 12,
                      fontFamily: 'var(--font-display)',
                      fontSize: 15,
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--glass-bg)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block',
                      padding: '14px 16px',
                      borderRadius: 12,
                      fontFamily: 'var(--font-display)',
                      fontSize: 15,
                      fontWeight: 500,
                      color: location.pathname === item.href ? 'var(--accent)' : 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--glass-bg)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleHashClick('#contact');
                }}
                className="btn-primary"
                style={{ textAlign: 'center', justifyContent: 'center', marginTop: 8 }}
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-desktop-only { display: flex !important; }
        .nav-mobile-only { display: none !important; }
        @media (max-width: 768px) {
          .nav-desktop-only { display: none !important; }
          .nav-mobile-only { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
