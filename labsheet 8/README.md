# Lab Sheet 08: Template Inheritance Blueprints & Modular UI Engineering

## 🎯 Aim & Syllabus Reference
Develop a core master template layout blueprint file containing shared menus and block overrides; inherit properties down across specialized views (Home, About Us, Contact Us).

---

## 📋 Tasks Implemented

### Task 8.1: Programmatic Navigation Markers with Active Utility Highlights
- **Master Blueprint Integration (`templates/base.html`)**:
  - Contains global navigation menu anchors evaluating dynamic markers:
    ```html
    <a href="{% url 'home' %}" class="nav-link {% if active_nav == 'home' %}nav-link-active{% endif %}">
    ```
- **Context Delivery**:
  - Each specialized child view controller (`home_view`, `about_view`, `contact_view`) delivers an explicit `active_nav` marker string in its context.
  - Generates structural active utility CSS styling (`.nav-link-active`) with primary brand highlight, border outline, and subtle background glow.

### Task 8.2: Persistent User Message Feedback Notification Box
- **Master Blueprint Hook (`{% block messages_hook %}`)**:
  - Centrally anchored inside `templates/base.html` directly between navigation and page content.
  - Automatically iterates over Django's `django.contrib.messages` framework across every specialized child view.
  - Supports contextual alert styling: `success` (green), `error` (red), `warning` (amber), and `info` (blue).
  - Features dynamic close dismissals (`onclick="this.parentElement.remove()"`).

### Task 8.3: Professional Contact Us Form with Server Log Verification
- **Form Architecture (`portal_app/forms.py`)**:
  - Strict input validation: Full Name, RFC Email, Inquiry Department, Subject Line, and sanitized Message Body (minimum 10 characters).
  - CSRF security protection enabled.
- **Server Logging Pathway (`portal_app/views.py`)**:
  - Upon valid form submittal, parameters are logged using Python's `logging` system:
    ```python
    logger.info(
        f"[SYSTEM AUDIT - USER FEEDBACK RECEIVED] "
        f"Client: '{full_name}' <{email}> | "
        f"Dept: {department.upper()} | "
        f"Subject: '{subject}' | "
        f"Payload: \"{message_text}\""
    )
    ```
  - Configured in `lab8_project/settings.py` to stream directly to both console stdout and `server.log`.
  - Dispatches `messages.success()` verifying registration to the user through Task 8.2's inherited feedback box.

---

## 🛠️ How to Run Locally

1. Navigate to the project directory:
   ```bash
   cd labsheet-8-template-inheritance
   ```
2. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```
3. Run initial migrations:
   ```bash
   python manage.py migrate
   ```
4. Start development server:
   ```bash
   python manage.py runserver 8001
   ```
5. Open browser at `http://127.0.0.1:8001/`.

---

## 🔍 How to Verify Task 8.3 Server Logs

1. Open `http://127.0.0.1:8001/contact/`.
2. Fill out the form with your details and click **Forward Verified Feedback to Server Logs**.
3. View the terminal output or inspect `server.log`:
   ```bash
   cat server.log
   ```
   **Sample Output:**
   ```text
   [2026-09-29 14:30:00,123] [INFO] [portal_app.contact] - [SYSTEM AUDIT - USER FEEDBACK RECEIVED] Client: 'Kartik Sharma' <kartik@campus.edu> | Dept: TECHNICAL SUPPORT & DEVELOPMENT | Subject: 'Template Integration' | Payload: "Verified feedback transmission successful."
   ```

---

## 📦 Directory Structure
```text
labsheet-8-template-inheritance/
├── manage.py
├── requirements.txt
├── server.log                   # Task 8.3 Server log sink
├── README.md
├── lab8_project/
│   ├── __init__.py
│   ├── settings.py              # Server logging & messages configuration
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── portal_app/
│   ├── __init__.py
│   ├── forms.py                 # Task 8.3 ContactForm
│   ├── views.py                 # Task 8.1 markers, 8.2 messages, 8.3 logger
│   └── urls.py
├── templates/
│   ├── base.html                # Master blueprint, 8.1 nav & 8.2 message hook
│   └── portal/
│       ├── home.html            # Child View: Home
│       ├── about.html           # Child View: About Us
│       └── contact.html         # Child View: Contact Us (Task 8.3)
└── static/
    └── css/
        └── style.css            # Active nav utility highlights & alert cards
```
