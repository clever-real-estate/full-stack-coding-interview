import csv

import requests
from clever.photos.models import Photo
from django.core.files.images import ImageFile
from django.core.files.temp import NamedTemporaryFile
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Load Photos"

    def handle(self, *args, **kwargs):
        file = open("clever/photos/management/commands/photos.csv")
        type(file)
        csvreader = csv.reader(file)
        next(csvreader)

        for row in csvreader:
            print("Creating photo:", row[0])

            url = row[8]
            response = requests.get(url, stream=True)

            if response.status_code == 200:
                img_temp = NamedTemporaryFile(delete=True)
                img_temp.write(response.content)
                img_temp.flush()
                img_name = url.split("/")[-1]

                data = {
                    "photographer": row[4],
                    "photographer_url": row[5],
                    "description": row[16],
                    "image_url": row[3],
                    "color": row[7],
                }

                photo = Photo.objects.create(**data)
                photo.image.save(img_name, ImageFile(img_temp))
                photo.save()
