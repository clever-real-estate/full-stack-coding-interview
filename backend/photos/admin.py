from django.contrib import admin
from .models import Photographer, Photo, Like

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('id', 'image_url', 'alt_text', 'photographer', 'color')
    list_filter = ('photographer',)
    search_fields = ('alt_text', 'photographer__name')

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'photo', 'created_at')

admin.site.register(Photographer)
