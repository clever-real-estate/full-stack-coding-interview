from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from .models import Like


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Like model.
    """
    list_display = ('user_email', 'photo_info', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__email', 'photo__photographer', 'photo__alt_text')
    readonly_fields = ('id', 'created_at')
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Like Information', {
            'fields': ('user', 'photo')
        }),
        ('Metadata', {
            'fields': ('id', 'created_at'),
            'classes': ('collapse',)
        }),
    )
    
    def user_email(self, obj):
        """Return user email with link to user admin."""
        url = reverse('admin:authentication_user_change', args=[obj.user.id])
        return format_html('<a href="{}">{}</a>', url, obj.user.email)
    user_email.short_description = 'User'
    user_email.admin_order_field = 'user__email'
    
    def photo_info(self, obj):
        """Return photo info with link to photo admin."""
        url = reverse('admin:photos_photo_change', args=[obj.photo.id])
        photo_text = obj.photo.alt_text[:30] + '...' if len(obj.photo.alt_text) > 30 else obj.photo.alt_text
        return format_html('<a href="{}">{} by {}</a>', url, photo_text or 'Untitled', obj.photo.photographer)
    photo_info.short_description = 'Photo'
    photo_info.admin_order_field = 'photo__photographer'
    
    def get_queryset(self, request):
        """
        Optimize queryset with select_related for user and photo.
        """
        return super().get_queryset(request).select_related('user', 'photo')