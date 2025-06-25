import os
import json
import firebase_admin
from firebase_admin import credentials
from dotenv import load_dotenv

load_dotenv()

if not firebase_admin._apps:
    firebase_credentials = os.environ.get("FIREBASE_CREDENTIALS")

    if not firebase_credentials:
        raise ValueError("FIREBASE_CREDENTIALS not found in environment variables.")

    cred_dict = json.loads(firebase_credentials)
    cred_dict["private_key"] = cred_dict["private_key"].replace("\\n", "\n")

    cred = credentials.Certificate(cred_dict)
    firebase_admin.initialize_app(cred)