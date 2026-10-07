from django.shortcuts import render


def home(request):
    return render(request, "home.html", {"active_page": "home"})


def about(request):
    return render(request, "about.html", {"active_page": "about"})


def contact(request):
    return render(request, "contact.html", {"active_page": "contact"})
