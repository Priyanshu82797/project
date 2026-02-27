#!/bin/bash
# Smart Bridge Digital Twin - Full Stack Start Script for Linux/Mac
# Starts both Frontend (React) and Backend (Node.js) simultaneously

echo ""
echo "🌉 Smart Bridge Digital Twin - Full Stack Launch"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 14+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install frontend dependencies if needed
echo "📦 Checking frontend dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install frontend dependencies"
        exit 1
    fi
fi

# Install backend dependencies if needed
echo "📦 Checking backend dependencies..."
if [ ! -d "backend/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd backend
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install backend dependencies"
        cd ..
        exit 1
    fi
    cd ..
fi

echo ""
echo "✅ All dependencies installed"
echo ""
echo "🚀 Starting Frontend and Backend..."
echo ""
echo "📍 Frontend dashboard will open at http://localhost:3000"
echo "📍 Backend API running at http://localhost:5000"
echo ""
echo "💡 Tip: Press CTRL+C to stop both servers"
echo ""

# Start backend in background
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Give backend time to start
sleep 2

# Start frontend (this will block until stopped)
npm start

# Cleanup: kill backend when frontend is stopped
kill $BACKEND_PID 2>/dev/null
