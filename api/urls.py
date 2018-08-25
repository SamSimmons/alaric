from django.conf.urls import url, include
from rest_framework import routers

from api.views import GrapplerViewSet, ClipViewSet, TagList, OpponentList

router = routers.DefaultRouter()
router.register(r'grapplers', GrapplerViewSet)
router.register(r'clips', ClipViewSet, 'clip-detail')

urlpatterns = [
    url('^opponents/$', OpponentList.as_view()),
    url('^tags/$', TagList.as_view()),
    url(r'^', include(router.urls)),
]
