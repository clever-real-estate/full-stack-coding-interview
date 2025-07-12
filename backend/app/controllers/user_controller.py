from flask import Blueprint, request, jsonify
from app.services.user_service import UserService
from app.services.auth_service import AuthService

bp = Blueprint("user_controller", __name__, url_prefix="/users")

@bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        token, user = UserService.authenticate(data)
        return jsonify({"token": token, "user": user})
    except Exception as e:
        return jsonify({'error': str(e)}), 401



@bp.route("", methods=["GET"])
def list_users():
    users = UserService.list_users()
    return jsonify([{"id": u.id, "username": u.username} for u in users])

@bp.route("", methods=["POST"])
def register():
    data = request.get_json()
    user = UserService.create_user(data["username"], data["password"])
    return jsonify({"id": user.id, "username": user.username}), 201

