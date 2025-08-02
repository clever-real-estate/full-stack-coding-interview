from flask import Flask, request, jsonify
from flask_cors import CORS
from app.config import Config
from app.extensions import db
from app.routes.routes import register_routes
from flask_jwt_extended import JWTManager, verify_jwt_in_request

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    app.config.from_object(Config)
    jwt = JWTManager(app)
    
    db.init_app(app)
    @app.after_request
    def after_request(response):
        response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
        response.headers.add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
        return response
    @app.before_request
    def check_auth():
        unprotected_endpoints = ['user_controller.login']
        if request.endpoint not in unprotected_endpoints:
            try:
                verify_jwt_in_request()
            except Exception as e:
                app.logger.exception(e)
                return jsonify({"message": "Unauthorized"}), 401
                
        
    register_routes(app)
    app.url_map.strict_slashes = False

    return app
