from django.contrib.auth import get_user_model
from django.db import models
from versatileimagefield.fields import VersatileImageField

User = get_user_model()


class Photo(models.Model):
    photographer = models.CharField(max_length=254)
    photographer_url = models.URLField(max_length=2083, null=True, blank=True)
    description = models.TextField(blank=True)
    image = VersatileImageField(upload_to="photos/")
    image_url = models.URLField(max_length=2083, null=True, blank=True)
    color = models.CharField(max_length=10, blank=True, null=True)
    likes = models.ManyToManyField(User, through="Like", verbose_name="likes")

    def __str__(self):
        return self.description


class Like(models.Model):
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes")
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [["photo", "user"]]
