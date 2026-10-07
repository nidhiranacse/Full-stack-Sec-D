from django.shortcuts import render


def index(request):
    students = [
        {"name": "Aman", "event": "Coding"},
        {"name": "Riya", "event": "Quiz"},
        {"name": "Karan", "event": "Hackathon"},
        {"name": "Neha", "event": "Coding"},
        {"name": "Rahul", "event": "Quiz"},
    ]

    query = request.GET.get("q", "").strip()

    if query:
        students = [
            student
            for student in students
            if query.lower() in student["name"].lower()
        ]

    students = sorted(students, key=lambda x: x["name"])

    return render(request, "students/index.html", {
        "students": students,
        "query": query,
    })
