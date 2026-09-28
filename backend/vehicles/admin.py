from django.contrib import admin

from .models import Vehicle, VehicleImage


class VehicleImageInline(admin.TabularInline):
    model = VehicleImage
    extra = 1

    fields = (
        "image",
        "alt_text",
        "is_primary",
        "sort_order",
    )


@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):

    list_display = (
        "stock_number",
        "year",
        "make",
        "model",
        "price",
        "mileage",
        "status",
        "is_featured",
    )

    list_filter = (
        "status",
        "condition",
        "fuel_type",
        "transmission",
        "body_type",
        "is_featured",
    )

    search_fields = (
        "stock_number",
        "make",
        "model",
        "variant",
        "vin",
    )

    prepopulated_fields = {
        "slug": (
            "year",
            "make",
            "model",
        )
    }

    list_editable = (
        "status",
        "is_featured",
    )

    inlines = [
        VehicleImageInline,
    ]


@admin.register(VehicleImage)
class VehicleImageAdmin(admin.ModelAdmin):

    list_display = (
        "vehicle",
        "is_primary",
        "sort_order",
        "created_at",
    )

    list_filter = (
        "is_primary",
    )

    search_fields = (
        "vehicle__make",
        "vehicle__model",
        "vehicle__stock_number",
    )