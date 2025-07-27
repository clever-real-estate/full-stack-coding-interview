import csv
from django.core.management.base import BaseCommand
from django.db import transaction
from photos.models import Photo, Photographer
import os

class Command(BaseCommand):
    help = 'Imports photos and photographers from a specified CSV file into the database.'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='The absolute path to the CSV file.')
        parser.add_argument(
            '--flush',
            action='store_true',
            help='Delete all existing photos and photographers before importing.',
        )

    @transaction.atomic
    def handle(self, *_, **options):
        csv_file_path = options['csv_file']
        flush_data = options['flush']

        if not os.path.exists(csv_file_path):
            self.stdout.write(self.style.ERROR(f"File not found at: {csv_file_path}"))
            return

        if flush_data:
            self.stdout.write(self.style.WARNING('Flushing all existing photos and photographers...'))
            Photographer.objects.all().delete()
            Photo.objects.all().delete()
            self.stdout.write(self.style.SUCCESS('...done.'))

        self.stdout.write(self.style.SUCCESS(f'Starting import from {csv_file_path}'))

        # Use a set to find unique photographers by their URL to avoid redundant processing
        photographer_urls = set()
        with open(csv_file_path, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            rows = list(reader)
            for row in rows:
                if row.get('photographer_url'):
                    photographer_urls.add(row['photographer_url'])

        # Step 1: Efficiently create or update photographers (avoids N+1 problem)
        photographer_cache = {}
        for row in rows:
            url = row.get('photographer_url')
            if url and url not in photographer_cache:
                photographer, _ = Photographer.objects.update_or_create(
                    url=url,
                    defaults={'name': row.get('photographer')}
                )
                photographer_cache[url] = photographer

        self.stdout.write(self.style.SUCCESS(f"Processed {len(photographer_cache)} unique photographers."))

        # Step 2: Prepare all Photo objects for a single bulk insert.
        photos_to_create = []
        for row in rows:
            photographer = photographer_cache.get(row.get('photographer_url'))
            # The image_url must be unique, so we can use it as a key to avoid duplicates
            if not row.get('src.original'):
                self.stdout.write(self.style.WARNING(f"Skipping row with missing 'src.original': {row.get('id')}"))
                continue

            photos_to_create.append(
                Photo(
                    image_url=row['src.original'],
                    color=row.get('avg_color', '#FFFFFF'), # Provide a default color
                    alt_text=row.get('alt'),
                    photographer=photographer
                )
            )

        # Step 3: Insert all photos in one go.
        # `ignore_conflicts=True` will prevent crashes on duplicate `image_url` if any exist in the database from a previous run (if not flushing).
        created_photos = Photo.objects.bulk_create(photos_to_create, batch_size=500, ignore_conflicts=True)
        self.stdout.write(self.style.SUCCESS(f"Import complete. Created {len(created_photos)} new photos."))
 
