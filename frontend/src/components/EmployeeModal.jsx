import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

export default function EmployeeModal({
  isOpen,
  onClose,
  onSave,
  employee,
  departments
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    departmentId: '',
    salary: '',
    status: 'ACTIVE',
    hireDate: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        email: employee.email || '',
        role: employee.role || '',
        departmentId: employee.departmentId || '',
        salary: employee.salary || '',
        status: employee.status || 'ACTIVE',
        hireDate: employee.hireDate || new Date().toISOString().split('T')[0]
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        departmentId: departments[0]?.id || '',
        salary: '',
        status: 'ACTIVE',
        hireDate: new Date().toISOString().split('T')[0]
      });
    }
    setErrors({});
  }, [employee, departments, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.role.trim()) newErrors.role = 'Role / Position is required';
    if (!formData.departmentId) newErrors.departmentId = 'Department is required';
    if (!formData.salary || Number(formData.salary) <= 0) {
      newErrors.salary = 'Please enter a valid salary';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. John"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
                {errors.firstName && (
                  <span className="form-error">{errors.firstName}</span>
                )}
              </div>

              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Doe"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
                {errors.lastName && (
                  <span className="form-error">{errors.lastName}</span>
                )}
              </div>

              <div className="form-group full-width">
                <label>Work Email *</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="e.g. john.doe@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {errors.email && (
                  <span className="form-error">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label>Job Title / Role *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Frontend Engineer"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                />
                {errors.role && (
                  <span className="form-error">{errors.role}</span>
                )}
              </div>

              <div className="form-group">
                <label>Department *</label>
                <select
                  className="form-control"
                  value={formData.departmentId}
                  onChange={(e) =>
                    setFormData({ ...formData, departmentId: e.target.value })
                  }
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.departmentName}
                    </option>
                  ))}
                </select>
                {errors.departmentId && (
                  <span className="form-error">{errors.departmentId}</span>
                )}
              </div>

              <div className="form-group">
                <label>Annual Salary ($) *</label>
                <input
                  type="number"
                  step="1000"
                  className="form-control"
                  placeholder="e.g. 85000"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                />
                {errors.salary && (
                  <span className="form-error">{errors.salary}</span>
                )}
              </div>

              <div className="form-group">
                <label>Employment Status</label>
                <select
                  className="form-control"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Hire Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.hireDate}
                  onChange={(e) =>
                    setFormData({ ...formData, hireDate: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Check size={16} />
              <span>{employee ? 'Save Changes' : 'Create Employee'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
