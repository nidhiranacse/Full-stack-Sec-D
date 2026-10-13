"""
URL configuration for backend_core project.
"""

from django.contrib import admin
from django.urls import path
from django.http import JsonResponse


def health_check(request):
    """Simple API health check endpoint."""
    return JsonResponse({
        'status': 'healthy',
        'framework': 'Django 5.0',
        'module': 'Lab Sheet 06: Back-End Infrastructure Preparation'
    })


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', health_check, name='api-health'),
]
