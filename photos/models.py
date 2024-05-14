from django.db import models


class Photographer(models.Model):
    name = models.CharField(max_length=255)
    portfolio = models.URLField(max_length=1024)
    photographer_id = models.BigIntegerField(unique=True)

    def __str__(self):
        return self.name


class UserPhoto(models.Model):
    user = models.ForeignKey("users.AppUser", on_delete=models.CASCADE, related_name="user_photos")
    photo = models.ForeignKey("photos.Photo", on_delete=models.CASCADE, related_name="user_photos")
    liked = models.BooleanField(default=False)

    class Meta:
        unique_together = ("user", "photo")  # Ensure each user-photo pair is unique

    def __str__(self):
        return f"{self.user.username} - {self.photo.description} - Liked: {self.liked}"


class Photo(models.Model):
    owner = models.ManyToManyField("users.AppUser", through='UserPhoto', related_name="photos")
    photographer = models.ForeignKey(Photographer, related_name="photos", on_delete=models.CASCADE)
    photo_id = models.BigIntegerField(unique=True)
    width = models.IntegerField()
    height = models.IntegerField()
    url = models.URLField(max_length=1024)
    avg_color = models.CharField(max_length=7)
    original_url = models.URLField(max_length=1024)
    large2x_url = models.URLField(max_length=1024)
    large_url = models.URLField(max_length=1024)
    medium_url = models.URLField(max_length=1024)
    small_url = models.URLField(max_length=1024)
    portrait_url = models.URLField(max_length=1024)
    landscape_url = models.URLField(max_length=1024)
    tiny_url = models.URLField(max_length=1024)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.description} by {self.photographer.name}"
