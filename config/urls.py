"""URL configuration for Nexulon AI."""

from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView


def home(_request):
    return JsonResponse(
        {
            "name": "Nexulon AI API",
            "status": "running",
            "admin": "/admin/",
            "docs": "/api/docs/",
            "schema": "/api/schema/",
        }
    )


def health(_request):
    return JsonResponse({"status": "ok"})


urlpatterns = [
    path("", home, name="home"),
    path("health/", health, name="health"),
    path("admin/", admin.site.urls),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/v1/", include("apps.ai.urls")),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
]
