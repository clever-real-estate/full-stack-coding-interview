"""
Django Management Command: Import Photos from CSV

This command imports photo data from the provided CSV file into the database.
It handles photographer and photo creation with duplicate checking.

Usage:
    python manage.py import_photos path/to/photos.csv
    python manage.py import_photos path/to/photos.csv --skip-duplicates
    python manage.py import_photos path/to/photos.csv --update-duplicates
    python manage.py import_photos path/to/photos.csv --dry-run

Features:
- Automatic photographer creation/lookup
- Duplicate photo handling (skip, update, or create copies)
- Dry run mode for testing
- Progress reporting
- Error handling and logging
- Data validation
"""

import csv

from django.core.exceptions import ValidationError
from django.core.management.base import BaseCommand, CommandError
from django.core.validators import URLValidator
from django.db import transaction

from photo_gallery.models import Photo, Photographer


class Command(BaseCommand):
    help = "Import photos from CSV file with photographer and photo data"

    def add_arguments(self, parser):
        parser.add_argument("csv_file", type=str, help="Path to the CSV file")
        parser.add_argument(
            "--skip-duplicates",
            action="store_true",
            help="Skip photos that already exist (based on URL)",
        )
        parser.add_argument(
            "--update-duplicates",
            action="store_true",
            help="Update existing photos with new data",
        )
        parser.add_argument(
            "--dry-run", action="store_true", help="Run without making database changes"
        )

    def handle(self, *args, **options):
        csv_file = options["csv_file"]
        skip_duplicates = options["skip_duplicates"]
        update_duplicates = options["update_duplicates"]
        dry_run = options["dry_run"]

        if skip_duplicates and update_duplicates:
            raise CommandError(
                "Cannot use both --skip-duplicates and --update-duplicates"
            )

        try:
            with open(csv_file, "r", encoding="utf-8") as file:
                reader = csv.DictReader(file)
                self.import_photos(reader, skip_duplicates, update_duplicates, dry_run)
        except FileNotFoundError:
            raise CommandError(f"File not found: {csv_file}")
        except Exception as e:
            raise CommandError(f"Error reading CSV file: {e}")

    def import_photos(self, reader, skip_duplicates, update_duplicates, dry_run):
        """Import photos from CSV reader."""
        created_photographers = 0
        created_photos = 0
        updated_photos = 0
        skipped_photos = 0
        errors = 0

        self.stdout.write("Starting photo import...")
        if dry_run:
            self.stdout.write(
                self.style.WARNING("DRY RUN MODE - No changes will be made")
            )

        for row_num, row in enumerate(reader, start=2):  # Start at 2 for header row
            try:
                with transaction.atomic():
                    # Create or get photographer
                    photographer_data = {
                        "name": row["photographer"],
                        "url": (
                            row["photographer_url"] if row["photographer_url"] else None
                        ),
                        "pexels_id": int(row["photographer_id"]),
                    }

                    if not dry_run:
                        photographer, photographer_created = (
                            Photographer.objects.get_or_create(
                                pexels_id=photographer_data["pexels_id"],
                                defaults=photographer_data,
                            )
                        )
                        if photographer_created:
                            created_photographers += 1
                            self.stdout.write(
                                f"Created photographer: {photographer.name}"
                            )
                    else:
                        photographer = None
                        photographer_created = not Photographer.objects.filter(
                            pexels_id=photographer_data["pexels_id"]
                        ).exists()

                    # Prepare photo data
                    photo_data = {
                        "photographer": photographer,
                        "width": int(row["width"]) if row["width"] else None,
                        "height": int(row["height"]) if row["height"] else None,
                        "url": row["url"],
                        "alt": row["alt"] if row["alt"] else None,
                        "avg_color": row["avg_color"] if row["avg_color"] else None,
                        "src_original": (
                            row["src.original"] if row["src.original"] else None
                        ),
                        "src_large2x": (
                            row["src.large2x"] if row["src.large2x"] else None
                        ),
                        "src_large": row["src.large"] if row["src.large"] else None,
                        "src_medium": row["src.medium"] if row["src.medium"] else None,
                        "src_small": row["src.small"] if row["src.small"] else None,
                        "src_portrait": (
                            row["src.portrait"] if row["src.portrait"] else None
                        ),
                        "src_landscape": (
                            row["src.landscape"] if row["src.landscape"] else None
                        ),
                        "src_tiny": row["src.tiny"] if row["src.tiny"] else None,
                    }

                    # Validate required URLs
                    self._validate_url(photo_data["url"], f"Row {row_num}: Main URL")

                    # Check for existing photo
                    existing_photo = None
                    if not dry_run:
                        existing_photo = Photo.objects.filter(
                            url=photo_data["url"]
                        ).first()
                    else:
                        existing_photo = Photo.objects.filter(
                            url=photo_data["url"]
                        ).exists()

                    if existing_photo and skip_duplicates:
                        skipped_photos += 1
                        self.stdout.write(
                            f"Skipped duplicate photo: {photo_data['url']}"
                        )
                        continue

                    if existing_photo and update_duplicates:
                        if not dry_run:
                            for key, value in photo_data.items():
                                if key != "photographer" and value is not None:
                                    setattr(existing_photo, key, value)
                            existing_photo.photographer = photographer
                            existing_photo.save()
                        updated_photos += 1
                        self.stdout.write(f"Updated photo: {photo_data['url']}")
                        continue

                    # Create new photo
                    if not dry_run:
                        Photo.objects.create(**photo_data)
                    created_photos += 1

                    if row_num % 10 == 0:
                        self.stdout.write(f"Processed {row_num - 1} rows...")

            except Exception as e:
                errors += 1
                self.stderr.write(f"Error processing row {row_num}: {e}")
                if not dry_run:
                    transaction.rollback()

        # Print summary
        self.stdout.write("\n" + "=" * 50)
        self.stdout.write("IMPORT SUMMARY")
        self.stdout.write("=" * 50)
        self.stdout.write(f"Photographers created: {created_photographers}")
        self.stdout.write(f"Photos created: {created_photos}")
        self.stdout.write(f"Photos updated: {updated_photos}")
        self.stdout.write(f"Photos skipped: {skipped_photos}")
        self.stdout.write(f"Errors: {errors}")

        if dry_run:
            self.stdout.write(
                self.style.WARNING(
                    "\nThis was a dry run - no changes were made to the database"
                )
            )
        else:
            self.stdout.write(
                self.style.SUCCESS(f"\nSuccessfully imported {created_photos} photos!")
            )

    def _validate_url(self, url, context):
        """Validate URL format."""
        if not url:
            return

        validator = URLValidator()
        try:
            validator(url)
        except ValidationError:
            raise CommandError(f"Invalid URL format in {context}: {url}")
