from flask import Blueprint
from app.controllers.user_controller import bp as user_bp
from app.controllers.photo_controller import bp as photo_bp
from app.controllers.like_controller import bp as like_bp

def register_routes(app):
    app.register_blueprint(user_bp)
    app.register_blueprint(photo_bp)
    app.register_blueprint(like_bp)
