import csv
import os
from sqlmodel import Session, select
from app.infra.db import db
from app.models import Photo

CSV_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "..", "photos.csv"
)


def row_to_photo(row):
    return Photo(
        photographer_name=row["photographer"],
        photographer_url=row["photographer_url"],
        avg_color=row["avg_color"],
        alt=row["alt"],
        image_url=row["src.original"],
    )  # type: ignore


def main():
    with open(CSV_PATH, newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        with Session(db.engine) as session:
            for row in reader:
                # Check if photo with same image_url already exists
                exists = session.exec(
                    select(Photo).where(Photo.image_url == row["src.original"])
                ).first()
                if exists:
                    print(f"Skipping existing photo: {row['src.original']}")
                    continue
                photo = row_to_photo(row)
                session.add(photo)
            session.commit()
    print("Photo import completed.")


if __name__ == "__main__":
    main()
