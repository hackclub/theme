#!/bin/bash

# BioX Theme - One-Click Publish Script
# Usage: ./publish.sh

set -e

echo "🚀 BioX Theme Publisher"
echo "======================="

# Check if npm is logged in
if ! npm whoami &> /dev/null; then
    echo "❌ You are not logged into npm."
    echo "   Please run: npm login"
    exit 1
fi

CURRENT_USER=$(npm whoami)
echo "✓ Logged in as: $CURRENT_USER"

# Build all packages
echo ""
echo "📦 Building packages..."
yarn prepare

# Run tests
echo ""
echo "🧪 Running tests..."
yarn test

# Publish theme package
echo ""
echo "📤 Publishing @bio-x/theme..."
cd packages/theme
npm publish --access public
cd ../..

echo ""
echo "✅ Package published successfully!"
echo ""
echo "Package published:"
echo "  - @bio-x/theme"
echo ""
echo "Install with: npm i @bio-x/theme"
