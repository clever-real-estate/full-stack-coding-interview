from django.contrib import admin
from .models import Photo, Photographer


class PhotoAdmin(admin.ModelAdmin):
    list_display = ('photo_id', 'description', 'photographer', 'url')
    search_fields = ['description', 'photographer__name']


admin.site.register(Photo, PhotoAdmin)


class PhotographerAdmin(admin.ModelAdmin):
    list_display = ('photographer_id', 'name', 'portfolio')
    search_fields = ['name']


admin.site.register(Photographer, PhotographerAdmin)
