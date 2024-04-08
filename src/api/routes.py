"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Worker, Property, Payment, Listing, Schedule
from sqlalchemy.orm import joinedload
from sqlalchemy.orm import relationship, attributes
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
             newU=User ( name=request_body['full_name'], email=request_body['email'],password= request_body['password'],phone= request_body['phone'] )
             db.session.add(newU)
             db.session.commit()
             return jsonify(f"Success"), 200
        


@api.route('/user/<id>/property/all', methods=['GET'])
def get_user_property(id):
    get_property= Property.query.filter_by(user_id=id)
    all_property= list(map(lambda x: x.serialize(), get_property))

    return jsonify(all_property), 200


# This endpoint was written today, 4/5/2024 at 6h25pm. 
@api.route('/worker/listing/all', methods=['GET'])
def get_available_listing_for_worker():
    get_listing= db.session.execute("SELECT Listing.id, Listing.date_needed, Listing.special_note, Property.address, Property.city,  Property.img, Listing.rate FROM Listing join Property ON Property.id=Listing.property_id where Listing.status='Active';")
    all_listing= [dict(id=row[0], date_needed=row[1], special_note=row[2], address=row[3],city=row[4], img=row[5], rate=row[6] ) for row in get_listing.fetchall()]
    return jsonify(all_listing), 200


@api.route('/user/<id>/delete/property/<idP>', methods=['DELETE'])
def remove_Property(id, idP):
    get_property= Property.query.get(idP)
    db.session.delete(get_property)
    db.session.commit()
    get_property= Property.query.filter_by(user_id=id)
    all_property= list(map(lambda x: x.serialize(), get_property))

    
    return jsonify(all_property), 200

    
# Bulk add properties below
@api.route('property/new/load', methods=['POST'])
def add_newproperty_load():
    property_request=request.json
    print('function works')
    test_property= Property.query.filter_by(name=property_request['name']).first()
    if(test_property):
        msg = "This property already exists!"
        return jsonify(msg), 500
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
       return jsonify(f"THis one already exists")
    else:
        newL=Listing(property_id=listing_request['property_id'], date_needed= listing_request['date_needed'], special_note=listing_request['special_note'], rate= listing_request['rate'])
        db.session.add(newL)
        db.session.commit()
    return jsonify(f"Success"), 200



# Get listings for a single user 
@api.route('/user/<int:id>/listing', methods=['GET'])
def get_user_listing(id):
    get_user_properties = Property.query.filter_by(user_id=id)
    properties = list(map(lambda x: x.serialize(), get_user_properties))
    get_all_listings = Listing.query.all()
    all_listings = list(map(lambda x: x.serialize(), get_all_listings))
    id_list = []
    user_listings = []
    for listing in all_listings:         
         property_id = listing["property_id"]
         for property in properties:
              if property["id"] == property_id:
                   id_list.append(property["id"])
                   single_listing= Listing.query.filter_by(property_id=property["id"]).first()
                   user_listings.append(single_listing)
    final_listings = list(map(lambda x: x.serialize(), user_listings))

    return jsonify(final_listings), 200


# Hey Chris! Below is the right version of the endpoint above with the right syntax to get listing of the current user. 
       
# @api.route('/user/<idc>/listing', methods=['GET'])
# def get_user_listing(idc):
#     get_property_of_user=db.session.query(Property.id).filter_by(user_id=idc).subquery()
#     get_listing= Listing.query.filter(Listing.property_id.in_(get_property_of_user))
#     all_listing= list(map(lambda x: x.serialize(), get_listing))
#     return jsonify(all_listing), 200


# Update user or worker endpoint
@api.route('/update/profile/<id>', methods=['PUT'])
def update_user_or_worker(id):
    request_body=request.json
    if request_body['role']=='worker':
         
        test_token= Worker.query.filter_by(email=request_body, password=request_body['password'])
        if test_token:
            db.session.query(Worker).get(id).update({"full_name":request_body['full_name'], "email":request_body['email'],"phone": request_body['phone']})
            db.session.commit()
            return jsonify(f"Success"), 200
        else:
            return (f"Password incorrect"),410
    else:
         test_token= User.query.filter_by(email=request_body['email'], password=request_body['password']).first()
         if test_token:
            db.session.query(User).filter_by(email=request_body['email'], password=request_body['password']).update({"full_name":request_body['full_name'], "email":request_body['email'],"phone": request_body['phone'], "password":request_body['new_password']})
            db.session.commit()
            return jsonify(f"Success"), 200
         else:
            return (f"Password incorrect"),410
     
         

# Add a new schedule for a specific worker below
@api.route('/worker/<id>/schedule/all', methods=['GET'])
def get_worker_schedule(id):

    get_schedule= db.session.execute("SELECT Schedule.id, Listing.date_needed, Listing.special_note, Property.address, Property.city, Listing.rate FROM Schedule join Listing ON Schedule.listing_id=Listing.id join Property on Listing.property_id=Property.id where Listing.status='Active';")
    all_schedule= [dict(id=row[0], date_needed=row[1], special_note=row[2], address=row[3], city=row[4], rate=row[5] ) for row in get_schedule.fetchall()]
   
    return jsonify(all_schedule), 200



# Add a new schedule for a specific worker below
@api.route('/worker/schedule/new', methods=['POST'])
def add_to_schedule():
    schedule_request=request.json
    newS=Schedule(listing_id=schedule_request['listing_id'], worker_id=schedule_request['worker_id'])
    db.session.add(newS)
    db.session.commit()
    return jsonify(f"Success"), 200


# Add a new schedule for a specific worker below
@api.route('/worker/schedule/<ids>/cancel', methods=[''])
def cancel_schedule(ids):
    db.session.query(Schedule).get(ids).update({"status":'Cancelled'})
    db.session.commit()
     
    
    return jsonify(f"Success"), 200





