const API_BASE_URL = 'http://localhost:8080/api';

// Initial fallback mock data in case backend is offline so user can preview UI immediately
let mockDepartments = [
  { id: 1, departmentName: 'Software Engineering', departmentDescription: 'Core platform & services development', employeeCount: 2 },
  { id: 2, departmentName: 'Human Resources', departmentDescription: 'People operations and talent growth', employeeCount: 1 },
  { id: 3, departmentName: 'Product Management', departmentDescription: 'Product vision and feature roadmap', employeeCount: 1 },
  { id: 4, departmentName: 'Marketing & Sales', departmentDescription: 'Brand, growth and partnerships', employeeCount: 1 },
  { id: 5, departmentName: 'Quality Assurance', departmentDescription: 'Quality engineering and test automation', employeeCount: 1 }
];

let mockEmployees = [
  { id: 1, firstName: 'Sarah', lastName: 'Connor', email: 'sarah.connor@company.com', role: 'Senior Tech Lead', salary: 125000, status: 'ACTIVE', hireDate: '2022-03-15', departmentId: 1, departmentName: 'Software Engineering' },
  { id: 2, firstName: 'Alex', lastName: 'Mercer', email: 'alex.mercer@company.com', role: 'Full Stack Developer', salary: 92000, status: 'ACTIVE', hireDate: '2023-01-10', departmentId: 1, departmentName: 'Software Engineering' },
  { id: 3, firstName: 'Elena', lastName: 'Rostova', email: 'elena.rostova@company.com', role: 'HR Director', salary: 98000, status: 'ACTIVE', hireDate: '2021-06-01', departmentId: 2, departmentName: 'Human Resources' },
  { id: 4, firstName: 'David', lastName: 'Kim', email: 'david.kim@company.com', role: 'Product Lead', salary: 110000, status: 'ACTIVE', hireDate: '2022-09-20', departmentId: 3, departmentName: 'Product Management' },
  { id: 5, firstName: 'Marcus', lastName: 'Vance', email: 'marcus.vance@company.com', role: 'Growth Marketing Manager', salary: 85000, status: 'ACTIVE', hireDate: '2023-05-12', departmentId: 4, departmentName: 'Marketing & Sales' },
  { id: 6, firstName: 'Priya', lastName: 'Sharma', email: 'priya.sharma@company.com', role: 'Senior QA Engineer', salary: 89000, status: 'ACTIVE', hireDate: '2023-08-01', departmentId: 5, departmentName: 'Quality Assurance' }
];

let isBackendLive = null;

