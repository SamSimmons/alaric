# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2018-07-10 05:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stalker', '0007_clip_opponenent'),
    ]

    operations = [
        migrations.AddField(
            model_name='clip',
            name='thumbnail',
            field=models.FileField(blank=True, upload_to='thumbnails'),
        ),
    ]