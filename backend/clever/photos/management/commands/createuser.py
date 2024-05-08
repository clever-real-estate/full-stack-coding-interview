from django.contrib.auth.models import User
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create User"

    def handle(self, *args, **kwargs):
        user = User.objects.create(
            first_name="Felipe",
            last_name="Faria",
            email="felipe@listwithclever.com",
            username="clever",
        )
        user.set_password("clever")
        user.save()
