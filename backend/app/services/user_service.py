from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.services.auth_service import AuthService

import bcrypt
class UserService:
    @staticmethod
    def authenticate(data):
        username = data['username']
        password = data['password']
        user = UserRepository.find_by_username(username)
        if user is None:
            raise Exception('User not found') 
        if not bcrypt.checkpw(password.encode(), user['password'].encode()):
            raise Exception('Wrong password')
        token = AuthService.generate_token(user)
        return token, user

    @staticmethod
    def create_user(username, password):
        user = User(username=username, password=password)
        hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        user.password = hashed
        UserRepository.save(user)
        return user

    @staticmethod
    def list_users():
        from app.extensions import db
        return db.session.query(User).all()
