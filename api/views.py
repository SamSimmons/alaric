from stalker.models import Grappler, Clip
from rest_framework import viewsets, generics
from rest_framework.views import APIView
from api.serializers import GrapplerSerializer, ClipSerializer, TagSerializer, OpponentSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from stalker.tasks import create_thumbnail
from taggit.models import Tag



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
        for i in range(0, last):
            video = request.data['videos[' + str(i) + ']']
            clip = Clip.objects.create(grappler=grappler, video=video)
            create_thumbnail.delay(clip.id)
        return Response("ok")


    def get_queryset(self):
        queryset = Clip.objects.all()
        tags = self.request.query_params.getlist('tag', [])
        if len(tags) > 0 and "All"  not in tags:
            if "untagged" in tags:
                return queryset.filter(tags=None)
            for key in tags:
                queryset = queryset.filter(tags__name__in=[key])

        grapplers = self.request.query_params.getlist('grappler', [])
        if len(grapplers) > 0 and "All" not in grapplers:
            queryset = queryset.filter(grappler__in=grapplers)

        opponents = self.request.query_params.getlist('opponent', [])
        if len(opponents) > 0:
            print('---->', opponents)
            queryset = queryset.filter(opponent__in=opponents)

        exclude_watched = self.request.query_params.get('exclude_watched', '')
        if 'watched' in self.request.session and exclude_watched == 'true':
            watched = self.request.session['watched']
            queryset = queryset.exclude(id__in=watched)

        return queryset

    @action(detail=False)
    def watched(self, request):
        watched = request.session.get('watched', [])
        queryset = Clip.objects.filter(pk__in=watched)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class TagList(generics.ListAPIView):
    serializer_class = TagSerializer

    def get_queryset(self):
        tags = Clip.tags.most_common()
        return tags

class OpponentList(generics.ListAPIView):
    serializer_class = OpponentSerializer

    def get_queryset(self):
        opponents = Clip.objects.all().values('opponent').distinct()
        return opponents
