import React, { useState } from 'react';
import { registerUser, loginUser } from '../data/authUtils';
import {
  Eye,
  EyeOff,
  Check,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Mail,
  Lock,
  User,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export default function LoginPage({ onLoginSuccess, onBackToHome }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const switchMode = (mode) => {
    setIsSignUp(mode === 'signup');
    setError('');
    setSuccess('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setAgreeTerms(false);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    setTimeout(() => {
      // Create or log in as a demo user
      const demoEmail = 'alex.chen@algolens.dev';
      let result = loginUser(demoEmail, 'password123');
      
      if (!result.success) {
        // Register demo user if not found
        registerUser({
          name: 'Alex Chen',
          email: demoEmail,
          password: 'password123'
        });
        result = loginUser(demoEmail, 'password123');
      }

      if (result.success) {
        setSuccess('Welcome to AlgoLens! Launching dashboard...');
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess(result.user);
        }, 600);
      } else {
        setError('Demo login encountered an issue. Please try manual login.');
      }
      setIsLoading(false);
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isSignUp && !agreeTerms) {
      setError('Please agree to the Terms of Service & Privacy Policy.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (isSignUp) {
        const name = `${firstName} ${lastName}`.trim();
        const result = registerUser({ name, email, password });

        if (!result.success) {
          setError(result.message);
          setIsLoading(false);
          return;
        }

        const loginResult = loginUser(email, password);
        if (loginResult.success) {
          setSuccess('Account created successfully! Redirecting...');
          setTimeout(() => {
            if (onLoginSuccess) onLoginSuccess(loginResult.user);
          }, 700);
        }
      } else {
        const result = loginUser(email, password);

        if (!result.success) {
          setError(result.message);
          setIsLoading(false);
          return;
        }

        setSuccess('Welcome back! Loading your profile...');
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess(result.user);
        }, 700);
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--paper)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative background glow matching AlgoLens design */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-15%',
          left: '20%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '15%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Main Container Card */}
      <div
        className="login-card-container"
        style={{
          width: '100%',
          maxWidth: '1120px',
          background: 'var(--panel)',
          border: '1px solid var(--line)',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'row',
          boxShadow: '0 20px 50px -10px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(0, 0, 0, 0.03)',
          overflow: 'hidden',
          minHeight: '680px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* ── Left Hero Visual Panel (46% width) ── */}
        <div
          className="login-left-panel"
          style={{
            flex: '0 0 46%',
            position: 'relative',
            padding: '16px',
            boxSizing: 'border-box',
            display: 'flex'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '18px',
              position: 'relative',
              overflow: 'hidden',
              backgroundImage: 'url(/algolens-login-hero.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '28px',
              boxSizing: 'border-box'
            }}
          >
            {/* Top gradient overlay for header contrast */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '40%',
                background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.75) 0%, transparent 100%)',
                zIndex: 1,
                pointerEvents: 'none'
              }}
            />

            {/* Bottom gradient overlay for legibility */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '65%',
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.6) 50%, transparent 100%)',
                zIndex: 1,
                pointerEvents: 'none'
              }}
            />

            {/* ── Hero Top Bar: Brand & Back to Home ── */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2
              }}
            >
              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #4F46E5 0%, #0D9488 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    boxShadow: '0 3px 12px rgba(79, 70, 229, 0.4)'
                  }}
                >
                  AL
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.12rem', color: '#FFFFFF', lineHeight: 1.1 }}>
                    Algo<span style={{ color: '#818CF8' }}>Lens</span>
                  </div>
                  <div className="mono" style={{ fontSize: '0.58rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                    CP Intelligence
                  </div>
                </div>
              </div>

              {/* Back to Home Button */}
              {onBackToHome && (
                <button
                  type="button"
                  onClick={onBackToHome}
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 'var(--radius-full)',
                    padding: '7px 14px',
                    color: '#FFFFFF',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <ArrowLeft size={13} />
                  <span>Home</span>
                </button>
              )}
            </div>

            {/* ── Hero Bottom Section: Feature highlights ── */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(13, 148, 136, 0.3)',
                  border: '1px solid rgba(13, 148, 136, 0.5)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  color: '#5EEAD4',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.06em',
                  marginBottom: '12px'
                }}
              >
                <Sparkles size={11} />
                <span>UNIFIED CP ANALYTICS</span>
              </div>

              <h2
                style={{
                  color: '#FFFFFF',
                  fontSize: '1.65rem',
                  fontWeight: 700,
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                  margin: '0 0 14px 0'
                }}
              >
                Practice everywhere.<br />
                <span style={{ color: '#A5B4FC' }}>Understand it</span> in one place.
              </h2>

              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.84rem',
                  lineHeight: 1.5,
                  margin: '0 0 20px 0',
                  maxWidth: '38ch'
                }}
              >
                Sync cross-platform ratings, track dynamic skill radars, and analyze consistency across 4 coding judges.
              </p>

              {/* Integrated platform pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { name: 'LeetCode', color: '#FFA116' },
                  { name: 'Codeforces', color: '#318CE7' },
                  { name: 'CodeChef', color: '#9B51E0' },
                  { name: 'GeeksforGeeks', color: '#2F8D46' }
                ].map((plat) => (
                  <span
                    key={plat.name}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: 'var(--radius-full)',
                      padding: '3px 9px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: plat.color
                      }}
                    />
                    {plat.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Form Panel (54% width) ── */}
        <div
          className="login-right-panel"
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px 56px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ maxWidth: '440px', width: '100%', margin: '0 auto' }}>

            {/* Mode Switcher Tabs */}
            <div
              style={{
                display: 'flex',
                background: 'var(--paper-2)',
                padding: '4px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--line)',
                marginBottom: '28px'
              }}
            >
              <button
                type="button"
                onClick={() => switchMode('login')}
                style={{
                  flex: 1,
                  padding: '9px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: !isSignUp ? 'var(--panel)' : 'transparent',
                  color: !isSignUp ? 'var(--ink)' : 'var(--ink-dim)',
                  fontWeight: !isSignUp ? 700 : 500,
                  fontSize: '0.86rem',
                  boxShadow: !isSignUp ? '0 2px 6px rgba(0, 0, 0, 0.05)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease'
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => switchMode('signup')}
                style={{
                  flex: 1,
                  padding: '9px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: isSignUp ? 'var(--panel)' : 'transparent',
                  color: isSignUp ? 'var(--ink)' : 'var(--ink-dim)',
                  fontWeight: isSignUp ? 700 : 500,
                  fontSize: '0.86rem',
                  boxShadow: isSignUp ? '0 2px 6px rgba(0, 0, 0, 0.05)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease'
                }}
              >
                Create Account
              </button>
            </div>

            {/* Header Text */}
            <div style={{ marginBottom: '24px' }}>
              <h1
                className="editorial-h2"
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: 'var(--ink)',
                  margin: '0 0 6px 0',
                  lineHeight: 1.2
                }}
              >
                {isSignUp ? 'Start Your CP Journey' : 'Welcome Back'}
              </h1>
              <p
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--ink-dim)',
                  margin: 0
                }}
              >
                {isSignUp
                  ? 'Create an account to sync your competitive programming profiles.'
                  : 'Access your analytics, radar skill maps, and unified statistics.'}
              </p>
            </div>

            {/* One-Click Demo Login Banner */}
            {!isSignUp && (
              <div
                style={{
                  marginBottom: '20px',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--primary-light)',
                  border: '1px solid rgba(79, 70, 229, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} color="var(--primary)" />
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>
                      Quick Test / Demo Mode
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--ink-dim)' }}>
                      Explore with pre-loaded profile
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                  style={{
                    background: 'var(--primary)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '6px 12px',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 6px rgba(79, 70, 229, 0.25)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--primary)'}
                >
                  <span>Demo Login</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

              {/* Name Fields for Sign Up */}
              {isSignUp && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 38px',
                        background: 'var(--paper)',
                        border: '1px solid var(--line)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--ink)',
                        fontSize: '0.88rem',
                        outline: 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.12)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--line)';
                        e.target.style.boxShadow = 'none';
                      }}
                      aria-label="First name"
                    />
                    <User
                      size={16}
                      color="var(--ink-faint)"
                      style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                    />
                  </div>

                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        background: 'var(--paper)',
                        border: '1px solid var(--line)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--ink)',
                        fontSize: '0.88rem',
                        outline: 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.12)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--line)';
                        e.target.style.boxShadow = 'none';
                      }}
                      aria-label="Last name"
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 38px',
                    background: 'var(--paper)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--ink)',
                    fontSize: '0.88rem',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--line)';
                    e.target.style.boxShadow = 'none';
                  }}
                  aria-label="Email"
                />
                <Mail
                  size={16}
                  color="var(--ink-faint)"
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>

              {/* Password Field */}
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={isSignUp ? 'Create a password (min 6 chars)' : 'Enter your password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 42px 12px 38px',
                    background: 'var(--paper)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--ink)',
                    fontSize: '0.88rem',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--line)';
                    e.target.style.boxShadow = 'none';
                  }}
                  aria-label="Password"
                />
                <Lock
                  size={16}
                  color="var(--ink-faint)"
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--ink-faint)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Terms Checkbox for Sign Up */}
              {isSignUp && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '2px' }}>
                  <button
                    type="button"
                    onClick={() => setAgreeTerms(!agreeTerms)}
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '5px',
                      background: agreeTerms ? 'var(--primary)' : 'var(--paper)',
                      border: agreeTerms ? '1px solid var(--primary)' : '1px solid var(--line-strong)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      padding: 0,
                      marginTop: '2px',
                      flexShrink: 0,
                      transition: 'all 0.15s ease'
                    }}
                    aria-label="Agree to Terms and Conditions"
                  >
                    {agreeTerms && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                  </button>
                  <span style={{ fontSize: '0.78rem', color: 'var(--ink-dim)', lineHeight: 1.4 }}>
                    I agree to the{' '}
                    <span style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>
                      Terms of Service
                    </span>{' '}
                    and{' '}
                    <span style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>
                      Privacy Policy
                    </span>.
                  </span>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'var(--danger-light)',
                    color: 'var(--danger)',
                    border: '1px solid rgba(225, 29, 72, 0.2)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 12px',
                    fontSize: '0.82rem',
                    fontWeight: 500
                  }}
                >
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'var(--teal-light)',
                    color: 'var(--teal-dark)',
                    border: '1px solid rgba(13, 148, 136, 0.2)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 12px',
                    fontSize: '0.82rem',
                    fontWeight: 500
                  }}
                >
                  <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
                  <span>{success}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || (isSignUp && !agreeTerms)}
                className="editorial-button"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '13px 20px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  marginTop: '6px',
                  cursor: (isLoading || (isSignUp && !agreeTerms)) ? 'not-allowed' : 'pointer',
                  opacity: (isLoading || (isSignUp && !agreeTerms)) ? 0.65 : 1
                }}
              >
                {isLoading ? (
                  <span>Please wait...</span>
                ) : isSignUp ? (
                  <>
                    <span>Create Free Account</span>
                    <ArrowRight size={15} />
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>

            {/* Social Divider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '24px 0 20px',
                color: 'var(--ink-faint)'
              }}
            >
              <div style={{ flex: 1, height: '1px', background: 'var(--line)' }} />
              <span
                className="mono"
                style={{
                  margin: '0 14px',
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                Or continue with
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--line)' }} />
            </div>

            {/* Social Logins */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {/* Google Button */}
              <button
                type="button"
                onClick={handleDemoLogin}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  background: 'var(--panel)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--ink)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--paper-2)';
                  e.currentTarget.style.borderColor = 'var(--line-strong)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--panel)';
                  e.currentTarget.style.borderColor = 'var(--line)';
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span>Google</span>
              </button>

              {/* GitHub Button */}
              <button
                type="button"
                onClick={handleDemoLogin}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  background: 'var(--panel)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--ink)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--paper-2)';
                  e.currentTarget.style.borderColor = 'var(--line-strong)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--panel)';
                  e.currentTarget.style.borderColor = 'var(--line)';
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
