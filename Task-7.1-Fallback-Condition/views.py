from django.shortcuts import render


def index(request):
    fruits = ["Apple", "Banana", "Mango", "Orange"]

    students = [
        {"name": "Aman", "event": "Coding"},
        {"name": "Riya", "event": "Quiz"},
        {"name": "Karan", "event": "Hackathon"},
    ]

    return render(request, "students/index.html", {
        "fruits": fruits,
        "students": students,
    })
