from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import Photo


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Photo model.
    """
    list_display = (
        'pexels_id', 
        'photographer', 
        'alt_text_short', 
        'dimensions', 
        'like_count_display',
        'created_at'
    )
    list_filter = ('photographer', 'created_at')
    search_fields = ('photographer', 'alt_text', 'pexels_id')
    readonly_fields = (
        'id', 
        'created_at', 
        'updated_at', 
        'like_count_display',
        'image_preview'
    )
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('pexels_id', 'photographer', 'photographer_id', 'alt_text')
        }),
        ('Image Details', {
            'fields': ('width', 'height', 'avg_color', 'image_preview')
        }),
        ('URLs', {
            'fields': ('url', 'photographer_url', 'src_original', 'src_large', 'src_medium', 'src_small'),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('id', 'like_count_display', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def alt_text_short(self, obj):
        """Return truncated alt text for list display."""
        if obj.alt_text:
            return obj.alt_text[:50] + '...' if len(obj.alt_text) > 50 else obj.alt_text
        return 'No alt text'
    alt_text_short.short_description = 'Alt Text'
    
    def dimensions(self, obj):
        """Return formatted dimensions."""
        return f"{obj.width} × {obj.height}"
    dimensions.short_description = 'Dimensions'
    
    def like_count_display(self, obj):
        """Return the number of likes with a link to the likes."""
        count = obj.get_like_count()
        if count > 0:
            url = reverse('admin:likes_like_changelist') + f'?photo__id__exact={obj.id}'
            return format_html('<a href="{}">{} likes</a>', url, count)
        return '0 likes'
    like_count_display.short_description = 'Likes'
    
    def image_preview(self, obj):
        """Return an image preview for the admin."""
        if obj.src_small:
            return format_html(
                '<img src="{}" alt="{}" style="max-width: 200px; max-height: 200px;" />',
                obj.src_small,
                obj.alt_text or 'Photo preview'
            )
        return 'No preview available'
    image_preview.short_description = 'Preview'
    
    def get_queryset(self, request):
        """
        Optimize queryset with prefetch_related for likes.
        """
        return super().get_queryset(request).prefetch_related('likes')