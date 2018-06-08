from django.conf.urls import url, include
from django.conf import settings
from django.views.static import serve
from rest_framework import routers

from api import views

router = routers.DefaultRouter()
router.register(r'grapplers', views.GrapplerViewSet)
router.register(r'clips', views.ClipViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += [
        url(r'^media/(?P<path>.*)$', serve, { 'document_root': settings.MEDIA_ROOT, })
    ]
