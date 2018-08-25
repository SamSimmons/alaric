import logging, os
from stalker.celery import app
from stalker.models import Clip
import subprocess
import ffmpeg

@app.task
def create_thumbnail(id):
    clip = Clip.objects.get(id=id)
    video_path = clip.video.name
    image_path = 'thumbnails/' + str(clip.id) + '-thumb.jpg'
    time = '00:00:00.000'
    # subprocess.call(['ffmpeg', '-i', "media/" + video_path, '-ss', time, '-vframes', '1', "-s", "350x200", "media/" + image_path])
    (
        ffmpeg
        .input("media/" + video_path, ss=time)
        .filter('scale', "350x200", -1)
        .output(image_path, vframes=1)
        .run()
    )
    clip.thumbnail = image_path
    clip.save()

def update_missing_thumbs():
    missing_thumbs = Clip.objects.filter(thumbnail='')
    for c in missing_thumbs:
        create_thumbnail.delay(c.id)
