import React from 'react';
import { X, Mail, Briefcase, Building2, DollarSign, Calendar, CheckCircle2 } from 'lucide-react';

export default function EmployeeDetailModal({ employee, onClose, onEdit }) {
  if (!employee) return null;

  const initials = `${employee.firstName?.[0] || ''}${employee.lastName?.[0] || ''}`.toUpperCase();

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <h2>Employee Profile</h2>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ textAlign: 'center', paddingTop: '2rem' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              color: 'white',
              fontSize: '1.75rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 8px 16px rgba(79, 70, 229, 0.25)'
            }}
          >
            {initials}
          </div>

          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
            {employee.firstName} {employee.lastName}
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            {employee.role}
          </p>

          <div
            style={{
              background: '#f8fafc',
              borderRadius: '12px',
              padding: '1.25rem',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              border: '1px solid #e2e8f0'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Mail size={18} color="#6366f1" />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>EMAIL</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{employee.email}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Building2 size={18} color="#6366f1" />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>DEPARTMENT</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{employee.departmentName || 'Not Assigned'}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <DollarSign size={18} color="#6366f1" />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>COMPENSATION</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                  ${Number(employee.salary || 0).toLocaleString()} / year
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Calendar size={18} color="#6366f1" />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>HIRE DATE</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{employee.hireDate || 'N/A'}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color={employee.status === 'ACTIVE' ? '#10b981' : '#ef4444'} />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>STATUS</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: employee.status === 'ACTIVE' ? '#059669' : '#dc2626' }}>
                  {employee.status}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Close
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onEdit(employee);
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
