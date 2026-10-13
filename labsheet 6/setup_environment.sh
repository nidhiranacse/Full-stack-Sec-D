#!/usr/bin/env bash
# ==============================================================================
# Task 6.1: Formal Setup Configuration Script (Bash)
# Sets up an isolated Django virtual execution ecosystem using Python venv
# and pipes requirement definitions into the isolated cluster.
# ==============================================================================

set -e

echo "=========================================================="
echo "🚀 Initializing Django Virtual Ecosystem Setup..."
echo "=========================================================="

# 1. Detect Python runtime
if command -v python3 &>/dev/null; then
    PYTHON_CMD="python3"
elif command -v python &>/dev/null; then
    PYTHON_CMD="python"
else
    echo "❌ Error: Python runtime not detected in system PATH."
    exit 1
fi

echo "✓ Using Python runtime: $($PYTHON_CMD --version)"

# 2. Virtual Environment Cluster Directory
VENV_DIR=".venv"

if [ -d "$VENV_DIR" ]; then
    echo "ℹ️  Existing virtual environment detected at $VENV_DIR"
else
    echo "📦 Creating isolated virtual execution ecosystem: $VENV_DIR..."
    $PYTHON_CMD -m venv "$VENV_DIR"
    echo "✓ Virtual environment successfully provisioned."
fi

# 3. Activate Virtual Environment
echo "🔄 Activating virtual environment..."
source "$VENV_DIR/bin/activate"

# 4. Upgrade pip package manager
echo "⬆️  Upgrading pip to latest version..."
pip install --upgrade pip

# 5. Pipe requirements.txt into the environment
echo "📥 Installing framework dependencies from requirements.txt..."
pip install -r requirements.txt

# 6. Setup .env file from template if not present
if [ ! -f ".env" ]; then
    echo "📄 Creating local .env from .env.example..."
    cp .env.example .env
fi

# 7. Apply Django database migrations
echo "🗄️  Running initial database migrations..."
python manage.py migrate

echo "=========================================================="
echo "✅ Environment setup complete!"
echo "To activate manually run: source .venv/bin/activate"
echo "To start development server: python manage.py runserver"
echo "=========================================================="
