from stalker.models import Grappler, Clip
from rest_framework import serializers
from taggit_serializer.serializers import (TagListSerializerField, TaggitSerializer)
from taggit.models import TagBase

class GrapplerSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Grappler
        fields = ('url', 'name', 'id', 'avatar')


class ClipSerializer(TaggitSerializer, serializers.ModelSerializer):

    tags = TagListSerializerField()
    grappler_name = serializers.SerializerMethodField()

    class Meta:
        model = Clip
        # fields = ('grappler', 'video', 'tags')
        fields = '__all__'

    def get_grappler_name(self, clip):
        return clip.grappler.name

class FileListSerializer (serializers.Serializer ) :
    image = serializers.ListField(
                       child=serializers.FileField( max_length=100000,
                                         allow_empty_file=False,
                                         use_url=False )
                                )
    def create(self, validated_data):
        blogs=Blogs.objects.latest('created_at')
        video_list=validated_data.pop('video')
        for video in video_list:
            photo=Photo.objects.create(image=img,blogs=blogs,**validated_data)
        return pho

class TagSerializer(serializers.Serializer):
    name = serializers.CharField(read_only=True)
    num_times = serializers.IntegerField(read_only=True)

class OpponentSerializer(serializers.Serializer):
    opponent = serializers.CharField(read_only=True)
