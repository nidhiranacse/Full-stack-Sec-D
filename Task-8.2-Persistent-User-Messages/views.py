from django.contrib import messages
from django.shortcuts import redirect, render


def home(request):
    return render(request, "home.html")


def about(request):
    return render(request, "about.html")


def contact(request):
    if request.method == "POST":
        messages.success(request, "Your feedback has been submitted.")
        return redirect("contact")

    return render(request, "contact.html")
