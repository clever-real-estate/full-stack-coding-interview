from app.main import create_app
from app.extensions import db
from app.seeds.photo_seeds import seed_photos_from_csv
from app.seeds.user_seed import seed_users
app = create_app()

with app.app_context():
    db.create_all()
    seed_users()
    seed_photos_from_csv()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
