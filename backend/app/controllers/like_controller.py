from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.services.like_service import LikeService

bp = Blueprint("like_controller", __name__, url_prefix="/likes")

@bp.route('', methods=['POST'])

def create_like():
    data = request.get_json()
    like = LikeService.create_like(data)
    return jsonify(like), 201

@bp.route('', methods=['GET'])

def get_likes():
    likes = LikeService.get_all_likes()
    return jsonify(likes), 200

@bp.route('/<int:user_id>/<int:photo_id>', methods=['GET'])

def get_like(user_id, photo_id):
    like = LikeService.get_like(user_id, photo_id)
    if like:
        return jsonify(like), 200
    return jsonify({'error': 'Like not found'}), 404

@bp.route('/<int:user_id>/<int:photo_id>', methods=['DELETE'])

def delete_like(user_id, photo_id):
    result = LikeService.delete_like(user_id, photo_id)
    if result:
        return jsonify({'message': 'Like deleted'}), 200
    return jsonify({'error': 'Like not found'}), 404 