from django.urls import path, include
from django.urls import path, include, re_path
from .views import AccountDetail, CurrentUser

urlpatterns = [
    path("detail/<int:id>", AccountDetail.as_view()),
    path("current_user", CurrentUser.as_view()),
]
