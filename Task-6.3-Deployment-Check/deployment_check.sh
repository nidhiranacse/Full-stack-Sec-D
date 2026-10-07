#!/bin/bash
# TASK 6.3 — Automated Deployment Check Script

set -e

echo "=== Deployment Environment Check ==="

command -v python3 >/dev/null 2>&1 || {
  echo "ERROR: Python 3 not found."
  exit 1
}

python3 --version

if [ -z "$VIRTUAL_ENV" ]; then
  echo "WARNING: Virtual environment is not active."
else
  echo "Virtual environment: $VIRTUAL_ENV"
fi

python3 -c "import django; print('Django:', django.get_version())"

if [ ! -f "manage.py" ]; then
  echo "ERROR: manage.py not found."
  exit 1
fi

python3 manage.py check

if [ -z "$DJANGO_SECRET_KEY" ]; then
  echo "WARNING: DJANGO_SECRET_KEY is not set."
else
  echo "DJANGO_SECRET_KEY: configured"
fi

if [ -z "$DJANGO_DEBUG" ]; then
  echo "WARNING: DJANGO_DEBUG is not set."
else
  echo "DJANGO_DEBUG: configured"
fi

echo "=== Deployment checks completed ==="
