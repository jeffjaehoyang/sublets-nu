from rest_framework import generics
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Housing, HousingImage, Amenity
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework import viewsets
from rest_framework.settings import api_settings
import datetime


from housing.serializers import (
    HousingSerializer,
    HousingDetailSerializer,
    HousingCreateSerializer,
    HousingImageSerializer,
    AmenitySerializer,
)
from .utils import (
    url_builder,
    calculate_area,
    calculate_distance_metrics,
    update_distance_metrics,
    bytes_to_megabytes,
)
import json


class HousingList(generics.ListAPIView):
    queryset = Housing.objects.order_by("-upload_date").filter(
        is_published=True
    )
    serializer_class = HousingSerializer
    permission_classes = (permissions.AllowAny,)
    pagination_class = None


class MyHousingList(generics.ListAPIView):
    # default permission class : permssions.isAuthorized
    serializer_class = HousingSerializer
    pagination_class = None

    def get_queryset(self):
        """
        This view should return a list of all the listings
        for the currently authenticated user.
        """
        user = self.request.user
        return Housing.objects.order_by("-upload_date").filter(uploader=user)


class HousingCreate(generics.CreateAPIView):
    # default permission class : permssions.isAuthorized
    queryset = Housing.objects.all()
    serializer_class = HousingCreateSerializer
    parser_classes = (FormParser, MultiPartParser)

    def truncate(self, n, decimals=0):
        multiplier = 10 ** decimals
        return int(n * multiplier) / multiplier

    def get_serializer(self, *args, **kwargs):
        # leave the following two lines alone
        serializer_class = self.get_serializer_class()
        kwargs["context"] = self.get_serializer_context()
        # custom logic for intercepting and tweaking request data can be implemented below
        temp_data = self.request.data.copy()
        temp_data["uploader"] = self.request.user.pk
        housingpost_area = calculate_area(temp_data)
        temp_data["campus_area"] = housingpost_area
        temp_data["is_published"] = True
        duration_map = calculate_distance_metrics(temp_data, target="duration")
        distance_map = calculate_distance_metrics(temp_data, target="distance")
        update_distance_metrics(temp_data, duration_map, distance_map)
        temp_data["latitude"] = self.truncate(temp_data["latitude"], 10)
        temp_data["longitude"] = self.truncate(temp_data["longitude"], 10)
        kwargs["data"] = temp_data

        return serializer_class(*args, **kwargs)

    def perform_create(self, serializer):
        """
        creates HousingImage instances on upload
        adds Amenities to Housing instance
        """
        housing_instance = serializer.save()
        amenities = self.request.data["amenities"].split(",")
        for amenity in amenities:
            housing_instance.amenities.add(int(amenity))
        for name, img in self.request.FILES.items():
            HousingImage.objects.create(housing=housing_instance, img=img)


class HousingUpdate(generics.UpdateAPIView):
    # default permission class : permssions.isAuthorized
    queryset = Housing.objects.all()
    serializer_class = HousingCreateSerializer
    parser_classes = (FormParser, MultiPartParser)
    lookup_field = "id"

    def truncate(self, n, decimals=0):
        multiplier = 10 ** decimals
        return int(n * multiplier) / multiplier

    def get_serializer(self, *args, **kwargs):
        # leave the following two lines alone
        serializer_class = self.get_serializer_class()
        kwargs["context"] = self.get_serializer_context()
        # custom logic for intercepting and tweaking request data can be implemented below
        temp_data = self.request.data.copy()
        temp_data["uploader"] = self.request.user.pk
        housingpost_area = calculate_area(temp_data)
        temp_data["campus_area"] = housingpost_area
        temp_data["is_published"] = True
        duration_map = calculate_distance_metrics(temp_data, target="duration")
        distance_map = calculate_distance_metrics(temp_data, target="distance")
        update_distance_metrics(temp_data, duration_map, distance_map)
        temp_data["latitude"] = self.truncate(temp_data["latitude"], 10)
        temp_data["longitude"] = self.truncate(temp_data["longitude"], 10)
        kwargs["data"] = temp_data

        return serializer_class(*args, **kwargs)

    def perform_update(self, serializer):
        """
        creates HousingImage instances on upload
        adds Amenities to Housing instance
        """
        print("DATA::: ", self.request.data)
        housing_instance = serializer.save()
        amenities = self.request.data["amenities"].split(",")
        housing_instance.amenities.set(map(lambda x: int(x), amenities))
        housing_images = HousingImage.objects.filter(housing=housing_instance)
        delete_list = (
            self.request.data["deleteFromOriginal"].split(",")
            if self.request.data["deleteFromOriginal"] != ""
            else []
        )
        for housing_id in delete_list:
            image_instance = HousingImage.objects.get(id=housing_id)
            image_instance.delete()
        for name, img in self.request.FILES.items():
            HousingImage.objects.create(housing=housing_instance, img=img)


class HousingDetail(generics.RetrieveAPIView):
    queryset = Housing.objects.filter(is_published=True)
    serializer_class = HousingDetailSerializer
    permission_classes = (permissions.AllowAny,)
    lookup_field = "id"


class HousingRoomTypeChoices(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        """
        Returns a list of all Room Type Choices.
        """
        room_types = [
            room_type
            for room_type in dir(Housing.RoomType)
            if not room_type.startswith("__")
            and not callable(getattr(Housing.RoomType, room_type))
        ]
        return Response(room_types)


class HousingFilter(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = HousingSerializer
    # pagination_class = api_settings.DEFAULT_PAGINATION_CLASS

    def post(self, request, format=None):
        queryset = Housing.objects.order_by("-upload_date").filter(
            is_published=True
        )
        data = self.request.data  # form data
        campus_area = data.get("campus_area", None)
        if campus_area:
            queryset = queryset.filter(campus_area__iexact=campus_area)
        room_type = data.get("room_type", None)
        if room_type:
            queryset = queryset.filter(room_type__iexact=room_type)
        rent_start_date = data.get("rent_start_date", None)
        if rent_start_date:
            year, month, day = map(lambda x: int(x), rent_start_date.split("-"))
            start_date_datetime_obj = datetime.date(year, month, day)
            queryset = queryset.filter(
                rent_start_date__gte=start_date_datetime_obj
            )
        rent_end_date = data.get("rent_end_date", None)
        if rent_end_date:
            year, month, day = map(lambda x: int(x), rent_end_date.split("-"))
            end_date_datetime_obj = datetime.date(year, month, day)
            queryset = queryset.filter(rent_end_date__gte=end_date_datetime_obj)
        bathrooms = data.get("bathrooms", None)
        if bathrooms:
            queryset = queryset.filter(bathrooms__iexact=bathrooms)
        roommates = data.get("roommates", None)
        if roommates:
            queryset = queryset.filter(roommates__iexact=roommates)
        max_price = data.get("max_price", None)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        serializer = HousingSerializer(queryset, many=True)
        return Response(serializer.data)


class HousingSaved(APIView):
    def post(self, request, format=None):
        housing_id = self.request.data["housing"]
        housing_instance = Housing.objects.filter(id=housing_id).first()
        user = self.request.user
        user.saved.add(housing_instance)
        return Response()

    def delete(self, request, format=None):
        housing_id = self.request.data["housing"]
        housing_instance = Housing.objects.filter(id=housing_id).first()
        user = self.request.user
        user.saved.remove(housing_instance)
        return Response()


class AmenityList(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Amenity.objects.all()
    serializer_class = AmenitySerializer
