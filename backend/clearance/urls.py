
from django.urls import path

from .views import ClearanceEnquiryCreateView


urlpatterns = [
    path(
        "clearance-enquiries/",
        ClearanceEnquiryCreateView.as_view(),
        name="clearance-enquiry-create",
    ),
]
