"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint

from api.models import db, User, Worker, Property, Payment, Listing, Schedule

from sqlalchemy.orm import joinedload
from sqlalchemy.orm import relationship, attributes
from sqlalchemy.sql import label
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


      
@api.route('/user/<idc>/listing', methods=['GET'])
def get_user_listing(idc):
    get_property_of_user=db.session.query(Property.id).filter_by(user_id=idc).subquery()
    get_listing= Listing.query.filter(Listing.property_id.in_(get_property_of_user))
    all_listing= list(map(lambda x: x.serialize(), get_listing))
    return jsonify(all_listing), 200


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
     

  #get history for a specific worker below not done
@api.route('/worker/<idw>/schedule/history', methods=['GET'])
def get_worker_history(idw):
    get_schedule= db.session.execute("SELECT Schedule.id, Listing.date_needed, Listing.special_note, Property.address, Property.city, Listing.rate, Listing.id, Schedule.review FROM Schedule join Listing ON Schedule.listing_id=Listing.id join Property on Listing.property_id=Property.id where Schedule.status='Complete' AND Schedule.worker_id="+idw+";")
    all_schedule= [dict(id=row[0], date_needed=row[1], special_note=row[2], address=row[3], city=row[4], rate=row[5], listing_id=row[6], review=row[7]  ) for row in get_schedule.fetchall()]   
    return jsonify(all_schedule), 200
     


#get schedule for a specific worker below
@api.route('/worker/<idw>/schedule/all', methods=['GET'])
def get_worker_schedule(idw):
    get_schedule= db.session.execute("SELECT Schedule.id, Listing.date_needed, Listing.special_note, Property.address, Property.city, Listing.rate, Listing.id FROM Schedule join Listing ON Schedule.listing_id=Listing.id join Property on Listing.property_id=Property.id where Schedule.status='Pending' AND Schedule.worker_id="+idw+";")
    all_schedule= [dict(id=row[0], date_needed=row[1], special_note=row[2], address=row[3], city=row[4], rate=row[5], listing_id=row[6] ) for row in get_schedule.fetchall()]   
    return jsonify(all_schedule), 200



# Add a new schedule for a specific worker below
@api.route('/worker/schedule/new', methods=['POST'])
def add_to_schedule():
    schedule_request=request.json
    db.session.query(Listing).filter_by(id=schedule_request['listing_id']).update({"status":'Scheduled'})
    db.session.commit()
    newS=Schedule(listing_id=schedule_request['listing_id'], worker_id=schedule_request['worker_id'])
    db.session.add(newS)
    db.session.commit()
    return jsonify(f"Success"), 200



# Cancel schedule for a specific worker below
@api.route('/worker/schedule/<ids>/cancel/<idl>', methods=['PUT'])
def cancel_schedule(ids,idl):
    db.session.query(Listing).filter_by(id=idl).update({"status":'Active'})
    db.session.commit()
    db.session.query(Schedule).filter_by(id=ids).update({"status":'Cancelled'})
    db.session.commit()
    return jsonify(f"Success")


# Mark Listing as Paid for a specific listing below
@api.route('user/<idc>/listing/<idl>/paid', methods=['PUT'])
def paid_listing(idc,idl):    
    db.session.query(Listing).filter_by(id=idl).update({"status":'Paid'})
    db.session.commit()  
    get_property_of_user=db.session.query(Property.id).filter_by(user_id=idc).subquery()
    get_listing= Listing.query.filter(Listing.property_id.in_(get_property_of_user))
    all_listing= list(map(lambda x: x.serialize(), get_listing))
    return jsonify(
        {
            "msg": "Successfully marked as paid",
            "my_listings": all_listing
        }
        )



   
     

# Complete schedule 
@api.route('/worker/schedule/<ids>/complete/<idl>', methods=['PUT'])
def complete_schedule(ids,idl):
    db.session.query(Listing).filter_by(id=idl).update({"status":'Complete'})
    db.session.commit()
    db.session.query(Schedule).filter_by(id=ids).update({"status":'Complete'})
    db.session.commit()
    return jsonify(f"Success"), 200

@api.route('/user/cancel/listing/<idl>', methods=['PUT'])
def cancel_listing_by_user(idl):
    # you only need the id of the listing you want to cancel in the endpoint.
    db.session.query(Listing).filter_by(id=idl).update({"status":'Canceled'})
    db.session.commit()
    checkIfScheduleExist= Schedule.query.filter_by(Schedule.listing_id==idl, status='Active').first()
    if checkIfScheduleExist:
        db.session.query(Schedule).filter_by(id=idl).update({"status":'Cancel'})
        db.session.commit()

    return jsonify(f"Success"), 200
   
#  Get completed schedule history for host below 
@api.route('/user/<idh>/schedule/history', methods=['GET'])
def get_host_history(idh):
     get_schedule = db.session.query(Schedule)\
    .join(Listing, Schedule.listing_id==Listing.id)\
    .join(Property, Listing.property_id== Property.id)\
    .join(User, Property.user_id==User.id)\
    .filter(Schedule.status=='Complete', User.id==idh)\
    .with_entities(Schedule.id, Listing.special_note, Listing.date_needed, Listing.rate, Listing.id, Property.img,
                   Worker.id, Schedule.review ).all()
     all_schedule= [dict(id=row[0], special_note=row[1], date_needed=row[2], rate=row[3], listing_id=row[4], property_img=row[5], worker_id=row[6], review=row[7]) for row in get_schedule]
     return (all_schedule), 200

# Give Review for completed schedule in host history below

@api.route('/schedule/<ids>/review/new', methods=['PUT'])
def give_review_to_worker(ids):
    #this request.json  from the frontend should come as an object with those two keys worker_id and score
    review_request=request.json
    db.session.query(Schedule).filter_by(id=ids).update({"review": review_request['score']})
    db.session.commit()
    idw= str(review_request['worker_id'])
    get_t_review= db.session.execute("SELECT sum(review) , count(review) from Schedule where worker_id="+idw+" and status='Complete' and review is not null ;")
    average_ranking= [dict(sum_review=row[0], total_review=row[1]) for row in get_t_review.fetchall()]
    new_ranking= average_ranking[0]['sum_review'] / average_ranking[0]['total_review']
    db.session.query(Worker).filter_by(id=review_request['worker_id']).update({"ranking":new_ranking})
    db.session.commit()
    return jsonify("Great job! Your new ranking is:"+ str(new_ranking)),200     

