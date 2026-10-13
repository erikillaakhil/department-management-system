import React from 'react';
import { Users, UserCheck, Building2, DollarSign } from 'lucide-react';

export default function StatsCards({ stats }) {
  const formattedSalary = Number(stats?.averageSalary || 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div>
          <div className="stat-label">Total Staff</div>
          <div className="stat-value">{stats?.totalEmployees || 0}</div>
        </div>
        <div className="stat-icon blue">
          <Users size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div>
          <div className="stat-label">Active Employees</div>
          <div className="stat-value">{stats?.activeEmployees || 0}</div>
        </div>
        <div className="stat-icon green">
          <UserCheck size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div>
          <div className="stat-label">Departments</div>
          <div className="stat-value">{stats?.totalDepartments || 0}</div>
        </div>
        <div className="stat-icon purple">
          <Building2 size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div>
          <div className="stat-label">Avg. Salary</div>
          <div className="stat-value">{formattedSalary}</div>
        </div>
        <div className="stat-icon emerald">
          <DollarSign size={24} />
        </div>
      </div>
    </div>
  );
}
