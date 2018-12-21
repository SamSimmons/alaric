from stalker.models import Grappler, Clip
from rest_framework import serializers
from taggit_serializer.serializers import (TagListSerializerField, TaggitSerializer)
from taggit.models import TagBase
import json
from django.db.models import Count

class GrapplerSerializer(serializers.HyperlinkedModelSerializer):
    clip_stats = serializers.SerializerMethodField()

    class Meta:
        model = Grappler
        fields = ('url', 'name', 'id', 'avatar', 'clip_stats')
    
    def get_clip_stats(self, grappler):
        clips = Clip.objects.filter(grappler = grappler.id)
        opponents = clips.exclude(opponent='').values('opponent').annotate(opponent_count=Count('opponent'))
        untagged = clips.filter(tags=None)
        return { 
            "clips": clips.count(),
            "opponents": opponents.count(),
            "untagged": untagged.count(),
        }


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
        child=serializers.FileField(
            max_length=100000,
            allow_empty_file=False,
            use_url=False
        )
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
