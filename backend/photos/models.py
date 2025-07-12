from django.db import models
from django.contrib.auth.models import User


class Photo(models.Model):
    width = models.IntegerField()
    height = models.IntegerField()
    url = models.URLField()
    photographer = models.CharField(max_length=255)
    photographer_url = models.URLField()
    photographer_id = models.IntegerField()
    avg_color = models.CharField(max_length=7)
    src_original = models.URLField()
    src_large2x = models.URLField()
    src_large = models.URLField()
    src_medium = models.URLField()
    src_small = models.URLField()
    src_portrait = models.URLField()
    src_landscape = models.URLField()
    src_tiny = models.URLField()
    alt = models.TextField()
    
    def __str__(self):
        return f"{self.photographer} - {self.alt[:50]}"


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'photo')
    
    def __str__(self):
        return f"{self.user.username} likes {self.photo.photographer} - {self.photo.alt}"
