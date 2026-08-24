import React, { useState } from 'react';
import { registerUser, loginUser } from '../data/authUtils';
import { Eye, EyeOff, Check, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const colors = {
    backdrop: '#B7B2C9',
    card: '#1E1A26',
    primary: '#6C5CD8',
    link: '#8E85D9',
    inputBg: '#2C2836',
    inputActiveBg: '#39323F',
    border: '#3E3948',
    textPrimary: '#FFFFFF',
    textSecondary: '#9B96A8',
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setSuccess('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setAgreeTerms(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isSignUp && !agreeTerms) {
      setError('Please agree to the Terms & Conditions.');
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
          setSuccess('Account created! Redirecting...');
          setTimeout(() => onLoginSuccess(loginResult.user), 800);
        }
      } else {
        const result = loginUser(email, password);

        if (!result.success) {
          setError(result.message);
          setIsLoading(false);
          return;
        }

        setSuccess('Welcome back! Redirecting...');
        setTimeout(() => onLoginSuccess(result.user), 800);
      }
      setIsLoading(false);
    }, 400);
  };

  // Shared input style
  const getInputStyle = (val) => ({
    width: '100%',
    padding: '16px',
    background: val ? colors.inputActiveBg : colors.inputBg,
    border: val ? `1px solid ${colors.border}` : `1px solid transparent`,
    borderRadius: '10px',
    color: colors.textPrimary,
    fontSize: '15px',
    fontFamily: 'inherit',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'all 0.2s ease',
  });

  const inputFocusHandler = (e) => {
    e.target.style.background = colors.inputActiveBg;
    e.target.style.border = `1px solid ${colors.border}`;
  };

  const inputBlurHandler = (e) => {
    if (!e.target.value) {
      e.target.style.background = colors.inputBg;
      e.target.style.border = `1px solid transparent`;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.backdrop,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          background: colors.card,
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'row',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.15), 0 0 120px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
          minHeight: '720px'
        }}
      >
        {/* Left Image Panel (approx 45% width) */}
        <div
          style={{
            flex: '0 0 45%',
            position: 'relative',
            padding: '24px',
            boxSizing: 'border-box'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '20px',
              position: 'relative',
              overflow: 'hidden',
              backgroundImage: 'url(/amu-dune.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Top gradient for logo/button visibility */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, height: '30%',
              background: 'linear-gradient(to bottom, rgba(139, 127, 209, 0.3) 0%, transparent 100%)',
              zIndex: 1
            }} />

            {/* Bottom dark gradient for text legibility */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0, height: '50%',
              background: 'linear-gradient(to top, #0D0B12 0%, transparent 100%)',
              zIndex: 1
            }} />

            {/* Header overlay */}
            <div style={{
              position: 'absolute',
              top: '32px',
              left: '32px',
              right: '32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 2
            }}>
              <div style={{
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '22px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}>
                AMU
              </div>
              <button style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                borderRadius: '20px',
                padding: '8px 16px',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}>
                Back to website <ArrowRight size={16} />
              </button>
            </div>

            {/* Bottom overlay text */}
            <div style={{
              position: 'absolute',
              bottom: '48px',
              left: '32px',
              right: '32px',
              zIndex: 2
            }}>
              <h2 style={{
                color: '#FFFFFF',
                fontSize: '28px',
                fontWeight: 600,
                margin: '0 0 24px 0',
                lineHeight: 1.2
              }}>
                Capturing Moments,<br />Creating Memories
              </h2>

              {/* Carousel Indicators */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ width: '24px', height: '4px', borderRadius: '2px', background: '#FFFFFF' }} />
                <div style={{ width: '12px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.3)' }} />
                <div style={{ width: '12px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.3)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Panel (approx 55% width) */}
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px 96px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ maxWidth: '440px', width: '100%' }}>
            <h1 style={{
              fontSize: '42px',
              fontWeight: 700,
              color: colors.textPrimary,
              margin: '0 0 12px 0',
              lineHeight: 1.1
            }}>
              {isSignUp ? 'Create an account' : 'Log in'}
            </h1>
            <p style={{
              fontSize: '15px',
              color: colors.textSecondary,
              margin: '0 0 32px 0'
            }}>
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <button
                onClick={switchMode}
                type="button"
                style={{
                  background: 'none', border: 'none', padding: 0,
                  color: colors.link, fontWeight: 500, textDecoration: 'underline',
                  cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit'
                }}
              >
                {isSignUp ? 'Log in' : 'Create one'}
              </button>
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {isSignUp && (
                <div style={{ display: 'flex', gap: '16px' }}>
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                    style={getInputStyle(firstName)}
                    aria-label="First name"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                    style={getInputStyle(lastName)}
                    aria-label="Last name"
                  />
                </div>
              )}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={inputFocusHandler}
                onBlur={inputBlurHandler}
                style={getInputStyle(email)}
                aria-label="Email"
              />

              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={inputFocusHandler}
                  onBlur={inputBlurHandler}
                  style={{ ...getInputStyle(password), paddingRight: '48px' }}
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', padding: 0, color: colors.textSecondary,
                    cursor: 'pointer', display: 'flex', alignItems: 'center'
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {isSignUp && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setAgreeTerms(!agreeTerms)}
                    style={{
                      width: '18px', height: '18px', borderRadius: '4px',
                      background: agreeTerms ? '#FFFFFF' : colors.inputBg,
                      border: agreeTerms ? '1px solid #FFFFFF' : `1px solid ${colors.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', padding: 0
                    }}
                    aria-label="Agree to Terms and Conditions"
                  >
                    {agreeTerms && <Check size={14} color="#1E1A26" strokeWidth={3} />}
                  </button>
                  <span style={{ fontSize: '14px', color: colors.textSecondary }}>
                    I agree to the <span style={{ color: colors.link, textDecoration: 'underline', cursor: 'pointer' }}>Terms & Conditions</span>
                  </span>
                </div>
              )}

              {error && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  color: '#FF6B81', fontSize: '14px', marginTop: '8px'
                }}>
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  color: '#2DE0A6', fontSize: '14px', marginTop: '8px'
                }}>
                  <CheckCircle2 size={16} />
                  <span>{success}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || (isSignUp && !agreeTerms)}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: colors.primary,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: (isLoading || (isSignUp && !agreeTerms)) ? 'not-allowed' : 'pointer',
                  opacity: (isLoading || (isSignUp && !agreeTerms)) ? 0.7 : 1,
                  marginTop: '8px',
                  transition: 'opacity 0.2s ease'
                }}
              >
                {isLoading ? 'Please wait...' : (isSignUp ? 'Create account' : 'Log in')}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', margin: '32px 0' }}>
              <div style={{ flex: 1, height: '1px', background: colors.border }} />
              <span style={{ margin: '0 16px', fontSize: '13px', color: colors.textSecondary, textTransform: 'uppercase' }}>
                Or {isSignUp ? 'register' : 'log in'} with
              </span>
              <div style={{ flex: 1, height: '1px', background: colors.border }} />
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                type="button"
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  padding: '14px', background: 'transparent', border: `1px solid ${colors.border}`,
                  borderRadius: '10px', color: colors.textPrimary, fontSize: '15px', fontWeight: 500,
                  cursor: 'pointer', transition: 'background 0.2s ease'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button
                type="button"
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  padding: '14px', background: 'transparent', border: `1px solid ${colors.border}`,
                  borderRadius: '10px', color: colors.textPrimary, fontSize: '15px', fontWeight: 500,
                  cursor: 'pointer', transition: 'background 0.2s ease'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
                  <path d="M17.05 13.9c-.01-2.92 2.37-4.32 2.48-4.38-1.37-2-3.32-2.26-4.04-2.31-1.74-.18-3.41 1.03-4.3 1.03-.9 0-2.26-1-3.69-.97-1.87.03-3.6 1.09-4.56 2.77-1.95 3.38-.5 8.38 1.4 11.13.93 1.35 2.03 2.87 3.48 2.82 1.4-.06 1.94-.9 3.63-.9 1.68 0 2.17.9 3.63.88 1.5-.02 2.46-1.38 3.38-2.72 1.06-1.55 1.5-3.05 1.52-3.12-.03-.02-2.9-1.11-2.93-4.22zm-2.07-7.46c.76-.92 1.28-2.21 1.14-3.49-1.1.04-2.43.73-3.21 1.65-.69.81-1.31 2.13-1.15 3.38 1.24.1 2.45-.63 3.22-1.54z" />
                </svg>
                Apple
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
