"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap

from api.models import db, User, Worker, Property
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands


from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# Allow CORS requests to this API
CORS(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "super-fancy-secret"  # Change this "super secret" to something else!
jwt = JWTManager(app)

# Authenticate user and generate token
@app.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Query your database for username and password
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        # The user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401
    
    # Create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({"msg": "successfully authenticated",
                    "token": access_token,
                    "id": user.id,
                    "email": user.email })


 # Protect a route with jwt_required, which will kick out requests without a valid JWT
@app.route("/auth/user", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({
        "msg": "successfully authenticated",
        "id": user.id, "email": user.email }), 200

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response



@app.route('/property/all', methods=['GET'])
def get_all_property():

    all_property= Property.query.all()
    final= list(map(lambda x: x.serialize(), all_property))
   
    return  jsonify(final)


@app.route('/user/all', methods=['GET'])
def get_all_host():

    all_user= User.query.all()
    final= list(map(lambda x: x.serialize(), all_user))
   
    return  jsonify(final)


@app.route('/worker/all', methods=['GET'])
def get_all_worker():

    all_user= Worker.query.all()
    final= list(map(lambda x: x.serialize(), all_user))
   
    return  jsonify(final)







@app.route('/user/new/load', methods=['POST'])
def add_newuser_load():
    request_body=request.json
    for el in request_body:
              
        
        test_user= User.query.filter_by(email=el['email']).first()
    
        if(test_user):
               print(f"This one already exists"), 500
        
        else:
                 newU=User (full_name=el['name'], email=el['email'],password= el['password'], phone=el['phone'], address=el['address']  )
                 db.session.add(newU)
                 db.session.commit()
    return jsonify(f"Success"), 200        
     


# @app.route('/property/new/load/test', methods=['POST'])
# def add_newproperty_load2():
#     request_body=request.json
#     print('function works')
    
#     # for el in request_body:
              
        
#         # test_property= Property.query.filter_by(name=el['name']).first()
    
#         # if(test_property):
#         #    print(f"This one already exists")
        
#         # else:
#         # newP=Property(user_id= el['user_id'], name=el['name'], city=el['city'], state=el['state'], beds= el['beds'], bath= el['bath'], address=el['address'], img=el['images']  )
#         # db.session.add(newP)
#         # db.session.commit()
#         #print('This is our test ', el)
            
#     return jsonify(request_body),200
           
     











# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
