import uuid
from django.db import models
from django.conf import settings


class Like(models.Model):
    """
    Model representing a user's like on a photo.
    Implements a many-to-many relationship between users and photos.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='likes',
        help_text="User who liked the photo"
    )
    photo = models.ForeignKey(
        'photos.Photo',
        on_delete=models.CASCADE,
        related_name='likes',
        help_text="Photo that was liked"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'likes'
        verbose_name = 'Like'
        verbose_name_plural = 'Likes'
        unique_together = ('user', 'photo')  # Prevent duplicate likes
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['photo']),
            models.Index(fields=['created_at']),
            models.Index(fields=['-created_at']),
            models.Index(fields=['user', 'photo']),  # Composite index for lookups
        ]
    
    def __str__(self):
        return f"{self.user.email} likes {self.photo}"
    
    @classmethod
    def toggle_like(cls, user, photo):
        """
        Toggle like status for a user and photo.
        Returns tuple (like_object_or_none, created_boolean).
        """
        like, created = cls.objects.get_or_create(
            user=user,
            photo=photo
        )
        
        if not created:
            # Like already exists, so remove it (unlike)
            like.delete()
            return None, False
        
        return like, True