from django.db import models
from django.contrib.auth.models import User


class Photographer(models.Model):
    """Model representing a photographer."""

    name = models.CharField(max_length=100)
    url = models.URLField(
        blank=True, null=True
    )  # May be missing for some Pexels authors
    pexels_id = models.PositiveBigIntegerField(unique=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    @property
    def photo_count(self):
        """Count of photos associated with the photographer."""
        return self.photos.count()

    class Meta:
        verbose_name = "Photographer"
        verbose_name_plural = "Photographers"
        db_table = "photographers"
        db_table_comment = "Table containing photographer information."
        ordering = ["name"]


class Photo(models.Model):
    """Model representing a photo."""

    photographer = models.ForeignKey(
        Photographer, on_delete=models.CASCADE, related_name="photos"
    )
    width = models.PositiveIntegerField(blank=True, null=True)
    height = models.PositiveIntegerField(blank=True, null=True)
    url = models.URLField()  # Required
    alt = models.TextField(blank=True, null=True)
    avg_color = models.CharField(max_length=7, blank=True, null=True)

    # Source image variants
    src_original = models.URLField(blank=True, null=True)
    src_large2x = models.URLField(blank=True, null=True)
    src_large = models.URLField(blank=True, null=True)
    src_medium = models.URLField(blank=True, null=True)
    src_small = models.URLField(blank=True, null=True)
    src_portrait = models.URLField(blank=True, null=True)
    src_landscape = models.URLField(blank=True, null=True)
    src_tiny = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Photo {self.id} by {self.photographer.name}"

    class Meta:
        verbose_name = "Photo"
        verbose_name_plural = "Photos"
        db_table = "photos"
        db_table_comment = "Table containing photo information."
        indexes = [
            models.Index(fields=["photographer", "url"]),
        ]


class Like(models.Model):
    """Model representing a like on a photo."""

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes")
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, related_name="likes")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """String representation of the Like model."""
        return f"{self.user.username} liked Photo {self.photo.id}"

    class Meta:
        verbose_name = "Like"
        verbose_name_plural = "Likes"
        db_table = "likes"
        db_table_comment = "Table containing likes on photos."
        unique_together = ("user", "photo")
        indexes = [
            models.Index(fields=["user", "photo"]),
        ]
        ordering = ["-created_at"]  # Most recent likes first
