from django.db import models
from django.utils.text import slugify


class Vehicle(models.Model):

    CONDITION_CHOICES = [
        ("new", "New"),
        ("used", "Used"),
    ]

    STATUS_CHOICES = [
        ("available", "Available"),
        ("reserved", "Reserved"),
        ("sold", "Sold"),
        ("hidden", "Hidden"),
    ]

    FUEL_CHOICES = [
        ("petrol", "Petrol"),
        ("diesel", "Diesel"),
        ("hybrid", "Hybrid"),
        ("electric", "Electric"),
    ]

    TRANSMISSION_CHOICES = [
        ("automatic", "Automatic"),
        ("manual", "Manual"),
    ]

    BODY_TYPE_CHOICES = [
        ("suv", "SUV"),
        ("sedan", "Sedan"),
        ("saloon", "Saloon"),
        ("coupe", "Coupe"),
        ("convertible", "Convertible"),
        ("hatchback", "Hatchback"),
        ("wagon", "Wagon"),
        ("pickup", "Pickup"),
        ("van", "Van"),
        ("bus", "Bus"),
    ]

    # Basic information
    stock_number = models.CharField(
        max_length=50,
        unique=True,
    )

    make = models.CharField(
        max_length=100,
    )

    model = models.CharField(
        max_length=100,
    )

    variant = models.CharField(
        max_length=100,
        blank=True,
    )

    year = models.PositiveIntegerField()

    condition = models.CharField(
        max_length=20,
        choices=CONDITION_CHOICES,
        default="used",
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="available",
    )

    # Pricing
    price = models.DecimalField(
        max_digits=15,
        decimal_places=2,
    )

    previous_price = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        null=True,
        blank=True,
    )

    # Vehicle specifications
    mileage = models.PositiveIntegerField(
        default=0,
        help_text="Mileage in kilometres.",
    )

    fuel_type = models.CharField(
        max_length=20,
        choices=FUEL_CHOICES,
        default="petrol",
    )

    transmission = models.CharField(
        max_length=20,
        choices=TRANSMISSION_CHOICES,
        default="automatic",
    )

    body_type = models.CharField(
        max_length=30,
        choices=BODY_TYPE_CHOICES,
        default="suv",
    )

    drive_type = models.CharField(
        max_length=50,
        blank=True,
    )

    engine_size = models.CharField(
        max_length=50,
        blank=True,
    )

    exterior_color = models.CharField(
        max_length=50,
        blank=True,
    )

    interior_color = models.CharField(
        max_length=50,
        blank=True,
    )

    doors = models.PositiveIntegerField(
        null=True,
        blank=True,
    )

    seats = models.PositiveIntegerField(
        null=True,
        blank=True,
    )

    vin = models.CharField(
        max_length=100,
        blank=True,
    )

    # Content
    description = models.TextField(
        blank=True,
    )

    features = models.JSONField(
        default=list,
        blank=True,
    )

    # Website controls
    is_featured = models.BooleanField(
        default=False,
    )

    slug = models.SlugField(
        max_length=250,
        unique=True,
        blank=True,
    )

    # Timestamps
    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):

        if not self.slug:
            base_slug = f"{self.year}-{self.make}-{self.model}"

            if self.variant:
                base_slug += f"-{self.variant}"

            self.slug = slugify(base_slug)

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.year} {self.make} {self.model}"

class VehicleImage(models.Model):
    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.CASCADE,
        related_name="images",
    )

    image = models.ImageField(
        upload_to="vehicles/%Y/%m/",
    )

    alt_text = models.CharField(
        max_length=255,
        blank=True,
    )

    is_primary = models.BooleanField(
        default=False,
    )

    sort_order = models.PositiveIntegerField(
        default=0,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = ["sort_order", "-created_at"]

    def save(self, *args, **kwargs):

        if self.is_primary:
            VehicleImage.objects.filter(
                vehicle=self.vehicle,
                is_primary=True,
            ).exclude(
                pk=self.pk
            ).update(
                is_primary=False
            )

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.vehicle} - Image {self.id}"