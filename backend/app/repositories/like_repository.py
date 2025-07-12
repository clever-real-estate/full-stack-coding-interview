from app.extensions import db
from app.models.like import Like

class LikeRepository:
    @staticmethod
    def create_like(data):
        like = Like(user_id=data['user_id'], photo_id=data['photo_id'])
        db.session.add(like)
        db.session.commit()
        return {'user_id': like.user_id, 'photo_id': like.photo_id}
    @staticmethod
    def get_all_likes():
        likes = Like.query.all()
        return [{'user_id': l.user_id, 'photo_id': l.photo_id} for l in likes]
    @staticmethod
    def get_like(user_id, photo_id):
        like = Like.query.filter_by(user_id=user_id, photo_id=photo_id).first()
        if like:
            return {'user_id': like.user_id, 'photo_id': like.photo_id}
        return None
    @staticmethod
    def delete_like(user_id, photo_id):
        like = Like.query.filter_by(user_id=user_id, photo_id=photo_id).first()
        if like:
            db.session.delete(like)
            db.session.commit()
            return True
        return False 