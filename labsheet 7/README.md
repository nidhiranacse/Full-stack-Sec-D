# Lab Sheet 7: Django Model Collections, Sorting, & Template Fallback Filters

## 🎯 Aim & Syllabus Reference
Develop a complete Django application mapping model array collections out to unordered item matrices (Fruits) alongside ordered indices (Selected Event Students).

---

## 📋 Tasks Implemented

### Task 7.1: Robust Fallback Condition Logic Filters (`{% if %}`)
- Implemented defensive condition blocks in `templates/collections/index.html` (`{% if fruits %}` and `{% if students %}`).
- If collections arrive empty (or if a search yields zero matches), high-visibility warning alert boxes (`.alert-box.alert-warning`) are triggered automatically.
- Includes an interactive simulation toolbar allowing evaluators to simulate empty fruit matrices, empty student indices, or both simultaneously to test fallback rendering.

### Task 7.2 (Task 8.2 in PDF): Dynamic Table Sorting Tools
- Implemented dynamic table sorting tools inside template views and HTML headers:
  - Supports ordering records by:
    - Priority Rank (`registration_rank`)
    - Student ID (`student_id`)
    - Student Name (`name`)
    - Assigned Event (`event_name`)
    - Qualification Score (`score`)
  - Column headers toggle ascending (`asc`) and descending (`desc`) order via GET parameters (`?sort=name&order=asc`).
  - Active sorted column displays dynamic indicator arrows (`▲` / `▼`).

### Task 7.3 (Task 8.3 in PDF): Backend Search Processing Rules
- Implemented a unified search bar in `collections_app/views.py`:
  - Intercepts user query parameter `?q=...` via `request.GET.get('q')`.
  - Employs complex Django `Q` object lookups with `icontains` to filter across both unordered matrix items (name, category, season) and ordered indices (student name, ID, event name, status).
  - Subsets lists dynamically on the backend server before template compilation.

---

## 🛠️ How to Run Locally

1. Navigate to the project directory:
   ```bash
   cd labsheet-7-django-collections
   ```
2. Install Django (if not already installed):
   ```bash
   pip install -r requirements.txt
   ```
3. Apply database migrations:
   ```bash
   python manage.py makemigrations collections_app
   python manage.py migrate
   ```
4. Start the Django development server:
   ```bash
   python manage.py runserver
   ```
5. Open your browser at `http://127.0.0.1:8000/`.

---

## 📦 Directory Structure
```text
labsheet-7-django-collections/
├── manage.py
├── requirements.txt
├── README.md
├── lab7_project/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── collections_app/
│   ├── __init__.py
│   ├── models.py            # Fruit and EventStudent models
│   ├── views.py             # Dynamic sorting, search filters & fallback logic
│   └── urls.py
├── templates/
│   ├── base.html            # Shared master template blueprint
│   └── collections/
│       └── index.html       # Tasks 7.1, 7.2, 7.3 template
└── static/
    └── css/
        └── style.css        # Responsive styling & alert boxes
```
