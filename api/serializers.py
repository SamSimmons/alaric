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
