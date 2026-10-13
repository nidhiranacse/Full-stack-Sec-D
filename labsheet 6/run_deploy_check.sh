#!/usr/bin/env bash
# Runner for Task 6.3 Automated Deployment Check
set -e

if [ -f ".venv/bin/activate" ]; then
    source .venv/bin/activate
fi

python deploy_check.py
