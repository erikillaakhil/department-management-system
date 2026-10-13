import React from 'react';
import { Search, UserPlus, Eye, Edit2, Trash2, Filter } from 'lucide-react';

export default function EmployeeList({
  employees,
  departments,
  search,
  setSearch,
  selectedDept,
  setSelectedDept,
  onAddEmployee,
  onViewEmployee,
  onEditEmployee,
  onDeleteEmployee
}) {
  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <div>
      <div className="controls-bar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <select
            className="filter-select"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.departmentName}
              </option>
            ))}
          </select>

          <button className="btn btn-primary" onClick={onAddEmployee}>
            <UserPlus size={16} />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      <div className="table-container">
        {employees.length === 0 ? (
          <div className="empty-state">
            <Search size={40} />
            <h3>No employees found</h3>
            <p>Try adjusting your search query or department filter, or add a new employee.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Role</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Hire Date</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">
                        {getInitials(emp.firstName, emp.lastName)}
                      </div>
                      <div>
                        <div className="user-name">
                          {emp.firstName} {emp.lastName}
                        </div>
                        <div className="user-email">{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <strong>{emp.role}</strong>
                  </td>
                  <td>
                    <span className="badge badge-dept">
                      {emp.departmentName || 'Not Assigned'}
                    </span>
                  </td>
                  <td>
                    ${Number(emp.salary || 0).toLocaleString()}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        emp.status === 'ACTIVE' ? 'badge-active' : 'badge-inactive'
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td style={{ color: '#64748b' }}>
                    {emp.hireDate || 'N/A'}
                  </td>
                  <td>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                      <button
                        className="btn-icon"
                        title="View Profile"
                        onClick={() => onViewEmployee(emp)}
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        className="btn-icon"
                        title="Edit Employee"
                        onClick={() => onEditEmployee(emp)}
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        className="btn-icon delete"
                        title="Delete Employee"
                        onClick={() => onDeleteEmployee(emp.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
