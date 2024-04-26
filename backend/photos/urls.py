from photos.viewsets import PhotoViewset
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'', PhotoViewset)

urlpatterns = router.urls