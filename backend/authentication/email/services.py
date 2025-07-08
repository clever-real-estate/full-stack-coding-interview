import logging

from django.conf import settings
from django.core.mail import send_mail

logger = logging.getLogger(__name__)


class EmailService:
    @staticmethod
    def send_welcome_email(user):
        """Send welcome email to newly registered user."""

        subject = f"Welcome to Photo Gallery, {user.first_name}!"
        message = f"""
        Hi {user.first_name},
        
        Welcome to Photo Gallery! Your account has been successfully created.
        
        You can now:

        - Browse beautiful photos
        - Like your favorite images
        
        Happy browsing!
        
        The Photo Gallery Team
        """

        # Send simple text email
        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=settings.DEBUG,
            )
        except:
            raise

    @staticmethod
    def send_password_reset_email(user, new_password):
        """Send new password to user who forgot their password."""

        subject = "Password Reset - Photo Gallery"
        message = f"""
        Hi {user.first_name or user.username},
        
        You requested a password reset for your Photo Gallery account.
        
        Your new temporary password is: {new_password}
        
        IMPORTANT SECURITY NOTICE:
        - Please log in with this temporary password immediately
        - Change your password to something secure after logging in
        - This temporary password will work until you change it
        - If you didn't request this reset, please contact support
        
        Username: {user.username}
        Email: {user.email}
        
        For security reasons, we recommend:
        1. Log in with the temporary password above
        2. Go to your profile settings
        3. Change to a strong, unique password
        4. Use a password manager for future security
        
        Best regards,
        The Photo Gallery Team
        
        ---
        If you didn't request this password reset, please ignore this email
        or contact our support team immediately.
        """

        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=settings.DEBUG,
            )
        except Exception as e:
            logger.error(f"Failed to send password reset email to {user.email}: {e}")
            raise
