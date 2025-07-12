from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.photo_service import PhotoService
from app.models import PhotoSchema
bp = Blueprint("photo_controller", __name__, url_prefix="/photos")

@bp.route("", methods=["GET"])

def list_photos():
    user_id = get_jwt_identity()
    favorites = request.args.get('favorites', 'false').lower() == 'true'
    photos = PhotoService.list_photos_by_user_id(user_id, favorites=favorites)
    return jsonify(photos)

@bp.route("", methods=["POST"])

def create_photo():
    data = request.get_json()
    errors = PhotoSchema(only=["url"]).validate(data)
    if errors:
        return jsonify({"errors": errors}), 400
    photo = PhotoService.create_photo(data["url"], user_id = get_jwt_identity())
    return jsonify({"id": photo.id, "url": photo.url, "user_id": photo.user_id}), 201
