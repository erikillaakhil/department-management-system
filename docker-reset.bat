@echo off
echo =========================================================
echo  Resetting WorkPulse (removes containers AND database!)
echo =========================================================
echo WARNING: This will delete all MySQL data volumes!
set /p CONFIRM=Type YES to continue: 
if /I not "%CONFIRM%"=="YES" (
    echo Aborted.
    pause
    exit /b
)
docker compose down -v --remove-orphans
echo Done. All containers and volumes removed.
pause
