import React, { useState } from 'react';
import { registerUser, loginUser } from '../data/authUtils';
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Feedback
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /** Reset form state when switching modes */
  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setSuccess('');
    setName('');
    setEmail('');
    setPassword('');
    setShowPassword(false);
  };

  /** Handle form submission */
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Simulate a slight network delay for realism
    setTimeout(() => {
      if (isSignUp) {
        // ── Registration ──
        const result = registerUser({ name, email, password });

        if (!result.success) {
          setError(result.message);
          setIsLoading(false);
          return;
        }

        // Auto-login after registration
        const loginResult = loginUser(email, password);
        if (loginResult.success) {
          setSuccess('Account created! Redirecting...');
          setTimeout(() => onLoginSuccess(loginResult.user), 800);
        }
      } else {
        // ── Login ──
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

  /* ── Palette (dark fintech theme) ── */
  const colors = {
    bg: '#0A0E17',
    panel: 'rgba(22, 27, 39, 0.65)',
    panelBorder: 'rgba(255, 255, 255, 0.08)',
    ink: '#F1F3F9',
    inkDim: '#9AA3B8',
    inkFaint: '#5C6478',
    field: 'rgba(255, 255, 255, 0.04)',
    fieldBorder: 'rgba(255, 255, 255, 0.10)',
    accentA: '#7C5CFF',
    accentB: '#22D3EE',
    danger: '#FF6B81',
    dangerBg: 'rgba(255, 107, 129, 0.10)',
    success: '#2DE0A6',
    successBg: 'rgba(45, 224, 166, 0.10)'
  };

  /* ── Shared input field style ── */
  const inputWrapStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  };

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '13px 14px 13px 44px',
    fontSize: '0.92rem',
    fontFamily: 'inherit',
    border: `1px solid ${colors.fieldBorder}`,
    borderRadius: '12px',
    background: colors.field,
    color: colors.ink,
    outline: 'none',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
  };

  const inputFocusHandler = (e) => {
    e.target.style.borderColor = colors.accentB;
    e.target.style.boxShadow = `0 0 0 3px rgba(34, 211, 238, 0.15)`;
  };

  const inputBlurHandler = (e) => {
    e.target.style.borderColor = colors.fieldBorder;
    e.target.style.boxShadow = 'none';
  };

  const iconStyle = {
    position: 'absolute',
    left: '15px',
    pointerEvents: 'none',
    color: colors.inkFaint
  };

  const labelStyle = {
    fontSize: '0.7rem',
    color: colors.inkDim,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    fontWeight: 600,
    marginBottom: '7px',
    display: 'block'
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: colors.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}
    >
      {/* ── Glowing gradient orb (signature element) ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '640px',
          height: '640px',
          transform: 'translate(-50%, -55%)',
          background: `radial-gradient(circle at 35% 30%, ${colors.accentA} 0%, ${colors.accentB} 35%, transparent 70%)`,
          opacity: 0.22,
          filter: 'blur(70px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-180px',
          right: '-140px',
          width: '380px',
          height: '380px',
          background: `radial-gradient(circle, ${colors.accentB} 0%, transparent 70%)`,
          opacity: 0.12,
          filter: 'blur(60px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />

      {/* ── Login Card ── */}
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              background: `linear-gradient(135deg, ${colors.accentA} 0%, ${colors.accentB} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0A0E17',
              fontWeight: 800,
              fontSize: '1.2rem',
              boxShadow: `0 8px 28px rgba(124, 92, 255, 0.35)`,
              margin: '0 auto 18px'
            }}
          >
            AL
          </div>
          <h1
            style={{
              fontWeight: 800,
              fontSize: '1.7rem',
              color: colors.ink,
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              margin: 0
            }}
          >
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h1>
          <p
            style={{
              color: colors.inkDim,
              fontSize: '0.92rem',
              marginTop: '8px'
            }}
          >
            {isSignUp
              ? 'Sign up to start tracking your progress'
              : 'Sign in to your AlgoLens dashboard'}
          </p>
        </div>

        {/* Form Card (glass panel) */}
        <div
          style={{
            background: colors.panel,
            border: `1px solid ${colors.panelBorder}`,
            borderRadius: '20px',
            padding: '32px 28px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow:
              '0 20px 60px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.04)'
          }}
        >
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Name Field (Sign Up only) */}
              {isSignUp && (
                <div>
                  <label htmlFor="auth-name" style={labelStyle}>
                    Full Name
                  </label>
                  <div style={inputWrapStyle}>
                    <User size={16} style={iconStyle} />
                    <input
                      id="auth-name"
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={inputFocusHandler}
                      onBlur={inputBlurHandler}
                      style={inputStyle}
                      autoComplete="name"
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="auth-email" style={labelStyle}>
                  Email Address
                </label>
                <div style={inputWrapStyle}>
                  <Mail size={16} style={iconStyle} />
                  <input
                    id="auth-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                    style={inputStyle}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="auth-password" style={labelStyle}>
                  Password
                </label>
                <div style={inputWrapStyle}>
                  <Lock size={16} style={iconStyle} />
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={isSignUp ? 'Min. 6 characters' : 'Enter your password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                    style={{ ...inputStyle, paddingRight: '44px' }}
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '13px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: colors.inkFaint,
                      padding: '2px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '16px',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  background: colors.dangerBg,
                  border: '1px solid rgba(255, 107, 129, 0.22)',
                  color: colors.danger,
                  fontSize: '0.82rem',
                  fontWeight: 500
                }}
              >
                <AlertCircle size={15} style={{ flexShrink: 0 }} />
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
                  marginTop: '16px',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  background: colors.successBg,
                  border: '1px solid rgba(45, 224, 166, 0.25)',
                  color: colors.success,
                  fontSize: '0.82rem',
                  fontWeight: 500
                }}
              >
                <CheckCircle2 size={15} style={{ flexShrink: 0 }} />
                <span>{success}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '22px',
                padding: '13px 20px',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: '#0A0E17',
                border: 'none',
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${colors.accentA} 0%, ${colors.accentB} 100%)`,
                boxShadow: '0 10px 30px -6px rgba(124, 92, 255, 0.45)',
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {isLoading ? (
                <span>Please wait...</span>
              ) : (
                <>
                  <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Toggle Sign Up / Login */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '22px',
            fontSize: '0.86rem',
            color: colors.inkDim
          }}
        >
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={switchMode}
            type="button"
            style={{
              background: 'none',
              border: 'none',
              color: colors.accentB,
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.86rem',
              fontFamily: 'inherit',
              textDecoration: 'underline',
              textUnderlineOffset: '3px'
            }}
          >
            {isSignUp ? 'Sign in' : 'Create one'}
          </button>
        </div>

        {/* Footer Hint */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '26px',
            fontSize: '0.66rem',
            letterSpacing: '0.03em',
            color: colors.inkFaint
          }}
        >
          Your data is stored locally in your browser.
        </div>
      </div>
    </div>
  );
}