import React from 'react';
import { 
  Users, 
  Building2, 
  ShieldCheck, 
  Zap, 
  Database, 
  ArrowRight, 
  CheckCircle, 
  BarChart3, 
  Search, 
  Lock,
  Sparkles,
  Layers
} from 'lucide-react';

export default function LandingPage({ onGetStarted, onLogin, currentUser }) {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <Sparkles size={15} />
          <span>WorkPulse Enterprise 2.0 • Spring Boot + MySQL</span>
        </div>

        <h1 className="hero-title">
          Manage Your Workforce & Departments with <span className="highlight-text">Total Precision</span>
        </h1>

        <p className="hero-subtitle">
          A high-performance full-stack management solution engineered with Spring Boot 3, Hibernate JPA, MySQL 8, and React 19. Organize teams, streamline compensation, and empower organizational growth.
        </p>

        <div className="hero-actions">
          {currentUser ? (
            <button className="btn btn-hero-primary" onClick={onGetStarted}>
              <span>Go to Your Dashboard</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <>
              <button className="btn btn-hero-primary" onClick={onGetStarted}>
                <span>Get Started Now</span>
                <ArrowRight size={18} />
              </button>
              <button className="btn btn-hero-secondary" onClick={onLogin}>
                <Lock size={16} />
                <span>Sign In to Account</span>
              </button>
            </>
          )}
        </div>

        {/* Hero Metrics Bar */}
        <div className="hero-metrics">
          <div className="metric-item">
            <span className="metric-number">100%</span>
            <span className="metric-label">MySQL ACID Reliable</span>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <span className="metric-number">&lt; 10ms</span>
            <span className="metric-label">API Response Time</span>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <span className="metric-number">RESTful</span>
            <span className="metric-label">Clean Spring Architecture</span>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <span className="metric-number">24/7</span>
            <span className="metric-label">Zero-Config Persistence</span>
          </div>
        </div>

        {/* Interactive Preview Mockup */}
        <div className="hero-preview-container">
          <div className="preview-window">
            <div className="window-header">
              <div className="window-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="window-title">WorkPulse Dashboard • Live MySQL 8.0 Sync</div>
              <div className="window-status">
                <span className="pulse-dot"></span>
                <span>Active Database</span>
              </div>
            </div>

            <div className="preview-content">
              <div className="preview-mini-stats">
                <div className="mini-stat">
                  <span className="mini-stat-label">Active Employees</span>
                  <span className="mini-stat-val">6 Members</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-stat-label">Departments</span>
                  <span className="mini-stat-val">5 Units</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-stat-label">Avg. Compensation</span>
                  <span className="mini-stat-val">$99,833/yr</span>
                </div>
              </div>

              <div className="preview-table-mock">
                <div className="preview-row header">
                  <span>Name & Title</span>
                  <span>Department</span>
                  <span>Status</span>
                  <span>Action</span>
                </div>
                <div className="preview-row">
                  <div className="row-emp">
                    <span className="emp-avatar">SC</span>
                    <div>
                      <strong>Sarah Connor</strong>
                      <small>Senior Tech Lead</small>
                    </div>
                  </div>
                  <span className="preview-badge dept">Software Eng.</span>
                  <span className="preview-badge active">ACTIVE</span>
                  <span className="preview-action">Manage</span>
                </div>
                <div className="preview-row">
                  <div className="row-emp">
                    <span className="emp-avatar purple">AM</span>
                    <div>
                      <strong>Alex Mercer</strong>
                      <small>Full Stack Developer</small>
                    </div>
                  </div>
                  <span className="preview-badge dept">Software Eng.</span>
                  <span className="preview-badge active">ACTIVE</span>
                  <span className="preview-action">Manage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section" id="features">
        <div className="section-header">
          <span className="section-tag">CAPABILITIES</span>
          <h2 className="section-title">Built with Enterprise-Grade Technology</h2>
          <p className="section-desc">
            Everything your human resources and operational leads need to oversee staffing, salaries, and departmental structures.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon blue">
              <Users size={24} />
            </div>
            <h3>Employee Directory</h3>
            <p>
              Complete lifecycle management with profiles, job roles, salary tracking, email validation, and status flags.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon purple">
              <Building2 size={24} />
            </div>
            <h3>Department Structure</h3>
            <p>
              Organize company divisions with dynamic member counters, departmental descriptions, and assignment controls.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon green">
              <Search size={24} />
            </div>
            <h3>Real-Time Search & Filter</h3>
            <p>
              Sub-second multi-column searching across names, roles, and emails, with instant department categorization.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon amber">
              <Database size={24} />
            </div>
            <h3>MySQL 8.0 Persistence</h3>
            <p>
              ACID-compliant storage backed by JPA Hibernate with auto DDL generation, connection pooling, and relational schemas.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon indigo">
              <Zap size={24} />
            </div>
            <h3>Spring Boot 3 Core</h3>
            <p>
              Modern RESTful architecture with clean separation of Controllers, Services, Repositories, and validated DTOs.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon red">
              <ShieldCheck size={24} />
            </div>
            <h3>Role-Based Security</h3>
            <p>
              Secure login sessions, input sanitization, global exception resolution, and CORS protected API boundaries.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="cta-section">
        <div className="cta-box">
          <div className="cta-content">
            <h2>Ready to Experience Modern Workforce Management?</h2>
            <p>Experience the synergy of Spring Boot 3, MySQL 8, and modern React 19 UI in action.</p>
          </div>
          <div className="cta-button-wrapper">
            <button className="btn btn-hero-primary" onClick={onGetStarted}>
              <span>Launch Dashboard</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="brand-icon small">
              <Users size={18} />
            </div>
            <span>WorkPulse • Enterprise Employee Platform</span>
          </div>
          <p className="footer-copy">
            Spring Boot 3 • MySQL 8 • React 19 • Java 17 Temurin
          </p>
        </div>
      </footer>
    </div>
  );
}
