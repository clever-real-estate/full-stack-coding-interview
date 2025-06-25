from django.db import models # type: ignore

class Photo(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    image_url = models.URLField()
    photographer = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    hex_color = models.CharField(max_length=7)
    portfolio_url = models.URLField()

    def __str__(self):
        return self.photographer
    

class Favorite(models.Model):
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, related_name="favorites")
    user_id = models.CharField(max_length=255)

    class Meta:
        unique_together = ('photo', 'user_id') 

    def __str__(self):
        return f"Favorite photo {self.photo.id} by user {self.user_id}"