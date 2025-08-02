import pandas as pd
from app.extensions import db
from app.models.photo import Photo
import os

current_dir = os.path.abspath(os.getcwd())
csv_dir = os.path.join(current_dir, "photos.csv") 

def seed_photos_from_csv(filepath=csv_dir):
    if Photo.query.first():
        return

    df = pd.read_csv(filepath)
    df.columns = [col.replace('.', '_') for col in df.columns] 

    for _, row in df.iterrows():
        photo = Photo(**row.to_dict())
        db.session.add(photo)
    db.session.commit()