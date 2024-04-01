"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Worker, Property, Payment
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/user/login', methods=['POST'])
def login_test():
        request_body=request.json
        
        test_user= User.query.filter_by(email=request_body[0]).first().id
        
        if(test_user):
            test_password= User.query.filter_by(email=request_body[0]).first().password
            test_name= User.query.filter_by(email=request_body[0]).first().name
           
            if str(test_password)==request_body[1]:  
                test=[test_user, test_name]   
                    
                return jsonify(test)
            else:
                return jsonify(f"Incorrect email or password"), 400
                 
                       
        else:
              return jsonify(f"Incorrect email or password"), 400
        


@api.route('/user/new', methods=['POST'])
def add_newuser():
        request_body=request.json
        
        test_user= User.query.filter_by(email=request_body['email']).first()
    
        if(test_user):
             return jsonify(f"User already exists"), 500
        
        else:
             newU=User ( name=request_body['name'], email=request_body['email'],password= request_body[2] )
             db.session.add(newU)
             db.session.commit()
             return jsonify(f"Success"), 200

@api.route('/user/<id>/new/property', methods=['POST'])
def add_newProperty(id):
        request_body=request.json
        
        test_property= property.query.filter_by(name=request_body[0], user_id=id).first()
    
        if(test_property):
             return jsonify(f"Property already exists"), 400
        
        else:
             newP=property (user_id=id , name=request_body['name'], city=request_body[1], state=request_body[2], address=request_body[3],beds= request_body[4],bath= request_body[4], img=request_body[6]  )
             db.session.add(newP)
             db.session.commit()
             return jsonify(f"Success"), 200


@api.route('/user/<id>/delete/property/<idP>', methods=['DELETE'])
def remove_Property(id,idP):
        request_body=request.json
        
        test_property= property.query.get(idP=id)
    
        if test_property :
             return jsonify(f"Property already exists"), 400
        
        else:
             test_property
             db.session.delete(test_property)
             db.session.commit()
             return jsonify(f"Success"), 200





# generated data from Mock


