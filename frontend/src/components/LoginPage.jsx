import React, { useState } from 'react';
import { 
  Users, 
  Lock, 
  Mail, 
  ArrowLeft, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Sparkles,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { api } from '../services/api';

export default function LoginPage({ onLoginSuccess, onBackToHome }) {
  const [isRegister, setIsRegister] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!usernameOrEmail.trim()) {
      setError('Please enter your email or username');
      return;
    }
    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    try {
      setLoading(true);
      let userData;
      if (isRegister) {
        userData = await api.register(usernameOrEmail, password);
      } else {
        userData = await api.login(usernameOrEmail, password);
      }
      onLoginSuccess(userData);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Quick fill demo credentials
  const fillDemo = (email, pass) => {
    setUsernameOrEmail(email);
    setPassword(pass);
    setError('');
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        {/* Top Back Navigation */}
        <div className="login-header-nav">
          <button className="btn-back" onClick={onBackToHome}>
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Brand & Title */}
        <div className="login-branding">
          <div className="brand-icon large">
            <Users size={26} />
          </div>
          <h2>{isRegister ? 'Create Your Account' : 'Welcome to WorkPulse'}</h2>
          <p>
            {isRegister
              ? 'Join WorkPulse to manage your employees and team'
              : 'Sign in to access your MySQL-backed HR dashboard'}
          </p>
        </div>

        {/* Quick Demo Credentials Bar */}
        {!isRegister && (
          <div className="demo-credentials-box">
            <div className="demo-title">
              <Sparkles size={14} />
              <span>Quick Test Credentials:</span>
            </div>
            <div className="demo-buttons">
              <button
                type="button"
                className="btn-demo-pill"
                onClick={() => fillDemo('admin@workpulse.io', 'admin123')}
              >
                <span>Admin</span>
                <code>admin@workpulse.io</code>
              </button>
              <button
                type="button"
                className="btn-demo-pill"
                onClick={() => fillDemo('hr.director@workpulse.io', 'hr1234')}
              >
                <span>HR Lead</span>
                <code>hr.director@workpulse.io</code>
              </button>
            </div>
          </div>
        )}

        {/* Mode Switcher Tabs */}
        <div className="auth-mode-tabs">
          <button
            type="button"
            className={`auth-tab ${!isRegister ? 'active' : ''}`}
            onClick={() => {
              setIsRegister(false);
              setError('');
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab ${isRegister ? 'active' : ''}`}
            onClick={() => {
              setIsRegister(true);
              setError('');
            }}
          >
            Create Account
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="auth-error-banner">
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email or Username</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                type="text"
                className="form-control auth-input"
                placeholder="name@company.com"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="label-with-action">
              <label>Password</label>
              {!isRegister && (
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => alert('Demo mode: you can use any password with 4+ characters.')}
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control auth-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="btn-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-auth-submit"
            disabled={loading}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{isRegister ? 'Create Account' : 'Sign In to Dashboard'}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer-note">
          <ShieldCheck size={16} color="#10b981" />
          <span>Spring Boot 3 & MySQL 8.0 Protected REST Session</span>
        </div>
      </div>
    </div>
  );
}
