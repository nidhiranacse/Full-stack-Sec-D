# TASK 6.1 — Django Virtual Environment and Requirements Setup
# Run these commands from PowerShell.

New-Item -ItemType Directory -Path django_project -Force
Set-Location django_project

python -m venv .venv
.\.venv\Scripts\Activate.ps1

python -m pip install --upgrade pip
pip install django
pip freeze > requirements.txt

django-admin startproject config .
python manage.py runserver
