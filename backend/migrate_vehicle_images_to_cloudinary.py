
from pathlib import Path

from django.conf import settings
from django.core.files import File
from django.core.files.storage import default_storage
from django.db import transaction

from vehicles.models import VehicleImage


def migrate_images():
    image_records = list(
        VehicleImage.objects.exclude(image="")
    )

    if not image_records:
        print("No vehicle images found.")
        return

    # Upload each unique local file only once.
    unique_names = sorted({
        record.image.name
        for record in image_records
    })

    uploaded_names = {}

    for old_name in unique_names:
        local_path = Path(settings.MEDIA_ROOT) / old_name

        if not local_path.is_file():
            raise FileNotFoundError(
                f"Local image not found: {local_path}"
            )

        print(f"Uploading: {old_name}")

        # Use the existing relative image path in Cloudinary.
        with local_path.open("rb") as source:
            uploaded_name = default_storage.save(
                old_name,
                File(source, name=local_path.name),
            )

        uploaded_names[old_name] = uploaded_name

        print(f"Cloudinary name: {uploaded_name}")

    # Change only the image file names in existing records.
    # Vehicle associations and primary-image flags are preserved.
    with transaction.atomic():
        for old_name, new_name in uploaded_names.items():
            updated = VehicleImage.objects.filter(
                image=old_name
            ).update(image=new_name)

            print(
                f"Updated {updated} record(s): "
                f"{old_name} -> {new_name}"
            )

    print("\nMigration complete.")
    print("Vehicle records:", VehicleImage.objects.count())
    print("Unique files uploaded:", len(uploaded_names))

    for record in VehicleImage.objects.all():
        print(
            record.id,
            record.vehicle,
            record.image.name,
            "Primary:", record.is_primary,
        )


if __name__ == "__main__":
    migrate_images()
