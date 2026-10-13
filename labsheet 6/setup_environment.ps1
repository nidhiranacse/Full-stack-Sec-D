# ==============================================================================
# Task 6.1: Formal Setup Configuration Script (PowerShell for Windows)
# Sets up an isolated Django virtual execution ecosystem using Python venv
# and pipes requirement definitions into the isolated cluster.
# ==============================================================================

$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "🚀 Initializing Django Virtual Ecosystem Setup (Windows)..." -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Detect Python runtime
$pythonCmd = (Get-Command python -ErrorAction SilentlyContinue)
if (-not $pythonCmd) {
    Write-Host "❌ Error: Python runtime not detected in system PATH." -ForegroundColor Red
    Exit 1
}

$pyVersion = python --version
Write-Host "✓ Detected Python runtime: $pyVersion" -ForegroundColor Green

# 2. Virtual Environment Directory
$venvDir = ".venv"
if (Test-Path $venvDir) {
    Write-Host "ℹ️  Existing virtual environment detected at $venvDir" -ForegroundColor Yellow
} else {
    Write-Host "📦 Creating isolated virtual execution ecosystem: $venvDir..." -ForegroundColor Yellow
    python -m venv $venvDir
    Write-Host "✓ Virtual environment successfully provisioned." -ForegroundColor Green
}

# 3. Activation Script Path
$activateScript = Join-Path $venvDir "Scripts\Activate.ps1"
if (Test-Path $activateScript) {
    Write-Host "🔄 Activating virtual environment..." -ForegroundColor Yellow
    & $activateScript
}

# 4. Upgrade pip
Write-Host "⬆️  Upgrading pip package manager..." -ForegroundColor Yellow
python -m pip install --upgrade pip

# 5. Pipe requirements.txt into the environment
Write-Host "📥 Installing framework dependencies from requirements.txt..." -ForegroundColor Yellow
pip install -r requirements.txt

# 6. Copy .env template if not present
if (-not (Test-Path ".env")) {
    Write-Host "📄 Creating local .env from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
}

# 7. Apply Django database migrations
Write-Host "🗄️  Running initial database migrations..." -ForegroundColor Yellow
python manage.py migrate

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "✅ Environment setup complete!" -ForegroundColor Green
Write-Host "To activate manually run: .\.venv\Scripts\Activate.ps1" -ForegroundColor Cyan
Write-Host "To start development server: python manage.py runserver" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Green
