import React from 'react';
import { 
  Users, 
  Building2, 
  LogOut, 
  LogIn, 
  ArrowRight, 
  LayoutDashboard,
  Shield,
  Sparkles
} from 'lucide-react';

export default function Navbar({ 
  view, 
  setView, 
  activeTab, 
  setActiveTab, 
  isBackendOnline, 
  currentUser, 
  onLogout 
}) {
  const isAppView = view === 'app';

  return (
    <header className="navbar">
      <div className="nav-inner">
        {/* Brand */}
        <div className="brand" onClick={() => setView('landing')} style={{ cursor: 'pointer' }}>
          <div className="brand-icon">
            <Users size={22} />
          </div>
          <div className="brand-text">
            <h1>WorkPulse</h1>
            <span>Spring Boot + React + MySQL</span>
          </div>
        </div>

        {/* Center Navigation */}
        {isAppView ? (
          <nav className="nav-tabs">
            <button
              className={`nav-tab ${activeTab === 'employees' ? 'active' : ''}`}
              onClick={() => setActiveTab('employees')}
            >
              <Users size={16} />
              <span>Employees</span>
            </button>
            <button
              className={`nav-tab ${activeTab === 'departments' ? 'active' : ''}`}
              onClick={() => setActiveTab('departments')}
            >
              <Building2 size={16} />
              <span>Departments</span>
            </button>
          </nav>
        ) : (
          <nav className="nav-landing-links">
            <button className="nav-landing-link" onClick={() => setView('landing')}>
              Overview
            </button>
            <a href="#features" className="nav-landing-link">
              Features
            </a>
          </nav>
        )}

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Status Dot */}
          <div className="nav-status">
            <span className={`status-dot ${isBackendOnline ? 'status-live' : 'status-offline'}`}></span>
            <span style={{ color: isBackendOnline ? '#059669' : '#d97706' }}>
              {isBackendOnline ? 'API Live' : 'Demo API'}
            </span>
          </div>

          {currentUser ? (
            <div className="user-profile-menu">
              <div 
                className="user-badge" 
                onClick={() => setView('app')}
                style={{ cursor: 'pointer' }}
                title="Go to Dashboard"
              >
                <div className="user-avatar-small">
                  {currentUser.username ? currentUser.username.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="user-badge-info">
                  <span className="user-badge-name">{currentUser.username || 'User'}</span>
                  <span className="user-badge-role">{currentUser.role || 'Admin'}</span>
                </div>
              </div>

              {!isAppView && (
                <button 
                  className="btn btn-primary btn-sm" 
                  onClick={() => setView('app')}
                >
                  <LayoutDashboard size={15} />
                  <span>Dashboard</span>
                </button>
              )}

              <button 
                className="btn-icon logout-btn" 
                title="Sign Out" 
                onClick={onLogout}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="guest-nav-actions">
              <button 
                className="btn btn-outline btn-sm" 
                onClick={() => setView('login')}
              >
                <LogIn size={15} />
                <span>Sign In</span>
              </button>
              <button 
                className="btn btn-primary btn-sm" 
                onClick={() => setView('login')}
              >
                <span>Get Started</span>
                <ArrowRight size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
