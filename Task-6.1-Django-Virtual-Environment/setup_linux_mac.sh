#!/bin/bash
# TASK 6.1 — Django Virtual Environment and Requirements Setup

mkdir -p django_project
cd django_project

python3 -m venv .venv
source .venv/bin/activate

python -m pip install --upgrade pip
pip install django
pip freeze > requirements.txt

django-admin startproject config .
python manage.py runserver
