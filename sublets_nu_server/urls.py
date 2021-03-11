from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from .views import FrontendAppView

urlpatterns = [
    path("<str:path>", FrontendAppView.as_view()),
    path("housing/<str:path>", FrontendAppView.as_view()),
    path("", FrontendAppView.as_view()),
    path("admin/", admin.site.urls),
    # oauth
    path("api/auth/", include("drf_social_oauth2.urls", namespace="drf")),
    path("api-auth/", include("rest_framework.urls")),
    # accounts app endpoint root
    path("api/accounts/", include("accounts.urls")),
    # housing app endpoint root
    path("api/housing/", include("housing.urls")),
    # entry-point for react app
    # path("", FrontendAppView.as_view()),
]

# THIS IS NOT A GOOD PRACTICE FOR PRODUCTION : DEVELOPMENT SERVER ONLY
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
