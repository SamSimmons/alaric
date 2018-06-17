from stalker.models import Grappler, Clip
from rest_framework import serializers
from taggit_serializer.serializers import (TagListSerializerField, TaggitSerializer)

class GrapplerSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Grappler
        fields = ('url', 'name', 'id', 'avatar')


class ClipSerializer(TaggitSerializer, serializers.ModelSerializer):

    tags = TagListSerializerField()

    class Meta:
        model = Clip
        # fields = ('grappler', 'video', 'tags')
        fields = '__all__'
