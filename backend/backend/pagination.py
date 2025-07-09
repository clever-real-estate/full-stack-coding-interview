from decouple import config
from rest_framework.pagination import PageNumberPagination


class CustomPageNumberPagination(PageNumberPagination):
    """Custom pagination class for the API.

    Allows clients to specify page size and limits the maximum page size.

    Usage: `/api/photos/?page=2&limit=20`
    """

    page_size = config("DEFAULT_PAGE_SIZE", default=10, cast=int)  # default page size
    page_size_query_param = "limit"  # allows clients to override with ?limit=
    max_page_size = 100  # maximum page size allowed
