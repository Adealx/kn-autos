
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle

from .models import ClearanceEnquiry
from .serializers import ClearanceEnquirySerializer


class ClearanceEnquiryThrottle(AnonRateThrottle):
    rate = "5/hour"


class ClearanceEnquiryCreateView(generics.CreateAPIView):
    queryset = ClearanceEnquiry.objects.all()
    serializer_class = ClearanceEnquirySerializer
    permission_classes = [AllowAny]
    throttle_classes = [ClearanceEnquiryThrottle]
