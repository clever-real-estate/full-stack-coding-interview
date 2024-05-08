from django.contrib import admin

from .models import Like, Photo


@admin.register(Photo)
class PhotosAdmin(admin.ModelAdmin):
    list_display = ("id", "photographer", "description")


@admin.register(Like)
class LikesAdmin(admin.ModelAdmin):
    pass
