# Lab Sheet 06: Back-End Infrastructure Preparation & Shell Scripting Environments

## 🎯 Aim & Syllabus Reference
Demonstrate installation and workspace environment path mappings for Python runtimes, Django frameworks, and Visual Studio Code IDE setups.

---

## 📋 Tasks Implemented

### Task 6.1: Isolated Django Virtual Ecosystem & Formal Setup Configuration Script
- **Virtual Execution Ecosystem (`.venv`)**: Automated provisioning of isolated Python virtual environment clusters to eliminate dependency collisions with the global OS.
- **Piped Requirement Definitions (`requirements.txt`)**:
  - `Django>=5.0.0,<5.2.0`: Core Web Framework
  - `djangorestframework>=3.15.0`: REST API toolkit
  - `python-dotenv>=1.0.1`: 12-factor environment loader
  - `flake8`, `black`, `isort`: Code quality & PEP8 compliance
  - `pytest`, `pytest-django`: Test suite tooling
- **Formal Setup Configuration Scripts**:
  - `setup_environment.sh`: Unix/macOS automated provisioning script.
  - `setup_environment.ps1`: Windows PowerShell automated provisioning script.
- **Django Project Scaffold (`backend_core/`)**:
  - `manage.py`, `settings.py`, `urls.py`, `wsgi.py`, `asgi.py`.
  - Configured with environment variable interpolation and health check endpoint `/api/health/`.

### Task 6.2: VS Code Development Profile Directory & PEP8 Compliance Workflows
Configured inside `.vscode/`:
- **`settings.json`**:
  - Explicit Python runtime interpreter mapping to `${workspaceFolder}/.venv/Scripts/python.exe`.
  - Automated formatting on save (`editor.formatOnSave: true`).
  - Automated import organization (`source.organizeImports: always`).
  - PEP8 column boundary rulers at `[79, 88]`.
  - Trimming trailing whitespaces and enforcing final newlines.
- **`keybindings.json`**:
  - `Ctrl + Shift + I`: Format Python file using Black PEP8.
  - `Ctrl + Alt + L`: Trigger Flake8 PEP8 linting task.
  - `Ctrl + Alt + D`: Run Django development server.
  - `Ctrl + Alt + R`: Run automated deployment check task.
- **`tasks.json`**:
  - Visual Studio Code task runner definitions for formatters, linters, migrations, and server.
- **`extensions.json`**:
  - Extension recommendations for Python, Black, Flake8, and Django.

### Task 6.3: Automated Deployment Check File
Implemented in `deploy_check.py` (with runners `run_deploy_check.sh` and `run_deploy_check.ps1`):
1. **Systemic Runtime Pathways**:
   - Python version compatibility check (>= 3.10).
   - Virtual environment activation status (`sys.prefix` vs `sys.base_prefix`).
   - Binary interpreter pathways and OS architecture.
   - Filesystem read/write permissions check.
2. **Framework Dependencies**:
   - Programmatically tests importability and minimum version criteria for Django, DRF, python-dotenv, flake8, and black.
3. **Global Server Environment Keys**:
   - `DJANGO_SECRET_KEY`: Verifies presence, entropy, and warns if default insecure key is used.
   - `DJANGO_DEBUG`: Validates production setting (`False` required for deployment).
   - `DJANGO_ALLOWED_HOSTS`: Checks configured domain whitelist.
   - `DATABASE_URL`: Validates database connection path integrity.
4. **Structured Reporting**:
   - Outputs a terminal audit dashboard.
   - Exports a machine-readable JSON deployment audit: `deploy_report.json`.

---

## 🛠️ How to Execute

### 1. Automated Virtual Ecosystem Setup (Task 6.1)
On Windows (PowerShell):
```powershell
.\setup_environment.ps1
```
On Linux / macOS (Bash):
```bash
chmod +x setup_environment.sh
./setup_environment.sh
```

### 2. Activate Virtual Environment Manually
On Windows:
```powershell
.\.venv\Scripts\Activate.ps1
```
On Linux / macOS:
```bash
source .venv/bin/activate
```

### 3. Run Automated Deployment Checks (Task 6.3)
```bash
python deploy_check.py
```
*(Or via PowerShell: `.\run_deploy_check.ps1`, Bash: `./run_deploy_check.sh`)*

### 4. Run Django Development Server
```bash
python manage.py runserver
```
Visit health check endpoint at `http://127.0.0.1:8000/api/health/`.

---

## 📦 Directory Structure
```text
labsheet-6-backend-env/
├── requirements.txt             # Piped requirement definitions
├── .env.example                 # Global server environment key template
├── setup_environment.sh         # Task 6.1 Bash setup script
├── setup_environment.ps1        # Task 6.1 PowerShell setup script
├── deploy_check.py              # Task 6.3 Automated deployment validator
├── run_deploy_check.sh          # Runner for deploy_check
├── run_deploy_check.ps1         # Runner for deploy_check
├── README.md                    # Lab sheet documentation
├── .vscode/                     # Task 6.2 VS Code Development Profile
│   ├── settings.json            # Interpreter path mappings & PEP8 rules
│   ├── keybindings.json         # Custom user shortcuts
│   ├── tasks.json               # Syntax automation tasks
│   └── extensions.json          # Recommended workspace extensions
└── backend_core/                # Django project ecosystem
    ├── manage.py
    └── backend_core/
        ├── __init__.py
        ├── settings.py          # 12-factor PEP8 Django settings
        ├── urls.py              # URL routes & health check endpoint
        ├── wsgi.py
        └── asgi.py
```
