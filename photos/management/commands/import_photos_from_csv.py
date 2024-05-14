import csv

from django.contrib.auth import get_user_model
from django.core.management import BaseCommand
from django.db import transaction

from photos.models import Photographer, Photo


class Command(BaseCommand):
    help = "Create user and populate DB with Photos and Photographers based on data in photos.csv"

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to the CSV file')
        parser.add_argument('user', type=str, help='Crete a test user or use an existing one.')

    def handle(self, *args, **options):
        if not options['csv_file']:
            self.stdout.write(self.style.ERROR('You must provide a path to the CSV file.'))
            return

        if not options['user']:
            self.stdout.write(self.style.ERROR('You must provide a username.'))
            return
        try:
            user = get_user_model().objects.get(username=options['user'])
            if user and user.photos.count() > 0:
                self.stdout.write(self.style.ERROR(f'User {user} already has photos in the database.'))
                return
        except get_user_model().DoesNotExist:
            user = get_user_model().objects.create_user(username=options['user'],
                                                            email=options['user'] + '@test.com',
                                                            password='testing123')
            self.stdout.write(self.style.SUCCESS(f'User {user} created successfully and email is {user.email}'))

        try:
            with open(options['csv_file'], 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)

                with transaction.atomic():
                    for row in reader:
                        photographer, created = Photographer.objects.get_or_create(
                            name=row['photographer'],
                            photographer_id=row['photographer_id'],
                            portfolio=row['photographer_url']
                        )

                        photo, created = Photo.objects.get_or_create(
                            photographer=photographer,
                            photo_id=row['id'],
                            defaults={
                                'width': row['width'],
                                'height': row['height'],
                                'url': row['url'],
                                'avg_color': row['avg_color'],
                                'original_url': row['src.original'],
                                'large2x_url': row['src.large2x'],
                                'large_url': row['src.large'],
                                'medium_url': row['src.medium'],
                                'small_url': row['src.small'],
                                'portrait_url': row['src.portrait'],
                                'landscape_url': row['src.landscape'],
                                'tiny_url': row['src.tiny'],
                                'description': row['alt']
                            }
                        )

                        user.photos.add(photo)

                self.stdout.write(self.style.SUCCESS('Successfully imported photos to the database.'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred while populating the database: {e}'))
