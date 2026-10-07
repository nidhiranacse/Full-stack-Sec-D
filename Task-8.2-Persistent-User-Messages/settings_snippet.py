# TASK 8.2 — settings.py additions

INSTALLED_APPS = [
    # ...
    "django.contrib.messages",
]

MIDDLEWARE = [
    # ...
    "django.contrib.messages.middleware.MessageMiddleware",
]
