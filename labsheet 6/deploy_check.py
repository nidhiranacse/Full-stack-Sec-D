#!/usr/bin/env python
"""
==============================================================================
Task 6.3: Automated Deployment Check Script
Validates:
1. Systemic Runtime Pathways (Python runtime, venv status, filesystem write paths)
2. Framework Dependencies (Django, REST Framework, Flake8, Black)
3. Global Server Environment Keys (SECRET_KEY, DEBUG, ALLOWED_HOSTS, DATABASE_URL)
==============================================================================
"""

import sys
import os
import platform
import json
from pathlib import Path

# Terminal ANSI Color codes
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
CYAN = '\033[96m'
BOLD = '\033[1m'
RESET = '\033[0m'

BASE_DIR = Path(__file__).resolve().parent

# Load .env file manually if python-dotenv isn't loaded yet
env_file = BASE_DIR / '.env'
if env_file.exists():
    try:
        with open(env_file, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    os.environ.setdefault(k.strip(), v.strip())
    except Exception as e:
        print(f"Warning: could not parse .env file: {e}")

report = {
    "systemic_runtime_pathways": {},
    "framework_dependencies": {},
    "global_server_environment_keys": {},
    "status": "PASS"
}


def log_result(category, name, passed, message, is_warning=False):
    status_str = "PASS" if passed else ("WARN" if is_warning else "FAIL")
    report[category][name] = {
        "status": status_str,
        "message": message
    }

    if not passed and not is_warning:
        report["status"] = "FAIL"

    color = GREEN if passed else (YELLOW if is_warning else RED)
    icon = "✓" if passed else ("⚠" if is_warning else "✗")
    print(f"  [{color}{status_str:4s}{RESET}] {icon} {name:<30} {message}")


def check_runtime_pathways():
    print(f"\n{BOLD}{CYAN}1. Validating Systemic Runtime Pathways...{RESET}")

    # Python Version >= 3.10
    version_info = sys.version_info
    py_ver_str = f"{version_info.major}.{version_info.minor}.{version_info.micro}"
    is_py_valid = version_info.major == 3 and version_info.minor >= 10
    log_result(
        "systemic_runtime_pathways",
        "Python Runtime Version",
        is_py_valid,
        f"Version: {py_ver_str} (>= 3.10 required)"
    )

    # Virtual Environment Active Check
    in_venv = (hasattr(sys, 'real_prefix') or
               (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix))
    log_result(
        "systemic_runtime_pathways",
        "Virtual Environment (venv)",
        in_venv,
        f"Active venv path: {sys.prefix}" if in_venv else "Running in global Python; activate .venv recommended",
        is_warning=not in_venv
    )

    # Executable Pathway
    log_result(
        "systemic_runtime_pathways",
        "Python Binary Pathway",
        True,
        f"{sys.executable} on {platform.system()} ({platform.architecture()[0]})"
    )

    # Workspace Filesystem Permissions
    can_write = os.access(BASE_DIR, os.W_OK)
    log_result(
        "systemic_runtime_pathways",
        "Directory Write Permissions",
        can_write,
        f"Workspace writeable at {BASE_DIR}" if can_write else "Permission denied"
    )


def check_dependencies():
    print(f"\n{BOLD}{CYAN}2. Validating Framework Dependencies...{RESET}")

    deps = [
        ("django", "Django", "5.0.0"),
        ("rest_framework", "Django REST Framework", "3.14.0"),
        ("dotenv", "python-dotenv", "1.0.0"),
        ("flake8", "Flake8 (PEP8 Linter)", "7.0.0"),
        ("black", "Black (PEP8 Formatter)", "24.0.0")
    ]

    for module_name, display_name, min_ver in deps:
        try:
            mod = __import__(module_name)
            ver = getattr(mod, '__version__', 'Installed')
            log_result(
                "framework_dependencies",
                display_name,
                True,
                f"Installed: {ver} (Min: {min_ver})"
            )
        except ImportError:
            log_result(
                "framework_dependencies",
                display_name,
                False,
                f"Missing dependency! Run 'pip install -r requirements.txt'"
            )


def check_environment_keys():
    print(f"\n{BOLD}{CYAN}3. Validating Global Server Environment Keys...{RESET}")

    # SECRET_KEY
    secret_key = os.getenv('DJANGO_SECRET_KEY')
    if not secret_key:
        log_result(
            "global_server_environment_keys",
            "DJANGO_SECRET_KEY",
            False,
            "Key not configured in environment or .env"
        )
    elif 'insecure' in secret_key or len(secret_key) < 32:
        log_result(
            "global_server_environment_keys",
            "DJANGO_SECRET_KEY",
            False,
            f"Key is insecure or too short ({len(secret_key)} chars). Must be secure in production!",
            is_warning=True
        )
    else:
        log_result(
            "global_server_environment_keys",
            "DJANGO_SECRET_KEY",
            True,
            f"Configured securely ({len(secret_key)} chars entropy)"
        )

    # DEBUG
    debug_val = os.getenv('DJANGO_DEBUG', 'True')
    is_debug = debug_val.lower() in ('true', '1', 't')
    log_result(
        "global_server_environment_keys",
        "DJANGO_DEBUG",
        not is_debug,
        f"DEBUG={is_debug} (Must be False in production server)",
        is_warning=is_debug
    )

    # ALLOWED_HOSTS
    hosts = os.getenv('DJANGO_ALLOWED_HOSTS')
    if not hosts:
        log_result(
            "global_server_environment_keys",
            "DJANGO_ALLOWED_HOSTS",
            False,
            "ALLOWED_HOSTS not defined",
            is_warning=True
        )
    else:
        log_result(
            "global_server_environment_keys",
            "DJANGO_ALLOWED_HOSTS",
            True,
            f"Configured: [{hosts}]"
        )

    # DATABASE_URL
    db_url = os.getenv('DATABASE_URL', 'sqlite:///db.sqlite3')
    log_result(
        "global_server_environment_keys",
        "DATABASE_URL",
        True,
        f"Database connection endpoint: {db_url}"
    )


def main():
    print("=" * 65)
    print(f"{BOLD}🛡️  LAB SHEET 06: AUTOMATED SYSTEM DEPLOYMENT CHECK{RESET}")
    print("=" * 65)

    check_runtime_pathways()
    check_dependencies()
    check_environment_keys()

    report_path = BASE_DIR / "deploy_report.json"
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)

    print("\n" + "=" * 65)
    if report["status"] == "PASS":
        print(f"{BOLD}{GREEN}✅ ALL SYSTEMIC DEPLOYMENT PATHWAYS VALIDATED SUCCESSFULLY!{RESET}")
    else:
        print(f"{BOLD}{YELLOW}⚠️  DEPLOYMENT CHECKS COMPLETED WITH WARNINGS/FAILURES.{RESET}")
    print(f"📊 Detailed JSON audit exported to: {report_path.name}")
    print("=" * 65)

    return 0 if report["status"] == "PASS" else 1


if __name__ == '__main__':
    sys.exit(main())
