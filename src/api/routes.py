"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Worker, Property, Payment, Listing
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
        


@api.route('/user/<id>/property/all', methods=['GET'])
def get_user_property(id):
    get_property= Property.query.filter_by(user_id=id)
    all_property= list(map(lambda x: x.serialize(), get_property))

    return jsonify(all_property), 200

# @api.route('/user/<id>/listing/all', methods=['GET'])
# def get_user_listing():
#     get_listing= Listing.query.filter_by(property_id=id)
#     all_listing= list(map(lambda x: x.serialize, get_listing))

#     return jsonify(all_listing), 200





@api.route('/user/delete/property/<idP>', methods=['DELETE'])
def remove_Property(idP):
        request_body=request.json
        
        get_property= Property.query.get(idP)
        db.session.delete(get_property)
        db.session.commit()
        return jsonify(f"Success"), 200





# Bulk add properties below
@api.route('property/new/load', methods=['POST'])
def add_newproperty_load():
    property_request=request.json
    print('function works')
    test_property= Property.query.filter_by(name=property_request['name']).first()
    if(test_property):
        print(f"This one already exists")
    else:
        newP=Property(user_id= property_request['user_id'], name=property_request['name'], city=property_request['city'], state=property_request['state'], beds= property_request['beds'], bath= property_request['bath'], address=property_request['address'], img=property_request['img']  )
        db.session.add(newP)
        db.session.commit()
        get_property= Property.query.filter_by(user_id=property_request['user_id'])
        all_property= list(map(lambda x: x.serialize(), get_property))
    return jsonify(all_property),200


# Add a new listing for specific user below
@api.route('/user/property/listing/new', methods=['POST'])
def add_user_listing():
    listing_request=request.json
    
    test_listing= Listing.query.filter_by(property_id=listing_request['property_id'],date_needed=listing_request['date_needed']).first()
    if test_listing:
        print('This one Already exist')
    else:
        newL=Listing(property_id=listing_request['property_id'], date_needed= listing_request['date_needed'], special_note=listing_request['special_note'])
        db.session.add(newL)
        db.session.commit()
    return jsonify(f"Success"), 200
       

# generated data from Mock


