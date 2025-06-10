from django.db import models
from django.contrib.auth.models import User

class Photo(models.Model):
    """
    Model representing a photo entry with metadata such as photographer name, alt text, and color info.
    """

    photo_id = models.CharField(max_length=255, blank=True, unique=True)  # External or custom photo identifier
    photographer = models.CharField(max_length=255, blank=True)  # Name of the photographer
    alt = models.TextField(blank=True)  # Alternative text for accessibility or description
    avg_color = models.CharField(max_length=7, blank=True)  # Average color of the image (e.g., HEX code)
    portfolio = models.URLField(unique=True)  # Link to the photographer's portfolio
    medium_src = models.URLField(unique=True)  # URL to the medium-sized image

    def __str__(self):
        """
        String representation of the Photo object.
        """
        return self.photographer


class Like(models.Model):
    """
    Model representing a user's 'like' action on a photo.
    Each user can like a photo only once.
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes")  # User who liked the photo
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, related_name="likes")  # Photo that was liked
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp when the like was created

    class Meta:
        unique_together = ("user", "photo")  # Ensures a user can like a specific photo only once
