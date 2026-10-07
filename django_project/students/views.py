from django.shortcuts import render

def index(request):
    fruits = ["Apple", "Banana", "Mango", "Orange"]
    students = [
        {"name": "Aman", "event": "Coding"},
        {"name": "Riya", "event": "Quiz"},
        {"name": "Karan", "event": "Hackathon"},
        {"name": "Neha", "event": "Coding"},
        {"name": "Rahul", "event": "Quiz"},
    ]

    query = request.GET.get("q", "").strip()
    sort = request.GET.get("sort", "name")

    if query:
        students = [
            s for s in students
            if query.lower() in s["name"].lower()
        ]

    if sort == "name_desc":
        students = sorted(students, key=lambda x: x["name"], reverse=True)
    else:
        students = sorted(students, key=lambda x: x["name"])

    return render(request, "students/index.html", {
        "fruits": fruits,
        "students": students,
        "query": query,
    })
