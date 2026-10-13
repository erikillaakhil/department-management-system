# WorkPulse | Full-Stack Employee & Department Management System

> **Spring Boot 3 + MySQL 8 + React 19 (Vite) + Docker Compose**

---

## 🏗 Architecture

```
┌─────────────────────────────────────────┐
│           Docker Compose Stack          │
│                                         │
│  ┌────────────┐    ┌──────────────────┐ │
│  │  Frontend  │    │    Backend       │ │
│  │  React 19  │───▶│  Spring Boot 3   │ │
│  │  Nginx:80  │    │  Java 17 : 8080  │ │
│  └────────────┘    └────────┬─────────┘ │
│                             │           │
│                    ┌────────▼─────────┐ │
│                    │   MySQL 8.0      │ │
│                    │  employeedb:3306 │ │
│                    └──────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 🚀 Run with Docker (Recommended — One Command)

> **Prerequisite**: Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) for Windows.

```powershell
# From the project root directory:
docker compose up --build
```

That's it! Docker will:
1. Pull **MySQL 8.0**, create the `employeedb` database, and seed sample data.
2. Build and start the **Spring Boot backend** on `http://localhost:8080`.
3. Build the **React frontend** and serve it with **Nginx** on `http://localhost:80`.

| Service | URL |
| :--- | :--- |
| **Frontend (App)** | [http://localhost](http://localhost) or [http://localhost:5173](http://localhost:5173) |
| **Backend API** | [http://localhost:8080/api/employees](http://localhost:8080/api/employees) |
| **Database** | `localhost:3306` (user: `root`, pass: `root`) |

### Helper Batch Scripts (Windows)
| Script | What it does |
| :--- | :--- |
| `docker-start.bat` | Build and start all containers in background |
| `docker-stop.bat` | Stop and remove all containers |
| `docker-reset.bat` | Stop containers AND wipe MySQL data volume |
| `docker-logs.bat` | View live logs (all / backend / mysql / frontend) |

---

## 🛠 Run Locally (Without Docker)

### Prerequisites
- Java 17+ (portable JDK in `../tools/jdk-17.0.20.1+1/` auto-detected)
- Maven 3.9+ (portable Maven in `../tools/apache-maven-3.9.9/` auto-detected)
- MySQL 8.0 running on port `3306`
- Node.js 20+

### 1. Database Setup
```sql
CREATE DATABASE IF NOT EXISTS employeedb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Update `spring.datasource.password` in [application.properties](backend/src/main/resources/application.properties).

### 2. Backend
```powershell
cd backend
mvn spring-boot:run
# Or double-click: run-backend.bat
```

### 3. Frontend
```powershell
cd frontend
npm run dev
# Or double-click: run-frontend.bat
```

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate user, returns JWT token |
| `POST` | `/api/auth/register` | Register new user |
| `GET` | `/api/stats` | Dashboard summary (total employees, avg salary) |
| `GET` | `/api/employees` | List all employees (supports `?search=` & `?departmentId=`) |
| `GET` | `/api/employees/{id}` | Get employee by ID |
| `POST` | `/api/employees` | Create employee |
| `PUT` | `/api/employees/{id}` | Update employee |
| `DELETE` | `/api/employees/{id}` | Delete employee |
| `GET` | `/api/departments` | List all departments with employee counts |
| `POST` | `/api/departments` | Create department |
| `PUT` | `/api/departments/{id}` | Update department |
| `DELETE` | `/api/departments/{id}` | Delete department |

---

## 📁 Project Structure

```
employee-management-system/
├── docker-compose.yml            ← Orchestrates all 3 services
├── docker-start.bat              ← 1-click Docker startup
├── docker-stop.bat               ← Stop all containers
├── docker-reset.bat              ← Nuclear reset (wipes DB volume)
├── docker-logs.bat               ← View service logs
├── .gitignore
│
├── backend/
│   ├── Dockerfile                ← Multi-stage: Maven build → JRE runtime
│   ├── .dockerignore
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/example/ems/
│       │   ├── EmsApplication.java
│       │   ├── config/CorsConfig.java
│       │   ├── controller/         (Employee, Department, Stats, Auth)
│       │   ├── dto/                (EmployeeDto, DepartmentDto, AuthRequest/Response)
│       │   ├── entity/             (Employee, Department)
│       │   ├── exception/          (GlobalExceptionHandler, ResourceNotFoundException)
│       │   ├── repository/         (EmployeeRepository, DepartmentRepository)
│       │   └── service/impl/       (EmployeeServiceImpl, DepartmentServiceImpl)
│       └── resources/
│           ├── application.properties       (Local MySQL config)
│           ├── application-h2.properties    (In-memory H2 for testing)
│           ├── application-prod.properties  (Docker/production config)
│           └── data.sql                     (Seed data for 5 depts, 6 employees)
│
└── frontend/
    ├── Dockerfile                ← Multi-stage: Node.js build → Nginx serve
    ├── .dockerignore
    ├── nginx.conf                ← SPA routing + /api/ reverse proxy
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── App.jsx               (Landing / Login / Dashboard view routing)
        ├── main.jsx
        ├── index.css
        ├── services/api.js       (REST client + offline fallback + auth)
        └── components/
            ├── LandingPage.jsx   (Hero, Features, CTA)
            ├── LoginPage.jsx     (Sign In / Register with demo credentials)
            ├── Navbar.jsx        (Adaptive — landing vs app vs guest vs user)
            ├── StatsCards.jsx
            ├── EmployeeList.jsx
            ├── EmployeeModal.jsx
            ├── EmployeeDetailModal.jsx
            ├── DepartmentManager.jsx
            └── Toast.jsx
```
