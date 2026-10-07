# TASK 6.3 — Automated Deployment Check Script

The `deployment_check.sh` script verifies:

1. Python 3 is available.
2. The virtual environment status is reported.
3. Django is installed and importable.
4. `manage.py` exists.
5. `python3 manage.py check` passes.
6. `DJANGO_SECRET_KEY` is configured.
7. `DJANGO_DEBUG` is configured.

Run:

```bash
chmod +x deployment_check.sh
./deployment_check.sh
```

The script uses `set -e` so critical command failures stop the check immediately. Secret values are never printed.
