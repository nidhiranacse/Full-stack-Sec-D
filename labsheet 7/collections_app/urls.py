from django.urls import path
from . import views

urlpatterns = [
    path('', views.collections_dashboard_view, name='collections-dashboard'),
    path('reset-data/', views.reset_data_view, name='reset-data'),
]
