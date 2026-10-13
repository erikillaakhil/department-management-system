import React, { useState } from 'react';
import { Building2, Plus, Edit2, Trash2, Users } from 'lucide-react';

export default function DepartmentManager({
  departments,
  onAddDepartment,
  onUpdateDepartment,
  onDeleteDepartment
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [deptForm, setDeptForm] = useState({ departmentName: '', departmentDescription: '' });
  const [error, setError] = useState('');

  const openAddModal = () => {
    setEditingDept(null);
    setDeptForm({ departmentName: '', departmentDescription: '' });
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (dept) => {
    setEditingDept(dept);
    setDeptForm({
      departmentName: dept.departmentName,
      departmentDescription: dept.departmentDescription || ''
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!deptForm.departmentName.trim()) {
      setError('Department name is required');
      return;
    }
    if (editingDept) {
      onUpdateDepartment(editingDept.id, deptForm);
    } else {
      onAddDepartment(deptForm);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="controls-bar">
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Company Departments</h2>
          <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
            Organize teams and assign employees to their respective functional units.
          </p>
        </div>

        <button className="btn btn-primary" onClick={openAddModal}>
          <Plus size={16} />
          <span>New Department</span>
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {departments.map((dept) => (
          <div
            key={dept.id}
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: '#eef2ff',
                    color: '#4f46e5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Building2 size={20} />
                </div>

                <div className="action-buttons">
                  <button
                    className="btn-icon"
                    title="Edit"
                    onClick={() => openEditModal(dept)}
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    className="btn-icon delete"
                    title="Delete"
                    onClick={() => onDeleteDepartment(dept.id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                {dept.departmentName}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                {dept.departmentDescription || 'No description provided.'}
              </p>
            </div>

            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                color: '#475569',
                fontWeight: 600
              }}
            >
              <Users size={16} color="#6366f1" />
              <span>{dept.employeeCount || 0} Employees Assigned</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingDept ? 'Edit Department' : 'Add Department'}</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>Department Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Engineering, Marketing"
                    value={deptForm.departmentName}
                    onChange={(e) =>
                      setDeptForm({ ...deptForm, departmentName: e.target.value })
                    }
                  />
                  {error && <span className="form-error">{error}</span>}
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    rows={4}
                    className="form-control"
                    placeholder="Brief description of this department's function..."
                    value={deptForm.departmentDescription}
                    onChange={(e) =>
                      setDeptForm({
                        ...deptForm,
                        departmentDescription: e.target.value
                      })
                    }
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingDept ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
