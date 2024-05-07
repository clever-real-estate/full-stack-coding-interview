from django.contrib import admin

from .models import Photo


@admin.register(Photo)
class PhotosAdmin(admin.ModelAdmin):
    list_display = ("id", "photographer", "description")
