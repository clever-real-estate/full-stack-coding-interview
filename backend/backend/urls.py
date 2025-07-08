"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("photo_gallery.urls")),
    path("api/auth/", include("authentication.urls")),
    path("api/health/", include("health_check.urls")),
    # Serve robots.txt from static
    path(
        "favicon.ico",
        RedirectView.as_view(url=settings.STATIC_URL + "favicon.svg", permanent=True),
    ),
    path(
        "robots.txt",
        RedirectView.as_view(url=settings.STATIC_URL + "robots.txt", permanent=True),
    ),
]
