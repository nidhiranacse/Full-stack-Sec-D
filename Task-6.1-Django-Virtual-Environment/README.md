# TASK 6.1 — Django Virtual Environment and Requirements Setup

## Objective
Create an isolated Python environment, install Django, save dependencies, create a Django project and run the development server.

## Windows PowerShell

Run:

```powershell
mkdir django_project
cd django_project
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install django
pip freeze > requirements.txt
django-admin startproject config .
python manage.py runserver
```

## Linux / macOS

```bash
mkdir django_project
cd django_project
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install django
pip freeze > requirements.txt
django-admin startproject config .
python manage.py runserver
```

The `.venv` directory isolates project dependencies and `requirements.txt` records installed packages for reproduction on another machine.
