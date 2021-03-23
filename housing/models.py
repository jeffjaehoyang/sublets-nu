from django.db import models
from django.utils import timezone
from accounts.models import CustomUser
from sublets_nu_server.settings import AUTH_USER_MODEL


class Amenity(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100, null=True, blank=True)
    icon_class = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Housing(models.Model):
    class CampusAreaType(models.TextChoices):
        NORTH = "North Campus"
        MID = "Mid Campus"
        SOUTH = "South Campus"

    class RoomType(models.TextChoices):
        STUDIO = "Studio"
        ONE_BED = "1 Bedroom"
        TWO_BED = "2 Bedroom"
        THREE_BED = "3 Bedroom"
        FOUR_BED = "4 Bedroom"
        FIVE_BED = "5 Bedroom"

    # basic information
    title = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    street_address = models.CharField(max_length=100)
    street_address_is_open = models.BooleanField(default=True)
    zipcode = models.CharField(max_length=15)
    price = models.IntegerField()
    description = models.TextField(null=True)
    upload_date = models.DateTimeField(default=timezone.now)
    uploader = models.ForeignKey(to=AUTH_USER_MODEL, on_delete=models.CASCADE)
    rent_start_date = models.DateField()
    rent_end_date = models.DateField()
    room_type = models.CharField(max_length=100, choices=RoomType.choices)
    roommates = models.IntegerField()
    bathrooms = models.IntegerField()
    view_count = models.IntegerField()

    # boolean fields
    is_negotiable = models.BooleanField(default=True)
    is_published = models.BooleanField(default=True)
    is_pet_friendly = models.BooleanField(default=True)
    is_lgbtq_friendly = models.BooleanField(default=True)

    # location related details
    latitude = models.DecimalField(
        max_digits=19, decimal_places=10, default=0.0
    )
    longitude = models.DecimalField(
        max_digits=19, decimal_places=10, default=0.0
    )
    campus_area = models.CharField(
        max_length=20, choices=CampusAreaType.choices
    )
    duration_tech = models.CharField(max_length=20, default=0)
    duration_norris = models.CharField(max_length=20, default=0)
    duration_kresge = models.CharField(max_length=20, default=0)
    duration_target = models.CharField(max_length=20, default=0)

    # many to many
    amenities = models.ManyToManyField(Amenity, blank=True)
    saved_by = models.ManyToManyField(
        CustomUser, related_name="saved", blank=True
    )

    def __str__(self):
        return self.title


class HousingImage(models.Model):
    housing = models.ForeignKey(
        Housing, on_delete=models.CASCADE, related_name="images"
    )
    img = models.ImageField(upload_to="housing_pics")
    uploaded_at = models.DateTimeField(auto_now_add=True)
