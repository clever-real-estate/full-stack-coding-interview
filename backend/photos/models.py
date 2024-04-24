from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Photo(models.Model):
    width = models.IntegerField(blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    url = models.URLField()
    photographer = models.CharField(max_length=100, blank=True, null=True)
    photographer_url = models.URLField(blank=True, null=True)
    photographer_id = models.IntegerField()
    avg_color = models.CharField(max_length=7, blank=True, null=True)
    src_original = models.URLField(blank=True, null=True)
    src_large2x = models.URLField(blank=True, null=True)
    src_large = models.URLField(blank=True, null=True)
    src_medium = models.URLField(blank=True, null=True)
    src_small = models.URLField(blank=True, null=True)
    src_portrait = models.URLField(blank=True, null=True)
    src_landscape = models.URLField(blank=True, null=True)
    src_tiny = models.URLField(blank=True, null=True)
    alt = models.CharField(max_length=100, blank=True, null=True)

class LikePhoto(models.Model):
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='liked_photos')