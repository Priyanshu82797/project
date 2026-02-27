@echo off
REM Smart Bridge Digital Twin - Full Stack Start Script for Windows
REM Starts both Frontend (React) and Backend (Node.js) simultaneously

echo.
echo 🌉 Smart Bridge Digital Twin - Full Stack Launch
echo ==================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ErrorLevel% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 14+ from https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version

echo ✅ npm version:
npm --version
echo.

REM Install frontend dependencies if needed
echo 📦 Checking frontend dependencies...
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
    if %ErrorLevel% NEQ 0 (
        echo ❌ Failed to install frontend dependencies
        pause
        exit /b 1
    )
)

REM Install backend dependencies if needed
echo 📦 Checking backend dependencies...
if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    if %ErrorLevel% NEQ 0 (
        echo ❌ Failed to install backend dependencies
        cd ..
        pause
        exit /b 1
    )
    cd ..
)

echo.
echo ✅ All dependencies installed
echo.
echo 🚀 Starting Frontend and Backend...
echo.
echo 📍 Frontend dashboard will open at http://localhost:3000
echo 📍 Backend API running at http://localhost:5000
echo.
echo 💡 Tip: Close both terminal windows or press CTRL+C to stop servers
echo.

REM Start backend in a new window
start cmd /k "cd backend && npm start"

REM Give backend time to start
timeout /t 2 /nobreak

REM Start frontend
call npm start
