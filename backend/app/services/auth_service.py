from flask_jwt_extended import create_access_token
class AuthService:
    @staticmethod
    def generate_token(user):        
        access_token =  create_access_token(identity=str(user['id']))
        return access_token


