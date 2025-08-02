from flask import Blueprint, request, jsonify
from app.services.user_service import UserService
from app.services.auth_service import AuthService
from app.models import UserSchema

bp = Blueprint("user_controller", __name__, url_prefix="/users")

@bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        errors = UserSchema(only=["username", "password"]).validate(data, many=False)
        if errors:
            first_field = next(iter(errors))
            return jsonify({"message": f"{first_field} is required", "error": 'Validation error'}), 400
        token, user = UserService.authenticate(data)
        if "password" in user:
            user = {k: v for k, v in user.items() if k != "password"}
        return jsonify({"token": token, "user": user})
    except Exception as e:
        return jsonify({'message': str(e)}), 404



@bp.route("", methods=["GET"])
def list_users():
    users = UserService.list_users()
    return jsonify([{"id": u.id, "username": u.username} for u in users])

@bp.route("", methods=["POST"])
def register():
    data = request.get_json()
    errors = UserSchema(only=["username", "password"]).validate(data)
    if errors:
        return jsonify({"errors": errors}), 400
    user = UserService.create_user(data["username"], data["password"])
    return jsonify({"id": user.id, "username": user.username}), 201

