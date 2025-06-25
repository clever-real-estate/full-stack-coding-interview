from firebase_admin import auth
from rest_framework.response import Response
from rest_framework import status
from functools import wraps

def firebase_authenticated(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        id_token = None

        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            id_token = auth_header.split("Bearer ")[1]

        if not id_token:
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            decoded_token = auth.verify_session_cookie(id_token, check_revoked=True)
            request.firebase_user = decoded_token
        except auth.InvalidSessionCookieError:
            return Response({"error": "Invalid session"}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception:
            return Response({"error": "Authentication failed"}, status=status.HTTP_401_UNAUTHORIZED)

        return view_func(request, *args, **kwargs)
    return wrapper
