from django.shortcuts import render


def index(request):
    students = [
        {"name": "Aman", "event": "Coding"},
        {"name": "Riya", "event": "Quiz"},
        {"name": "Karan", "event": "Hackathon"},
    ]

    sort = request.GET.get("sort", "name")

    if sort == "name_desc":
        students = sorted(
            students,
            key=lambda x: x["name"],
            reverse=True,
        )
    else:
        students = sorted(
            students,
            key=lambda x: x["name"],
        )

    return render(request, "students/index.html", {
        "students": students,
    })
