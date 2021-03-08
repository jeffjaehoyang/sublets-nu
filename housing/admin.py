from django.contrib import admin
from .models import Housing, HousingImage


class HousingImageInline(admin.TabularInline):
    model = HousingImage
    extra = 3


class HousingAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "is_published",
        "price",
        "upload_date",
        "uploader",
    )
    list_display_links = ("id", "title")
    list_filter = ("uploader",)
    list_editable = ("is_published",)
    search_fields = (
        "title",
        "description",
        "address",
        "city",
        "state",
        "zipcode",
        "price",
    )
    list_per_page = 25
    inlines = [
        HousingImageInline,
    ]


admin.site.register(Housing, HousingAdmin)