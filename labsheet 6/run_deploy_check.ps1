# Runner for Task 6.3 Automated Deployment Check (PowerShell)
$venvActivate = Join-Path ".venv" "Scripts\Activate.ps1"
if (Test-Path $venvActivate) {
    & $venvActivate
}

python deploy_check.py
