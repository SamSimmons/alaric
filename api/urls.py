from django.conf.urls import url, include
from django.conf import settings
from django.views.static import serve
from rest_framework import routers

from api.views import GrapplerViewSet, ClipViewSet, GrapplerClipsList

router = routers.DefaultRouter()
router.register(r'grapplers', GrapplerViewSet)
router.register(r'clips', ClipViewSet)

urlpatterns = [
    url('^grappler-clips/(?P<grappler_id>.+)/$', GrapplerClipsList.as_view()),
    url(r'^', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += [
        url(r'^media/(?P<path>.*)$', serve, { 'document_root': settings.MEDIA_ROOT, })
    ]
