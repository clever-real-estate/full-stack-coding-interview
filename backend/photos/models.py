from django.db import models
from django.conf import settings

class Photographer(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    url = models.URLField(max_length=500, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        if self.name:
            return f"{self.name} ({self.url})"
        return self.url


class Photo(models.Model):
    image_url = models.URLField(max_length=500, unique=True)
    color = models.CharField(max_length=20)
    alt_text = models.CharField(max_length=255, blank=True, null=True)
    photographer = models.ForeignKey(
        Photographer,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="photos"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        if self.alt_text:
            return f"{self.alt_text[:50]}..." if len(self.alt_text) > 50 else self.alt_text
        return f"Photo ID: {self.id} (no alt text)"


class Like(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, related_name="likes")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'photo')
        ordering = ['-created_at']

