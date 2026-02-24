@echo off
echo ========================================
echo   Sustindex Development Server
echo ========================================
echo.
echo Starting Django Backend on port 8000...
echo Starting Next.js Frontend on port 3000...
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C to stop both servers
echo ========================================
echo.

start "Django Backend" cmd /k "cd sustindex- && python manage.py runserver"
timeout /t 3 /nobreak > nul
start "Next.js Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting...
echo Check the new windows for logs
echo.
pause
