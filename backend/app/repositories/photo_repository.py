from app.models.photo import Photo
from app.models.like import Like
from app.extensions import db

class PhotoRepository:
    @staticmethod
    def create(url, user_id):
        photo = Photo(url=url, user_id=user_id)
        db.session.add(photo)
        db.session.commit()
        return photo

    @staticmethod
    def get_all(user_id):
        photos = Photo.query.all()

        return [p.to_dict() for p in photos]
    @staticmethod
    def get_all_by_user_id(user_id, favorites=False):
        liked_photo_ids = set(l.photo_id for l in Like.query.filter_by(user_id=user_id).all())
        if favorites:
            photos = Photo.query.filter(Photo.id.in_(liked_photo_ids)).all()
            return [
                {**p.to_dict(), 'is_liked': True}
                for p in photos
            ]

        photos = Photo.query.all()
        result = []
        for photo in photos:
            photo_dict = photo.to_dict()
            photo_dict['is_liked'] = photo.id in liked_photo_ids
            result.append(photo_dict)
        return result
