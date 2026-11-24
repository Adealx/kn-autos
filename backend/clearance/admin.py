
from django.contrib import admin

from .models import ClearanceEnquiry


@admin.register(ClearanceEnquiry)
class ClearanceEnquiryAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "phone",
        "service_type",
        "status",
        "created_at",
    )

    list_filter = (
        "service_type",
        "status",
        "created_at",
    )

    search_fields = (
        "name",
        "email",
        "phone",
        "subject",
        "message",
    )

    list_editable = ("status",)

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    fieldsets = (
        ("Customer Information", {
            "fields": (
                "name",
                "email",
                "phone",
            )
        }),
        ("Service Details", {
            "fields": (
                "service_type",
                "subject",
                "message",
                "shipment_origin",
                "shipment_destination",
                "cargo_description",
            )
        }),
        ("Enquiry Management", {
            "fields": (
                "status",
                "admin_notes",
                "created_at",
                "updated_at",
            )
        }),
    )
