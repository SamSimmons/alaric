from stalker.models import Grappler, Clip
from rest_framework import viewsets
from api.serializers import GrapplerSerializer, ClipSerializer

class GrapplerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows grapplers to be viewed or edited
    """
    queryset = Grappler.objects.all()
    serializer_class = GrapplerSerializer

class ClipViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows clips to be viewed or edited
    """
    queryset = Clip.objects.all()
    serializer_class = ClipSerializer
