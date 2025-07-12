import bcrypt
from app.extensions import db
from app.models.user import User

def seed_users():
    if User.query.first():
        return

    users = [
        {"username": "user1", "password": "password1"},
        {"username": "user2", "password": "password2"},
        {"username": "admin", "password": "adminpass"},
    ]

    for user_data in users:
        hashed = bcrypt.hashpw(user_data["password"].encode(), bcrypt.gensalt()).decode()
        user = User(username=user_data["username"], password=hashed)
        db.session.add(user)
    db.session.commit()
