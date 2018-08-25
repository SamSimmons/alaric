from __future__ import absolute_import, unicode_literals
import os
import django
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.local')
django.setup()

app = Celery('stalker')
app.config_from_object('django.conf:settings')
app.conf.broker_url = 'redis://redis:6379/0'
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
