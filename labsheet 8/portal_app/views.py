import logging
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ContactForm

# Task 8.3: Specialized Logger instance for system feedback verification
logger = logging.getLogger('portal_app.contact')


def home_view(request):
    """
    Specialized Home page view.
    Task 8.1: Passes custom programmatic marker 'active_nav': 'home'.
    """
    context = {
        'page_title': 'Enterprise Portal Home',
        'active_nav': 'home',  # Task 8.1: Programmatic Marker for Active Highlight
    }
    return render(request, 'portal/home.html', context)


def about_view(request):
    """
    Specialized About Us page view.
    Task 8.1: Passes custom programmatic marker 'active_nav': 'about'.
    """
    context = {
        'page_title': 'About Our Engineering Team',
        'active_nav': 'about',  # Task 8.1: Programmatic Marker for Active Highlight
    }
    return render(request, 'portal/about.html', context)


def contact_view(request):
    """
    Specialized Contact Us page view.
    Task 8.1: Passes custom programmatic marker 'active_nav': 'contact'.
    Task 8.2: Dispatches user feedback messages across inherited template hooks.
    Task 8.3: Forwards verified feedback text parameters directly into server logs.
    """
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Verified clean parameters
            full_name = form.cleaned_data['full_name']
            email = form.cleaned_data['email']
            department = form.cleaned_data['department']
            subject = form.cleaned_data['subject']
            message_text = form.cleaned_data['message']

            # Task 8.3: Forward verified feedback text parameters directly into server logs
            logger.info(
                f"[SYSTEM AUDIT - USER FEEDBACK RECEIVED] "
                f"Client: '{full_name}' <{email}> | "
                f"Dept: {department.upper()} | "
                f"Subject: '{subject}' | "
                f"Payload: \"{message_text}\""
            )

            # Task 8.2: Integrate user message feedback notification
            messages.success(
                request,
                f"Thank you, {full_name}! Your feedback has been verified and registered into system logs."
            )

            return redirect('contact')
        else:
            messages.error(
                request,
                "Submission error: Please review the highlighted form fields and try again."
            )
    else:
        form = ContactForm()

    context = {
        'page_title': 'Contact Us & Feedback Verification',
        'form': form,
        'active_nav': 'contact',  # Task 8.1: Programmatic Marker for Active Highlight
    }
    return render(request, 'portal/contact.html', context)
