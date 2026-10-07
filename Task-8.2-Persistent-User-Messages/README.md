# TASK 8.2 — Persistent User Message Feedback

The shared `base.html` contains the Django messages block:

```django
{% if messages %}
    {% for message in messages %}
        <div class="message">{{ message }}</div>
    {% endfor %}
{% endif %}
```

The settings additions enable `django.contrib.messages` and `MessageMiddleware`.
