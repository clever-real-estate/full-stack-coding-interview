from app.models.user import User
from app.extensions import db

class UserRepository:
    @staticmethod
    def find_by_id(user_id):
        return User.query.get({'id': user_id})
    
    @staticmethod
    def find_by_username(username):
        user = User.query.filter_by(username=username).first()
        return user.to_dict()

    @staticmethod
    def save(user):
        db.session.add(user)
        db.session.commit()