export const checkBackendStatus = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/stats`, { signal: AbortSignal.timeout(1500) });
    if (res.ok) {
      isBackendLive = true;
      return true;
    }
    isBackendLive = false;
    return false;
  } catch (err) {
    isBackendLive = false;
    return false;
  }
};

export const api = {
  // Stats
  async getStats() {
    try {
      const res = await fetch(`${API_BASE_URL}/stats`, { signal: AbortSignal.timeout(2000) });
      if (!res.ok) throw new Error('Failed to fetch stats');
      isBackendLive = true;
      return await res.json();
    } catch (err) {
      isBackendLive = false;
      const totalEmployees = mockEmployees.length;
      const activeEmployees = mockEmployees.filter(e => e.status === 'ACTIVE').length;
      const inactiveEmployees = totalEmployees - activeEmployees;
      const totalDepartments = mockDepartments.length;
      const totalSalary = mockEmployees.reduce((acc, curr) => acc + Number(curr.salary || 0), 0);
      const averageSalary = totalEmployees ? (totalSalary / totalEmployees).toFixed(2) : 0;
      return { totalEmployees, activeEmployees, inactiveEmployees, totalDepartments, averageSalary, isFallback: true };
    }
  },

  // Employees
  async getEmployees(search = '', departmentId = '') {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (departmentId) params.append('departmentId', departmentId);
      const queryString = params.toString() ? `?${params.toString()}` : '';

      const res = await fetch(`${API_BASE_URL}/employees${queryString}`, { signal: AbortSignal.timeout(2000) });
      if (!res.ok) throw new Error('Failed to fetch employees');
      isBackendLive = true;
      return await res.json();
    } catch (err) {
      isBackendLive = false;
      let list = [...mockEmployees];
      if (departmentId) {
        list = list.filter(e => String(e.departmentId) === String(departmentId));
      }
      if (search) {
        const q = search.toLowerCase();
        list = list.filter(e => 
          e.firstName.toLowerCase().includes(q) ||
          e.lastName.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.role.toLowerCase().includes(q)
        );
      }
      return list;
    }
  },

  async createEmployee(data) {
    try {
      const res = await fetch(`${API_BASE_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || Object.values(err)[0] || 'Failed to create employee');
      }
      isBackendLive = true;
      return await res.json();
    } catch (err) {
      if (isBackendLive) throw err;
      const dept = mockDepartments.find(d => Number(d.id) === Number(data.departmentId));
      const newEmp = {
        id: Date.now(),
        ...data,
        salary: Number(data.salary),
        departmentName: dept ? dept.departmentName : 'General'
      };
      mockEmployees.push(newEmp);
      return newEmp;
    }
  },

  async updateEmployee(id, data) {
    try {
      const res = await fetch(`${API_BASE_URL}/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || Object.values(err)[0] || 'Failed to update employee');
      }
      isBackendLive = true;
      return await res.json();
    } catch (err) {
      if (isBackendLive) throw err;
      const dept = mockDepartments.find(d => Number(d.id) === Number(data.departmentId));
      const idx = mockEmployees.findIndex(e => Number(e.id) === Number(id));
      if (idx !== -1) {
        mockEmployees[idx] = { ...mockEmployees[idx], ...data, salary: Number(data.salary), departmentName: dept ? dept.departmentName : mockEmployees[idx].departmentName };
        return mockEmployees[idx];
      }
      throw err;
    }
  },

  async deleteEmployee(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/employees/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete employee');
      isBackendLive = true;
      return true;
    } catch (err) {
      if (isBackendLive) throw err;
      mockEmployees = mockEmployees.filter(e => Number(e.id) !== Number(id));
      return true;
    }
  },

  // Departments
  async getDepartments() {
    try {
      const res = await fetch(`${API_BASE_URL}/departments`, { signal: AbortSignal.timeout(2000) });
      if (!res.ok) throw new Error('Failed to fetch departments');
      isBackendLive = true;
      return await res.json();
    } catch (err) {
      isBackendLive = false;
      return mockDepartments.map(d => ({
        ...d,
        employeeCount: mockEmployees.filter(e => Number(e.departmentId) === Number(d.id)).length
      }));
    }
  },

  async createDepartment(data) {
    try {
      const res = await fetch(`${API_BASE_URL}/departments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create department');
      isBackendLive = true;
      return await res.json();
    } catch (err) {
      if (isBackendLive) throw err;
      const newDept = { id: Date.now(), ...data, employeeCount: 0 };
      mockDepartments.push(newDept);
      return newDept;
    }
  },

  async updateDepartment(id, data) {
    try {
      const res = await fetch(`${API_BASE_URL}/departments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update department');
      isBackendLive = true;
      return await res.json();
    } catch (err) {
      if (isBackendLive) throw err;
      const idx = mockDepartments.findIndex(d => Number(d.id) === Number(id));
      if (idx !== -1) {
        mockDepartments[idx] = { ...mockDepartments[idx], ...data };
        return mockDepartments[idx];
      }
      throw err;
    }
  },

  async deleteDepartment(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/departments/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete department');
      isBackendLive = true;
      return true;
    } catch (err) {
      if (isBackendLive) throw err;
      mockDepartments = mockDepartments.filter(d => Number(d.id) !== Number(id));
      return true;
    }
  },

  // Auth
  async login(usernameOrEmail, password) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail, password })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Invalid credentials');
      }
      const data = await res.json();
      localStorage.setItem('wp_user', JSON.stringify(data));
      return data;
    } catch (err) {
      // Fallback demo authentication if backend is offline or custom
      if (!isBackendLive || err.message.includes('fetch')) {
        let role = 'ADMIN';
        let displayName = 'Admin User';
        if (usernameOrEmail.toLowerCase().includes('hr')) {
          role = 'HR_MANAGER';
          displayName = 'HR Manager';
        }
        const demoUser = {
          success: true,
          token: 'demo_token_' + Date.now(),
          username: displayName,
          role: role,
          email: usernameOrEmail
        };
        localStorage.setItem('wp_user', JSON.stringify(demoUser));
        return demoUser;
      }
      throw err;
    }
  },

  async register(usernameOrEmail, password) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail, password })
      });
      if (!res.ok) throw new Error('Registration failed');
      const data = await res.json();
      localStorage.setItem('wp_user', JSON.stringify(data));
      return data;
    } catch (err) {
      const demoUser = {
        success: true,
        token: 'demo_token_' + Date.now(),
        username: 'New Member',
        role: 'STAFF',
        email: usernameOrEmail
      };
      localStorage.setItem('wp_user', JSON.stringify(demoUser));
      return demoUser;
    }
  },

  logout() {
    localStorage.removeItem('wp_user');
  },

  getStoredUser() {
    try {
      const user = localStorage.getItem('wp_user');
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  }
};

