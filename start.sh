#!/bin/bash
# Smart Bridge Digital Twin - Quick Start Script

echo "🌉 Smart Bridge Digital Twin - Quick Start"
echo "==========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 14+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
    echo ""
    echo "🚀 Starting development server..."
    echo "📍 The dashboard will open at http://localhost:3000"
    echo ""
    npm start
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
