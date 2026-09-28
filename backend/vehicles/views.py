from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from .models import Vehicle, VehicleImage
from .serializers import (
    VehicleImageSerializer,
    VehicleSerializer,
)


class VehicleViewSet(viewsets.ModelViewSet):

    queryset = (
        Vehicle.objects
        .prefetch_related("images")
        .all()
    )

    serializer_class = VehicleSerializer

    def get_permissions(self):
        if self.action in [
            "list",
            "retrieve",
        ]:
            return [AllowAny()]

        return [IsAdminUser()]

    @action(
        detail=True,
        methods=["post"],
        url_path="upload-image",
        parser_classes=[
            MultiPartParser,
            FormParser,
        ],
    )
    def upload_image(self, request, pk=None):

        vehicle = self.get_object()

        serializer = VehicleImageSerializer(
            data=request.data,
            context={
                "request": request,
            },
        )

        serializer.is_valid(
            raise_exception=True
        )

        image = serializer.save(
            vehicle=vehicle
        )

        return Response(
            VehicleImageSerializer(
                image,
                context={
                    "request": request,
                },
            ).data,
            status=status.HTTP_201_CREATED,
        )