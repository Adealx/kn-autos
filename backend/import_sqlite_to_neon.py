
import json
import os
from pathlib import Path

# Ensure Django loads the correct project settings.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

import django

django.setup()

from django.contrib.auth.models import User
from django.core.management.color import no_style
from django.db import connection, transaction

from vehicles.models import Vehicle, VehicleImage


# --------------------------------------------------
# CONFIGURATION
# --------------------------------------------------

EXPORT_FILE = (
    Path(__file__).resolve().parent
    / "sam_a_autos_sqlite_export.json"
)


# --------------------------------------------------
# LOAD SQLITE EXPORT
# --------------------------------------------------

def load_export():
    """Load the data exported from the original SQLite database."""

    if not EXPORT_FILE.exists():
        raise FileNotFoundError(
            f"\nExport file not found:\n{EXPORT_FILE}\n"
            "Make sure sam_a_autos_sqlite_export.json "
            "is inside the backend folder."
        )

    with EXPORT_FILE.open("r", encoding="utf-8") as file:
        return json.load(file)


# --------------------------------------------------
# IMPORT VEHICLES, IMAGES AND ADMIN USER
# --------------------------------------------------

def main():
    records = load_export()

    vehicles = {
        item["pk"]: item
        for item in records
        if item["model"] == "vehicles.vehicle"
    }

    images = [
        item
        for item in records
        if item["model"] == "vehicles.vehicleimage"
    ]

    users = [
        item
        for item in records
        if item["model"] == "auth.user"
    ]

    print("\n========================================")
    print(" SAM-A AUTOS: SQLITE TO NEON IMPORT")
    print("========================================")
    print(f"Vehicles found in export: {len(vehicles)}")
    print(f"Vehicle images found: {len(images)}")
    print(f"Users found in export: {len(users)}")
    print("")

    vehicle_id_map = {}

    # Use one transaction so a failed import does not leave
    # a partially imported dataset.
    with transaction.atomic():

        # ------------------------------------------
        # 1. IMPORT VEHICLES
        # ------------------------------------------

        print("IMPORTING VEHICLES")
        print("----------------------------------------")

        for old_id, item in vehicles.items():
            fields = item["fields"]
            stock_number = fields["stock_number"]

            vehicle, created = Vehicle.objects.get_or_create(
                stock_number=stock_number,
                defaults=fields,
            )

            # Map the old SQLite ID to the actual Neon ID.
            # This is important because Neon may already have
            # different primary keys.
            vehicle_id_map[old_id] = vehicle.pk

            if created:
                print(
                    f"IMPORTED: {stock_number} "
                    f"(Neon ID: {vehicle.pk})"
                )
            else:
                print(
                    f"PRESERVED: {stock_number} "
                    f"(Neon ID: {vehicle.pk})"
                )

        print("")

        # ------------------------------------------
        # 2. IMPORT VEHICLE IMAGES
        # ------------------------------------------

        print("IMPORTING VEHICLE IMAGES")
        print("----------------------------------------")

        imported_images = 0
        preserved_images = 0

        for item in images:
            fields = item["fields"]

            old_vehicle_id = fields["vehicle"]

            if old_vehicle_id not in vehicle_id_map:
                raise ValueError(
                    "Cannot import image because its original "
                    f"vehicle ID {old_vehicle_id} was not mapped."
                )

            neon_vehicle_id = vehicle_id_map[old_vehicle_id]
            image_path = fields["image"]

            image, created = VehicleImage.objects.get_or_create(
                vehicle_id=neon_vehicle_id,
                image=image_path,
                defaults={
                    "alt_text": fields.get("alt_text", ""),
                    "is_primary": fields.get("is_primary", False),
                    "sort_order": fields.get("sort_order", 0),
                },
            )

            # Do not manually reuse old image IDs. Neon may
            # already use those IDs for the seeded vehicle.
            if created:
                imported_images += 1
                print(
                    f"IMPORTED IMAGE: {image_path} "
                    f"(Vehicle ID: {neon_vehicle_id})"
                )
            else:
                preserved_images += 1
                print(
                    f"PRESERVED IMAGE: {image_path} "
                    f"(Vehicle ID: {neon_vehicle_id})"
                )

        print(f"\nNew images imported: {imported_images}")
        print(f"Existing images preserved: {preserved_images}")
        print("")

        # ------------------------------------------
        # 3. IMPORT ADMIN USER
        # ------------------------------------------

        print("IMPORTING ADMIN USERS")
        print("----------------------------------------")

        for item in users:
            fields = item["fields"]
            username = fields["username"]

            existing_user = User.objects.filter(
                username=username
            ).first()

            if existing_user:
                print(
                    f"PRESERVED USER: {username} "
                    "(an account with this username already exists)"
                )
                continue

            # Let Neon assign a new primary key instead of
            # reusing the SQLite ID.
            # The existing Django password hash is preserved.
            user = User(
                username=username,
                password=fields["password"],
                first_name=fields.get("first_name", ""),
                last_name=fields.get("last_name", ""),
                email=fields.get("email", ""),
                is_staff=fields.get("is_staff", False),
                is_active=fields.get("is_active", True),
                is_superuser=fields.get("is_superuser", False),
                date_joined=fields["date_joined"],
            )

            user.save()

            print(
                f"IMPORTED ADMIN: {username} "
                f"(Neon ID: {user.pk})"
            )

        # ------------------------------------------
        # 4. RESET DATABASE ID SEQUENCES
        # ------------------------------------------

        # Keep PostgreSQL's automatic IDs aligned with the
        # highest IDs currently stored in these tables.
        print("\nRESETTING DATABASE ID SEQUENCES")
        print("----------------------------------------")

        sql_statements = connection.ops.sequence_reset_sql(
            no_style(),
            [Vehicle, VehicleImage, User],
        )

        with connection.cursor() as cursor:
            for sql in sql_statements:
                cursor.execute(sql)

        print("Database ID sequences reset successfully.")

    # ----------------------------------------------
    # 5. FINAL DATABASE SUMMARY
    # ----------------------------------------------

    print("\n========================================")
    print(" IMPORT COMPLETED SUCCESSFULLY")
    print("========================================")

    print(f"Vehicles in Neon: {Vehicle.objects.count()}")
    print(f"Vehicle images in Neon: {VehicleImage.objects.count()}")
    print(f"Users in Neon: {User.objects.count()}")

    print("\nVEHICLE SUMMARY")
    print("----------------------------------------")

    for vehicle in Vehicle.objects.order_by("stock_number"):
        print(
            f"{vehicle.stock_number} | "
            f"{vehicle.year} {vehicle.make} {vehicle.model} | "
            f"Status: {vehicle.status} | "
            f"Neon ID: {vehicle.pk}"
        )

    print("\nDone. Please verify the results before deploying.")


if __name__ == "__main__":
    main()
