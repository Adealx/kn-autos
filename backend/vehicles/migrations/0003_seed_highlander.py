from django.db import migrations


def seed_highlander(apps, schema_editor):
    Vehicle = apps.get_model("vehicles", "Vehicle")
    VehicleImage = apps.get_model("vehicles", "VehicleImage")

    vehicle, created = Vehicle.objects.get_or_create(
        stock_number="KN-001",
        defaults={
            "make": "Toyota",
            "model": "Highlander",
            "variant": "XLE",
            "year": 2020,
            "condition": "used",
            "status": "available",
            "price": "48500000.00",
            "previous_price": None,
            "mileage": 10000,
            "fuel_type": "petrol",
            "transmission": "automatic",
            "body_type": "suv",
            "drive_type": "AWD",
            "engine_size": "3.5L",
            "exterior_color": "White",
            "interior_color": "Black",
            "doors": 4,
            "seats": 7,
            "vin": "",
            "description": (
                "2020 Toyota Highlander XLE available for sale in Lagos. "
                "A spacious and well-equipped SUV suitable for family and "
                "executive use."
            ),
            "features": [
                "XLE Trim",
                "7 Seats",
                "Automatic Transmission",
                "Petrol",
                "AWD",
                "Reverse Camera",
                "Keyless Entry",
                "Push Start",
                "Air Conditioning",
                "Leather Interior",
            ],
            "is_featured": True,
            "slug": "2020-toyota-highlander-xle",
        },
    )

    # Add the existing Highlander images that are already in the repository.
    image_files = [
        (
            "vehicles/2026/09/highlander.webp",
            "2020 Toyota Highlander XLE",
            True,
            0,
        ),
        (
            "vehicles/2026/09/highlander_2.webp",
            "2020 Toyota Highlander XLE exterior",
            False,
            1,
        ),
        (
            "vehicles/2026/09/highlander_3.webp",
            "2020 Toyota Highlander XLE interior",
            False,
            2,
        ),
    ]

    for image_path, alt_text, is_primary, sort_order in image_files:
        VehicleImage.objects.get_or_create(
            vehicle=vehicle,
            image=image_path,
            defaults={
                "alt_text": alt_text,
                "is_primary": is_primary,
                "sort_order": sort_order,
            },
        )


def remove_highlander(apps, schema_editor):
    Vehicle = apps.get_model("vehicles", "Vehicle")

    Vehicle.objects.filter(stock_number="KN-001").delete()


class Migration(migrations.Migration):

    dependencies = [
        ("vehicles", "0002_vehicleimage"),
    ]

    operations = [
        migrations.RunPython(
            seed_highlander,
            remove_highlander,
        ),
    ]
