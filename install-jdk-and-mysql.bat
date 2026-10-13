@echo off
echo ====================================================================
echo  WorkPulse EMS - Java 17 & MySQL Installation Script (via winget)
echo ====================================================================
echo.

echo 1. Installing Eclipse Temurin JDK 17...
winget install --id EclipseAdoptium.Temurin.17.JDK -e --accept-source-agreements --accept-package-agreements

echo.
echo 2. Installing MySQL Server...
winget install --id Oracle.MySQL -e --accept-source-agreements --accept-package-agreements

echo.
echo 3. Installing Apache Maven...
winget install --id Apache.Maven -e --accept-source-agreements --accept-package-agreements

echo.
echo ====================================================================
echo Installation attempted! Please restart your terminal/IDE window
echo so that Java, Maven, and MySQL environment variables take effect.
echo ====================================================================
pause
