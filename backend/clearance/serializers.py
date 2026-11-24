
from rest_framework import serializers

from .models import ClearanceEnquiry


class ClearanceEnquirySerializer(serializers.ModelSerializer):

    class Meta:
        model = ClearanceEnquiry
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "service_type",
            "subject",
            "message",
            "shipment_origin",
            "shipment_destination",
            "cargo_description",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
        ]

    def validate_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError(
                "Please provide your full name."
            )
        return value.strip()

    def validate_phone(self, value):
        if len(value.strip()) < 7:
            raise serializers.ValidationError(
                "Please provide a valid phone number."
            )
        return value.strip()
