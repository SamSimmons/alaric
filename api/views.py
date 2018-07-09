from stalker.models import Grappler, Clip
from rest_framework import viewsets, generics
from rest_framework.views import APIView
from api.serializers import GrapplerSerializer, ClipSerializer
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'

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
    serializer_class = ClipSerializer
    pagination_class = StandardResultsSetPagination

    def create(self, request):
        last = int(request.data['videos[length]'])
        grappler = Grappler.objects.get(id=request.data['grappler'])
        tags = request.data['tags']
        for i in range(0, last):
            video = request.data['videos[' + str(i) + ']']
            clip = Clip.objects.create(grappler=grappler, tags=tags, video=video)
        return Response("ok")

    def get_queryset(self):
        queryset = Clip.objects.all()
        tags = self.request.query_params.getlist('tag', None)
        if tags is not None:
            if "untagged" in tags:
                return queryset.filter(tags=None)
            for key in tags:
                queryset = queryset.filter(tags__name__in=[key])
        return queryset

class GrapplerClipsList(generics.ListAPIView):
    serializer_class = ClipSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        """
        This view should return a list of all the clips for
        the grappler as determined by the grappler_id portion of the URL.
        """
        grappler = self.kwargs['grappler_id']
        return Clip.objects.filter(grappler=grappler).prefetch_related('tags')
