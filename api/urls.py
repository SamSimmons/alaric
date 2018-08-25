from django.conf.urls import url, include
from django.conf import settings
from django.views.static import serve
from rest_framework import routers

from api.views import GrapplerViewSet, ClipViewSet, TagList, OpponentList

router = routers.DefaultRouter()
router.register(r'grapplers', GrapplerViewSet)
router.register(r'clips', ClipViewSet, 'clip-detail')

urlpatterns = [
    url('^opponents/$', OpponentList.as_view()),
    url('^tags/$', TagList.as_view()),
    url(r'^media/(?P<path>.*)$', serve, { 'document_root': settings.MEDIA_ROOT, }),
    url(r'^', include(router.urls)),
]
