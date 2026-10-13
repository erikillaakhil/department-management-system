@echo off
echo =========================================================
echo  WorkPulse Container Logs
echo =========================================================
echo Choose which logs to view:
echo [1] All containers (live tail)
echo [2] Backend only (Spring Boot)
echo [3] MySQL only
echo [4] Frontend only (Nginx)
echo.
set /p CHOICE=Enter number (1-4): 

if "%CHOICE%"=="1" docker compose logs -f
if "%CHOICE%"=="2" docker compose logs -f backend
if "%CHOICE%"=="3" docker compose logs -f mysql
if "%CHOICE%"=="4" docker compose logs -f frontend
pause
