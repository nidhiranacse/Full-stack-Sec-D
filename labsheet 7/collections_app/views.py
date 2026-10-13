from django.shortcuts import render, redirect
from django.db.models import Q
from .models import Fruit, EventStudent

# Default seed data in case database is empty
INITIAL_FRUITS = [
    {"name": "Honeycrisp Apple", "category": "Pome", "season": "Autumn", "nutritional_benefit": "Rich in Dietary Fiber & Vitamin C", "in_stock": True},
    {"name": "Alphonso Mango", "category": "Tropical", "season": "Summer", "nutritional_benefit": "High in Vitamin A, Beta-Carotene & Antioxidants", "in_stock": True},
    {"name": "Wild Blueberries", "category": "Berries", "season": "Summer", "nutritional_benefit": "Anthocyanins & Cognitive Health Support", "in_stock": True},
    {"name": "Valencia Orange", "category": "Citrus", "season": "Winter / Spring", "nutritional_benefit": "Immune System Defense & Vitamin C Boost", "in_stock": False},
    {"name": "Golden Kiwi", "category": "Exotic", "season": "Autumn / Winter", "nutritional_benefit": "Potassium, Folate & Digestive Enzymes", "in_stock": True},
    {"name": "Hass Avocado", "category": "Berry / Drupe", "season": "All-Year", "nutritional_benefit": "Healthy Monounsaturated Fats & Vitamin E", "in_stock": True},
    {"name": "Pomegranate", "category": "Aril", "season": "Winter", "nutritional_benefit": "Punicalagins & Powerful Heart Antioxidants", "in_stock": False},
    {"name": "Cavendish Banana", "category": "Tropical", "season": "All-Year", "nutritional_benefit": "Quick Carbohydrate Energy & Vitamin B6", "in_stock": True},
]

INITIAL_STUDENTS = [
    {"student_id": "STU-101", "name": "Aarav Sharma", "email": "aarav.sharma@campus.edu", "event_name": "Full-Stack WebCon 2026", "registration_rank": 1, "score": 98.50, "status": "Confirmed"},
    {"student_id": "STU-102", "name": "Bhavna Patel", "email": "bhavna.p@campus.edu", "event_name": "Hackathon Sprint Pro", "registration_rank": 2, "score": 95.00, "status": "Confirmed"},
    {"student_id": "STU-103", "name": "Chirag Singhania", "email": "chirag.s@campus.edu", "event_name": "AI & Cloud Summit", "registration_rank": 3, "score": 92.75, "status": "Confirmed"},
    {"student_id": "STU-104", "name": "Deepika Rao", "email": "deepika.rao@campus.edu", "event_name": "Full-Stack WebCon 2026", "registration_rank": 4, "score": 89.20, "status": "Shortlisted"},
    {"student_id": "STU-105", "name": "Eshan Verma", "email": "eshan.v@campus.edu", "event_name": "Cyber Defense Challenge", "registration_rank": 5, "score": 86.40, "status": "Confirmed"},
    {"student_id": "STU-106", "name": "Fatima Zahra", "email": "fatima.z@campus.edu", "event_name": "Hackathon Sprint Pro", "registration_rank": 6, "score": 84.10, "status": "Pending"},
    {"student_id": "STU-107", "name": "Gaurav Malhotra", "email": "gaurav.m@campus.edu", "event_name": "AI & Cloud Summit", "registration_rank": 7, "score": 81.50, "status": "Confirmed"},
]


def ensure_data_seeded():
    """Populates database with default records if currently empty."""
    if Fruit.objects.count() == 0:
        Fruit.objects.bulk_create([Fruit(**f) for f in INITIAL_FRUITS])
    if EventStudent.objects.count() == 0:
        EventStudent.objects.bulk_create([EventStudent(**s) for s in INITIAL_STUDENTS])


def collections_dashboard_view(request):
    """
    Main dashboard demonstrating:
    - Task 7.1: Fallback condition logic ({% if %}) alerts when matrices are empty
    - Task 7.2 (8.2): Dynamic table sorting tools
    - Task 7.3 (8.3): User search input form that subsets lists via back-end request processing
    """
    ensure_data_seeded()

    # Read Query Parameters from GET Request
    search_query = request.GET.get('q', '').strip()
    sort_field = request.GET.get('sort', 'registration_rank')
    sort_order = request.GET.get('order', 'asc')
    simulate_empty = request.GET.get('simulate_empty', '')

    # Valid sort fields for Event Students
    allowed_sort_fields = ['registration_rank', 'name', 'score', 'event_name', 'student_id']
    if sort_field not in allowed_sort_fields:
        sort_field = 'registration_rank'

    order_prefix = '-' if sort_order == 'desc' else ''
    order_by_clause = f"{order_prefix}{sort_field}"

    # Querysets
    fruits_qs = Fruit.objects.all()
    students_qs = EventStudent.objects.all()

    # Task 7.3: Dynamic backend search processing rules
    if search_query:
        fruits_qs = fruits_qs.filter(
            Q(name__icontains=search_query) |
            Q(category__icontains=search_query) |
            Q(season__icontains=search_query)
        )
        students_qs = students_qs.filter(
            Q(name__icontains=search_query) |
            Q(student_id__icontains=search_query) |
            Q(event_name__icontains=search_query) |
            Q(status__icontains=search_query)
        )

    # Task 7.2: Dynamic sorting application
    students_qs = students_qs.order_by(order_by_clause)

    # Convert to lists for rendering
    fruits_list = list(fruits_qs)
    students_list = list(students_qs)

    # Task 7.1: Simulation triggers to verify fallback condition logic alerts
    if simulate_empty in ('fruits', 'all'):
        fruits_list = []
    if simulate_empty in ('students', 'all'):
        students_list = []

    context = {
        'fruits': fruits_list,
        'students': students_list,
        'total_fruits': len(fruits_list),
        'total_students': len(students_list),
        'search_query': search_query,
        'current_sort': sort_field,
        'current_order': sort_order,
        'next_order': 'desc' if sort_order == 'asc' else 'asc',
        'simulate_empty': simulate_empty,
    }

    return render(request, 'collections/index.html', context)


def reset_data_view(request):
    """Utility endpoint to flush and reseed default records."""
    Fruit.objects.all().delete()
    EventStudent.objects.all().delete()
    ensure_data_seeded()
    return redirect('collections-dashboard')
