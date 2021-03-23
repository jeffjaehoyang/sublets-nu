from rest_framework import serializers
from .models import Housing, HousingImage, Amenity
from accounts.serializers import UserSerializer


class HousingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HousingImage
        fields = "__all__"


class HousingSerializer(serializers.ModelSerializer):
    images = HousingImageSerializer(required=False, many=True)

    class Meta:
        model = Housing
        fields = [
            "id",
            "title",
            "city",
            "street_address",
            "street_address_is_open",
            "zipcode",
            "price",
            "description",
            "upload_date",
            "uploader",
            "rent_start_date",
            "rent_end_date",
            "room_type",
            "roommates",
            "bathrooms",
            "is_negotiable",
            "is_published",
            "latitude",
            "longitude",
            "campus_area",
            "saved_by",
            "images",
            "view_count",
        ]


class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = "__all__"
        ordering = ["-id"]
        lookup_field = "id"


class HousingCreateSerializer(serializers.ModelSerializer):
    amenities = AmenitySerializer(required=False, many=True)

    class Meta:
        model = Housing
        fields = "__all__"


class HousingDetailSerializer(serializers.ModelSerializer):
    uploader = UserSerializer()
    images = HousingImageSerializer(required=False, many=True)
    amenities = AmenitySerializer(required=False, many=True)

    class Meta:
        model = Housing
        fields = "__all__"
        lookup_field = "id"
