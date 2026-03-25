@echo off
echo ============================================
echo    SparkSTEM - Starting Full Application
echo ============================================
echo.

cd /d "C:\Users\HP\OneDrive\Desktop\SparkSTEM"

echo [1/2] Building backend...
call npm run build -w backend
if errorlevel 1 (
    echo ERROR: Backend build failed!
    pause
    exit /b 1
)

echo.
echo [2/2] Starting both servers...
echo.
echo    Frontend: http://localhost:8000
echo    Backend:  http://localhost:3000
echo.
echo Press Ctrl+C to stop both servers
echo ============================================
echo.

call npm start
