from django.contrib import admin
from django.conf import settings
from .models import Photographer, Photo, Like


admin.site.site_header = f"{settings.SITE_NAME} Admin"
admin.site.register([Photographer, Photo, Like])
# Register your models here.
