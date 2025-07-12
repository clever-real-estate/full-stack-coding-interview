from app.repositories.like_repository import LikeRepository

class LikeService:
    @staticmethod
    def create_like(data):
        return LikeRepository.create_like(data)
    @staticmethod
    def get_all_likes():
        return LikeRepository.get_all_likes()
    @staticmethod
    def get_like( user_id, photo_id):
        return LikeRepository.get_like(user_id, photo_id)
    @staticmethod
    def delete_like(user_id, photo_id):
        return LikeRepository.delete_like(user_id, photo_id) 