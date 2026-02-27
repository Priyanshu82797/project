@echo off
REM Smart Bridge Digital Twin - Quick Start Script for Windows

echo.
echo 🌉 Smart Bridge Digital Twin - Quick Start
echo ===========================================
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

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %ErrorLevel% NEQ 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully
echo.
echo 🚀 Starting development server...
echo 📍 The dashboard will open at http://localhost:3000
echo.

call npm start
