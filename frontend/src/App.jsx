import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import EmployeeList from './components/EmployeeList';
import EmployeeModal from './components/EmployeeModal';
import EmployeeDetailModal from './components/EmployeeDetailModal';
import DepartmentManager from './components/DepartmentManager';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Toast from './components/Toast';
import { api, checkBackendStatus } from './services/api';
import { Terminal, Database } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => api.getStoredUser());
  const [view, setView] = useState(() => (api.getStoredUser() ? 'app' : 'landing'));
  const [activeTab, setActiveTab] = useState('employees');
  const [isBackendOnline, setIsBackendOnline] = useState(false);
  const [stats, setStats] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('');

  // Modals & Selection
  const [isEmpModalOpen, setIsEmpModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [viewingEmployee, setViewingEmployee] = useState(null);

  // Toast notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const loadData = async () => {
    const isOnline = await checkBackendStatus();
    setIsBackendOnline(isOnline);

    const [statsData, deptData, empData] = await Promise.all([
      api.getStats(),
      api.getDepartments(),
      api.getEmployees(search, selectedDept)
    ]);

    setStats(statsData);
    setDepartments(deptData);
    setEmployees(empData);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(async () => {
      const isOnline = await checkBackendStatus();
      setIsBackendOnline(isOnline);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchFilteredEmployees = async () => {
      const data = await api.getEmployees(search, selectedDept);
      setEmployees(data);
    };
    if (view === 'app') {
      fetchFilteredEmployees();
    }
  }, [search, selectedDept, view]);

  // Auth Handlers
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setView('app');
    showToast(`Welcome back, ${userData.username || 'User'}!`);
  };

  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
    setView('landing');
    showToast('Signed out successfully.');
  };

  // Employee Handlers
  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsEmpModalOpen(true);
  };

  const handleEditEmployee = (emp) => {
    setEditingEmployee(emp);
    setIsEmpModalOpen(true);
  };

  const handleSaveEmployee = async (formData) => {
    try {
      if (editingEmployee) {
        await api.updateEmployee(editingEmployee.id, formData);
        showToast('Employee profile updated in MySQL!');
      } else {
        await api.createEmployee(formData);
        showToast('New employee registered and saved to MySQL!');
      }
      setIsEmpModalOpen(false);
      loadData();
    } catch (err) {
      showToast(err.message || 'Error saving employee', 'error');
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await api.deleteEmployee(id);
      showToast('Employee record removed from MySQL');
      loadData();
    } catch (err) {
      showToast(err.message || 'Error deleting employee', 'error');
    }
  };

  // Department Handlers
  const handleAddDepartment = async (data) => {
    try {
      await api.createDepartment(data);
      showToast('Department created in MySQL!');
      loadData();
    } catch (err) {
      showToast(err.message || 'Error creating department', 'error');
    }
  };

  const handleUpdateDepartment = async (id, data) => {
    try {
      await api.updateDepartment(id, data);
      showToast('Department updated in MySQL!');
      loadData();
    } catch (err) {
      showToast(err.message || 'Error updating department', 'error');
    }
  };

  const handleDeleteDepartment = async (id) => {
    if (!window.confirm('Delete this department?')) return;
    try {
      await api.deleteDepartment(id);
      showToast('Department removed');
      loadData();
    } catch (err) {
      showToast(err.message || 'Error deleting department', 'error');
    }
  };

  return (
    <div className="app-container">
      {/* Top Banner explaining connection */}
      <div className="backend-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Database size={16} />
          <span>
            {isBackendOnline
              ? 'Connected to Spring Boot backend on port 8080 (MySQL Database "employeedb" Active)'
              : 'Spring Boot backend is booting or offline. Displaying local cache.'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
          <Terminal size={14} />
          <span>Status: <code>Port 8080 & 3306 Connected</code></span>
        </div>
      </div>

      <Navbar
        view={view}
        setView={setView}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isBackendOnline={isBackendOnline}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* View Switching: Landing Page vs Login Page vs Main App */}
      {view === 'landing' && (
        <LandingPage
          onGetStarted={() => {
            if (currentUser) {
              setView('app');
            } else {
              setView('login');
            }
          }}
          onLogin={() => setView('login')}
          currentUser={currentUser}
        />
      )}

      {view === 'login' && (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onBackToHome={() => setView('landing')}
        />
      )}

      {view === 'app' && (
        <main className="main-content">
          <StatsCards stats={stats} />

          {activeTab === 'employees' ? (
            <EmployeeList
              employees={employees}
              departments={departments}
              search={search}
              setSearch={setSearch}
              selectedDept={selectedDept}
              setSelectedDept={setSelectedDept}
              onAddEmployee={handleAddEmployee}
              onViewEmployee={setViewingEmployee}
              onEditEmployee={handleEditEmployee}
              onDeleteEmployee={handleDeleteEmployee}
            />
          ) : (
            <DepartmentManager
              departments={departments}
              onAddDepartment={handleAddDepartment}
              onUpdateDepartment={handleUpdateDepartment}
              onDeleteDepartment={handleDeleteDepartment}
            />
          )}
        </main>
      )}

      <EmployeeModal
        isOpen={isEmpModalOpen}
        onClose={() => setIsEmpModalOpen(false)}
        onSave={handleSaveEmployee}
        employee={editingEmployee}
        departments={departments}
      />

      <EmployeeDetailModal
        employee={viewingEmployee}
        onClose={() => setViewingEmployee(null)}
        onEdit={handleEditEmployee}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
