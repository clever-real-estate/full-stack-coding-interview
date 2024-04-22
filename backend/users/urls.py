from users.viewsets import UserViewset
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'', UserViewset)

urlpatterns = router.urls