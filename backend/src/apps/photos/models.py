import uuid
from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone


class Photo(models.Model):
    """
    Model representing a photo with metadata from Pexels.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pexels_id = models.IntegerField(
        unique=True,
        validators=[MinValueValidator(1)],
        help_text="Unique ID from Pexels API"
    )
    width = models.IntegerField(validators=[MinValueValidator(1)])
    height = models.IntegerField(validators=[MinValueValidator(1)])
    url = models.URLField(max_length=500, help_text="Pexels photo page URL")
    photographer = models.CharField(max_length=255)
    photographer_url = models.URLField(max_length=500, blank=True)
    photographer_id = models.IntegerField(blank=True, null=True)
    avg_color = models.CharField(
        max_length=7, 
        blank=True,
        help_text="Average color in hex format (e.g., #FF5733)"
    )
    
    # Image URLs for different sizes
    src_original = models.URLField(max_length=500)
    src_large = models.URLField(max_length=500, blank=True)
    src_medium = models.URLField(max_length=500, blank=True)
    src_small = models.URLField(max_length=500, blank=True)
    
    alt_text = models.TextField(blank=True, help_text="Alternative text for accessibility")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'photos'
        verbose_name = 'Photo'
        verbose_name_plural = 'Photos'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['pexels_id']),
            models.Index(fields=['photographer']),
            models.Index(fields=['created_at']),
            models.Index(fields=['photographer_id']),
            models.Index(fields=['-created_at']),  # For default ordering
        ]
    
    def __str__(self):
        return f"{self.alt_text or 'Untitled'} by {self.photographer}"
    
    def get_like_count(self):
        """Return the total number of likes for this photo."""
        return self.likes.count()
    
    def is_liked_by_user(self, user):
        """Check if a specific user has liked this photo."""
        if not user or not user.is_authenticated:
            return False
        return self.likes.filter(user=user).exists()
    
    @property
    def aspect_ratio(self):
        """Calculate and return the aspect ratio."""
        if self.height > 0:
            return self.width / self.height
        return 1.0