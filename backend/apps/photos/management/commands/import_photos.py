import csv
from django.core.management.base import BaseCommand
from django.conf import settings
from apps.photos.models import Photo

class Command(BaseCommand):
    help = "Import photos from backend/data/photos.csv"

    def handle(self, *args, **options):
        path = settings.BASE_DIR / "data" / "photos.csv"
        with open(path, newline="", encoding="utf-8") as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                Photo.objects.update_or_create(
                    photo_id=row["id"],
                    defaults={
                        "photographer": row.get("photographer", ""),
                        "alt": row.get("alt", ""),
                        "avg_color": row.get("avg_color", ""),
                        "portfolio": row.get("photographer_url", ""),
                        "medium_src": row.get("src.medium", "")
                    },
                )
        self.stdout.write(self.style.SUCCESS("Imported all photos."))
