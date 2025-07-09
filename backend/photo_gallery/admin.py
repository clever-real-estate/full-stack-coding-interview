from django.conf import settings
from django.contrib import admin

from .models import Like, Photo, Photographer

admin.site.site_header = f"{settings.SITE_NAME} Admin"

# Register your models here.
admin.site.register([Photographer, Photo, Like])
