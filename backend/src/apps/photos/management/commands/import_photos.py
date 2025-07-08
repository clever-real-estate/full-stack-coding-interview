import csv
import os
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from apps.photos.models import Photo


class Command(BaseCommand):
    """
    Django management command to import photos from a CSV file.
    
    Usage:
        python manage.py import_photos path/to/photos.csv
    """
    help = 'Import photos from a CSV file'
    
    def add_arguments(self, parser):
        parser.add_argument(
            'csv_file',
            type=str,
            help='Path to the CSV file containing photo data'
        )
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Run import without actually saving to database'
        )
        parser.add_argument(
            '--update-existing',
            action='store_true',
            help='Update existing photos if they already exist (based on pexels_id)'
        )
    
    def handle(self, *args, **options):
        csv_file_path = options['csv_file']
        dry_run = options['dry_run']
        update_existing = options['update_existing']
        
        # Validate file existence
        if not os.path.exists(csv_file_path):
            raise CommandError(f'CSV file "{csv_file_path}" does not exist.')
        
        if not csv_file_path.endswith('.csv'):
            raise CommandError('File must be a CSV file with .csv extension.')
        
        self.stdout.write(f'Starting import from: {csv_file_path}')
        if dry_run:
            self.stdout.write(self.style.WARNING('DRY RUN MODE - No data will be saved'))
        
        # Track statistics
        stats = {
            'processed': 0,
            'created': 0,
            'updated': 0,
            'skipped': 0,
            'errors': 0
        }
        
        try:
            with open(csv_file_path, 'r', encoding='utf-8') as file:
                # Use standard comma delimiter
                reader = csv.DictReader(file, delimiter=',')
                
                # Validate required columns
                required_columns = ['id', 'width', 'height', 'url', 'photographer', 'src.original', 'alt']
                missing_columns = [col for col in required_columns if col not in reader.fieldnames]
                
                if missing_columns:
                    raise CommandError(f'Missing required columns: {", ".join(missing_columns)}')
                
                self.stdout.write(f'Found {len(reader.fieldnames)} columns in CSV')
                
                # Process photos in a transaction
                with transaction.atomic():
                    for row_num, row in enumerate(reader, start=2):  # Start at 2 because row 1 is headers
                        stats['processed'] += 1
                        
                        try:
                            photo_data = self._parse_photo_row(row)
                            
                            if not dry_run:
                                created, updated = self._create_or_update_photo(photo_data, update_existing)
                                if created:
                                    stats['created'] += 1
                                    self.stdout.write(f'✓ Created: {photo_data["pexels_id"]} by {photo_data["photographer"]}')
                                elif updated:
                                    stats['updated'] += 1
                                    self.stdout.write(f'✓ Updated: {photo_data["pexels_id"]} by {photo_data["photographer"]}')
                                else:
                                    stats['skipped'] += 1
                                    self.stdout.write(f'- Skipped: {photo_data["pexels_id"]} (already exists)')
                            else:
                                self.stdout.write(f'✓ Would process: {photo_data["pexels_id"]} by {photo_data["photographer"]}')
                                stats['created'] += 1  # For dry run reporting
                        
                        except Exception as e:
                            stats['errors'] += 1
                            self.stdout.write(
                                self.style.ERROR(f'✗ Error processing row {row_num}: {str(e)}')
                            )
                            
                            # Continue processing other rows instead of stopping
                            continue
                        
                        # Progress indicator every 10 rows
                        if stats['processed'] % 10 == 0:
                            self.stdout.write(f'Processed {stats["processed"]} rows...')
                    
                    # Rollback if dry run
                    if dry_run:
                        transaction.set_rollback(True)
        
        except Exception as e:
            raise CommandError(f'Error reading CSV file: {str(e)}')
        
        # Print final statistics
        self._print_stats(stats, dry_run)
    
    def _parse_photo_row(self, row):
        """
        Parse a CSV row into photo data dictionary.
        """
        # Clean and validate data
        pexels_id = self._clean_integer(row.get('id'), 'pexels_id')
        width = self._clean_integer(row.get('width'), 'width')
        height = self._clean_integer(row.get('height'), 'height')
        photographer_id = self._clean_integer(row.get('photographer_id'), 'photographer_id', required=False)
        
        return {
            'pexels_id': pexels_id,
            'width': width,
            'height': height,
            'url': self._clean_url(row.get('url'), 'url'),
            'photographer': self._clean_string(row.get('photographer'), 'photographer'),
            'photographer_url': self._clean_url(row.get('photographer_url'), 'photographer_url', required=False),
            'photographer_id': photographer_id,
            'avg_color': self._clean_string(row.get('avg_color'), 'avg_color', required=False),
            'src_original': self._clean_url(row.get('src.original'), 'src_original'),
            'src_large': self._clean_url(row.get('src.large2x') or row.get('src.large'), 'src_large', required=False),
            'src_medium': self._clean_url(row.get('src.medium'), 'src_medium', required=False),
            'src_small': self._clean_url(row.get('src.small'), 'src_small', required=False),
            'alt_text': self._clean_string(row.get('alt'), 'alt_text', required=False) or '',
        }
    
    def _clean_integer(self, value, field_name, required=True):
        """Clean and validate integer fields."""
        if not value or value.strip() == '':
            if required:
                raise ValueError(f'{field_name} is required')
            return None
        
        try:
            int_value = int(value.strip())
            if int_value <= 0:
                raise ValueError(f'{field_name} must be positive')
            return int_value
        except ValueError:
            raise ValueError(f'{field_name} must be a valid positive integer')
    
    def _clean_string(self, value, field_name, required=True, max_length=255):
        """Clean and validate string fields."""
        if not value or value.strip() == '':
            if required:
                raise ValueError(f'{field_name} is required')
            return ''
        
        cleaned = value.strip()
        if len(cleaned) > max_length:
            cleaned = cleaned[:max_length]
            self.stdout.write(
                self.style.WARNING(f'Truncated {field_name} to {max_length} characters')
            )
        
        return cleaned
    
    def _clean_url(self, value, field_name, required=True):
        """Clean and validate URL fields."""
        if not value or value.strip() == '':
            if required:
                raise ValueError(f'{field_name} is required')
            return ''
        
        url = value.strip()
        if not url.startswith(('http://', 'https://')):
            raise ValueError(f'{field_name} must be a valid URL starting with http:// or https://')
        
        return url
    
    def _create_or_update_photo(self, photo_data, update_existing):
        """
        Create or update a photo in the database.
        Returns tuple (created, updated).
        """
        try:
            photo = Photo.objects.get(pexels_id=photo_data['pexels_id'])
            
            if update_existing:
                # Update existing photo
                for field, value in photo_data.items():
                    if field != 'pexels_id':  # Don't update the pexels_id
                        setattr(photo, field, value)
                photo.save()
                return False, True
            else:
                # Photo exists and we're not updating
                return False, False
                
        except Photo.DoesNotExist:
            # Create new photo
            Photo.objects.create(**photo_data)
            return True, False
    
    def _print_stats(self, stats, dry_run):
        """Print import statistics."""
        self.stdout.write('\n' + '='*50)
        self.stdout.write(self.style.SUCCESS('IMPORT COMPLETED'))
        if dry_run:
            self.stdout.write(self.style.WARNING('(DRY RUN - No data was actually saved)'))
        self.stdout.write('='*50)
        
        self.stdout.write(f'Total rows processed: {stats["processed"]}')
        self.stdout.write(self.style.SUCCESS(f'Photos created: {stats["created"]}'))
        
        if stats['updated'] > 0:
            self.stdout.write(self.style.SUCCESS(f'Photos updated: {stats["updated"]}'))
        
        if stats['skipped'] > 0:
            self.stdout.write(self.style.WARNING(f'Photos skipped: {stats["skipped"]}'))
        
        if stats['errors'] > 0:
            self.stdout.write(self.style.ERROR(f'Errors: {stats["errors"]}'))
        
        success_rate = ((stats['processed'] - stats['errors']) / stats['processed'] * 100) if stats['processed'] > 0 else 0
        self.stdout.write(f'Success rate: {success_rate:.1f}%')