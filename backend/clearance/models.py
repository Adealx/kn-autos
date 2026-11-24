
from django.db import models


class ClearanceEnquiry(models.Model):

    SERVICE_CHOICES = [
        ("vehicle_clearing", "Vehicle Clearing"),
        ("vehicle_importation", "Vehicle Importation"),
        ("cargo_clearing", "Cargo Clearing"),
        ("freight_forwarding", "Freight Forwarding"),
        ("shipping_logistics", "Shipping & Logistics"),
        ("documentation", "Import Documentation"),
        ("other", "Other Services"),
    ]

    STATUS_CHOICES = [
        ("new", "New"),
        ("contacted", "Contacted"),
        ("quotation_sent", "Quotation Sent"),
        ("processing", "Processing"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30)

    service_type = models.CharField(
        max_length=50,
        choices=SERVICE_CHOICES,
    )

    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()

    shipment_origin = models.CharField(
        max_length=150,
        blank=True,
    )
    shipment_destination = models.CharField(
        max_length=150,
        blank=True,
    )
    cargo_description = models.TextField(blank=True)

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="new",
    )

    admin_notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Clearance Enquiry"
        verbose_name_plural = "Clearance Enquiries"

    def __str__(self):
        return f"{self.name} - {self.get_service_type_display()}"
