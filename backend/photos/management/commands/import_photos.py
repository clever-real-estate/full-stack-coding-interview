import csv
import os
from django.core.management.base import BaseCommand
from photos.models import Photo


class Command(BaseCommand):
    def handle(self, *args, **options):
        csv_file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), '..', 'photos.csv')
        
        if not os.path.exists(csv_file_path):
            self.stdout.write(self.style.ERROR(f'CSV file not found at {csv_file_path}'))
            return

        with open(csv_file_path, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            
            for row in reader:
                photo, created = Photo.objects.get_or_create(
                    id=row['id'],
                    defaults={
                        'width': row['width'],
                        'height': row['height'],
                        'url': row['url'],
                        'photographer': row['photographer'],
                        'photographer_url': row['photographer_url'],
                        'photographer_id': row['photographer_id'],
                        'avg_color': row['avg_color'],
                        'src_original': row['src.original'],
                        'src_large2x': row['src.large2x'],
                        'src_large': row['src.large'],
                        'src_medium': row['src.medium'],
                        'src_small': row['src.small'],
                        'src_portrait': row['src.portrait'],
                        'src_landscape': row['src.landscape'],
                        'src_tiny': row['src.tiny'],
                        'alt': row['alt'],
                    }
                )
                
                if created:
                    self.stdout.write(f'Created photo: {photo.photographer} - {photo.alt[:50]}')
                else:
                    self.stdout.write(f'Photo already exists: {photo.photographer} - {photo.alt[:50]}')

        self.stdout.write(self.style.SUCCESS('Successfully imported photos'))