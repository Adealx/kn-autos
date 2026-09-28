from rest_framework import serializers

from .models import Vehicle, VehicleImage


class VehicleImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = VehicleImage
        fields = [
            "id",
            "image",
            "image_url",
            "alt_text",
            "is_primary",
            "sort_order",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "image_url",
            "created_at",
        ]

    def get_image_url(self, obj):
        request = self.context.get("request")

        if not obj.image:
            return None

        url = obj.image.url

        if request:
            return request.build_absolute_uri(url)

        return url


class VehicleSerializer(serializers.ModelSerializer):
    images = VehicleImageSerializer(
        many=True,
        read_only=True,
    )

    primary_image = serializers.SerializerMethodField()

    class Meta:
        model = Vehicle

        fields = [
            "id",
            "stock_number",
            "make",
            "model",
            "variant",
            "year",
            "condition",
            "status",
            "price",
            "previous_price",
            "mileage",
            "fuel_type",
            "transmission",
            "body_type",
            "drive_type",
            "engine_size",
            "exterior_color",
            "interior_color",
            "doors",
            "seats",
            "vin",
            "description",
            "features",
            "is_featured",
            "slug",
            "images",
            "primary_image",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "slug",
            "images",
            "primary_image",
            "created_at",
            "updated_at",
        ]

    def get_primary_image(self, obj):
        image = obj.images.filter(
            is_primary=True
        ).first()

        if not image:
            image = obj.images.first()

        if not image or not image.image:
            return None

        request = self.context.get("request")

        if request:
            return request.build_absolute_uri(
                image.image.url
            )

        return image.image.url