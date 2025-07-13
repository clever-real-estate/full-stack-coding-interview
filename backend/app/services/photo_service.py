from app.repositories.photo_repository import PhotoRepository

class PhotoService:
    @staticmethod
    def create_photo(url, user_id):
        return PhotoRepository.create(url, user_id)

    @staticmethod
    def list_photos():
        return PhotoRepository.get_all_by_user_id()
    
    @staticmethod
    def list_photos_by_user_id(user_id, favorites=False):
        return PhotoRepository.get_all_by_user_id(user_id, favorites=favorites)
