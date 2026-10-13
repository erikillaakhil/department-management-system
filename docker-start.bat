@echo off
echo =========================================================
echo  Starting WorkPulse Full-Stack with Docker Compose
echo =========================================================

where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Docker is not installed or not running.
    echo Please install Docker Desktop from https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo Building and starting containers (MySQL, Spring Boot, React)...
docker compose up --build -d

echo.
echo All containers started!
echo Frontend is available at: http://localhost:5173 or http://localhost:80
echo Backend API is available at: http://localhost:8080/api/employees
echo.
pause
