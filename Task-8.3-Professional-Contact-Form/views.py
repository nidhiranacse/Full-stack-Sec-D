import logging

from django.contrib import messages
from django.shortcuts import redirect, render

logger = logging.getLogger(__name__)


def contact(request):
    if request.method == "POST":
        name = request.POST.get("name", "").strip()
        message = request.POST.get("message", "").strip()

        if name and message:
            logger.info(
                "Contact feedback received from %s: %s",
                name,
                message,
            )
            messages.success(
                request,
                "Your feedback has been submitted.",
            )
            return redirect("contact")

    return render(
        request,
        "contact.html",
        {"active_page": "contact"},
    )
