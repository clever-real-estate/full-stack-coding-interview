# myapp/management/commands/import_photos.py

import csv
from django.core.management.base import BaseCommand
from photos.models import Photo

class Command(BaseCommand):    
    help = 'Import photos from CSV. This command should be run only once when the table is empty.'

    def handle(self, *args, **kwargs):
        path = 'media/photos.csv'

        with open(path, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                Photo.objects.create(
                    width=row['width'],
                    height=row['height'],
                    url=row['url'],
                    photographer=row['photographer'],
                    photographer_url=row['photographer_url'],
                    photographer_id=row['photographer_id'],
                    avg_color=row['avg_color'],
                    src_original=row['src.original'],
                    src_large2x=row['src.large2x'],
                    src_large=row['src.large'],
                    src_medium=row['src.medium'],
                    src_small=row['src.small'],
                    src_portrait=row['src.portrait'],
                    src_landscape=row['src.landscape'],
                    src_tiny=row['src.tiny'],
                    alt=row['alt']
                )

        self.stdout.write(self.style.SUCCESS('Photos imported successfully'))
