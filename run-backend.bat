@echo off
setlocal
echo =========================================================
echo  Starting WorkPulse Spring Boot Backend (Port 8080)
echo =========================================================

set "PROJECT_DIR=%~dp0"
set "TOOLS_DIR=%PROJECT_DIR%..\tools"

:: 1. Check if JAVA_HOME or java is already present, else use local tools JDK
where java >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using system Java...
) else (
    if exist "%TOOLS_DIR%\jdk-17.0.20.1+1" (
        echo Using portable JDK 17 from %TOOLS_DIR%\jdk-17.0.20.1+1 ...
        set "JAVA_HOME=%TOOLS_DIR%\jdk-17.0.20.1+1"
        set "PATH=%TOOLS_DIR%\jdk-17.0.20.1+1\bin;%PATH%"
    ) else (
        echo [ERROR] Java JDK 17 not found.
        pause
        exit /b 1
    )
)

:: 2. Check if mvn is present, else use local tools Maven
where mvn >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    if exist "%TOOLS_DIR%\apache-maven-3.9.9\bin" (
        echo Using portable Maven from %TOOLS_DIR%\apache-maven-3.9.9 ...
        set "PATH=%TOOLS_DIR%\apache-maven-3.9.9\bin;%PATH%"
    )
)

cd "%PROJECT_DIR%backend"
echo.
echo Running: mvn spring-boot:run ...
call mvn spring-boot:run

pause
