from stalker.models import Grappler, Clip
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import generics
from api.serializers import GrapplerSerializer, ClipSerializer
from rest_framework.response import Response

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

    def create(self, request):
        last = int(request.data['videos[length]'])
        grappler = Grappler.objects.get(id=request.data['grappler'])
        tags = request.data['tags']
        for i in range(0, last):
            video = request.data['videos[' + str(i) + ']']
            clip = Clip.objects.create(grappler=grappler, tags=tags, video=video)
        return Response("ok")

class GrapplerClipsList(generics.ListAPIView):
    serializer_class = ClipSerializer

    def get_queryset(self):
        """
        This view should return a list of all the clips for
        the grappler as determined by the grappler_id portion of the URL.
        """
        grappler = self.kwargs['grappler_id']
        return Clip.objects.filter(grappler=grappler)
