from rest_framework import serializers
from accounts.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    # from housing.serializers import HousingSerializer

    saved = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "name",
            "join_date",
            "is_active",
            "about",
            "picture",
            "saved",
        ]

    def get_saved(self, obj):
        from housing.serializers import HousingSerializer
        from housing.models import Housing

        saved_queryset = Housing.objects.filter(saved_by__id__contains=obj.id)
        return HousingSerializer(saved_queryset, many=True).data
