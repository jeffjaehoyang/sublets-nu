from django.urls import path, include
from django.urls import path, include, re_path
from .views import (
    HousingList,
    MyHousingList,
    HousingCreate,
    HousingDelete,
    HousingUpdate,
    HousingDetail,
    HousingRoomTypeChoices,
    HousingFilter,
    HousingSaved,
    AmenityList,
)

urlpatterns = [
    path("list/", HousingList.as_view()),
    path("my_list/", MyHousingList.as_view()),
    path("create/", HousingCreate.as_view()),
    path("delete/<int:id>", HousingDelete.as_view()),
    path("update/<int:id>", HousingUpdate.as_view()),
    path("detail/<int:id>", HousingDetail.as_view()),
    path("roomtypes/", HousingRoomTypeChoices.as_view()),
    path("saved/", HousingSaved.as_view()),
    path("filter/", HousingFilter.as_view()),
    path("amenities/", AmenityList.as_view()),
]
