from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    full_name = db.Column(db.String(120), unique=False, nullable=False)
    phone = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    address = db.Column(db.String(120), unique=False, nullable=True)
    img = db.Column(db.String(300))
    billing = db.Column(db.String(300), unique=True)
    

    def __repr__(self):
        return self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "full_name": self.full_name,
            "phone": self.phone,
            "img": self.img,
            "billing": self.billing,
            "address": self.address
            # do not serialize the password, its a security breach
        }
    
class Worker(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    full_name = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(120), unique=True, nullable=False)
    address = db.Column(db.String(120), unique=False, nullable=True)
    img = db.Column(db.String(300), unique=True, nullable=True)
    banking_info = db.Column(db.String(300), unique=True, nullable=True)
   
    ranking = db.Column(db.Float, nullable=True)

    def __repr__(self):
        return f'<Worker {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "full_name": self.full_name,
            "phone": self.phone,
            "img": self.img,
            "banking_info": self.banking_info,
            "address": self.address,
            "ranking": self.ranking
            # do not serialize the password, its a security breach
        }
    
class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    name = db.Column(db.String(120), unique=True, nullable=False)
    city = db.Column(db.String(120), nullable=False)
    state = db.Column(db.String(120), nullable=False)
    beds = db.Column(db.Integer, nullable=False)
    bath = db.Column(db.Integer, nullable=False)
    img = db.Column(db.String(10000), unique=True, nullable=True)
    address = db.Column(db.String(120), unique=False, nullable=False)
    user_link = db.relationship('User')
        

    def __repr__(self):
        return f'Property: {self.name}'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "city": self.city,
            "state": self.state,
            "beds": self.beds,
            "bath": self.bath,
            "img": self.img,
            "address": self.address,
            "user_id": self.user_id
            # do not serialize the password, its a security breach
        }
    



class Listing(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=False)

    date_needed = db.Column(db.String(120), nullable=False)
    special_note = db.Column(db.String(300), nullable=True)
    status = db.Column(db.Boolean, default=True)
    property_link = db.relationship('Property', backref='listing', lazy=True)
        

    def __repr__(self):
        return f'Listing: {self.id}'

    def serialize(self):
        return {
            "id": self.id,
            "property_id": self.property_id,
            "date_needed": self.date_needed,
            "special_note": self.special_note,
            "status": self.status
            # do not serialize the password, its a security breach
        }
    
    


class Schedule(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, db.ForeignKey('listing.id'), nullable=False)
    worker_id = db.Column(db.Integer, db.ForeignKey('worker.id'), nullable=False)

    date_time = db.Column(db.String(120), nullable=False)
   
    paid_status = db.Column(db.Boolean, default=False)
    review= db.Column(db.Integer, nullable=True)

    listing_link = db.relationship('Listing', backref='schedule', lazy=True)
    worker_link = db.relationship('Worker', backref='schedule', lazy=True)
    
        

    def __repr__(self):
        return f'Schedule: {self.id}'

    def serialize(self):
        return {
            "id": self.id,
            "listing_id": self.listing_id,
            "worker_id": self.worker_id,
            "date_time": self.date_time,
            "paid_status": self.paid_status,
            "review": self.review
            # do not serialize the password, its a security breach
        }
    
    


class Payment(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    schedule_id = db.Column(db.Integer, db.ForeignKey('schedule.id'), nullable=False)

    amount= db.Column(db.Integer, nullable=False)
    schedule_link = db.relationship('Schedule', backref='payment', lazy=True)
   

    def __repr__(self):
        return f'Schedule: {self.id}'

    def serialize(self):
        return {
            "id": self.id,
            "schedule_id": self.schedule_id,
            "amount": self.amount
            # do not serialize the password, its a security breach
        }
    



class Worker2(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    full_name = db.Column(db.String(120), unique=True, nullable=False)
    
    def __repr__(self):
        return self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "full_name": self.full_name
           
            # do not serialize the password, its a security breach
        }
    

class Property2(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    worker_id = db.Column(db.Integer, db.ForeignKey('worker2.id'))
    #work_link =db.relationship(Worker2, back_populates="worker2")
    worker = db.relationship('Worker2')
    
    #worker_link = db.relationship(Worker2, backref="property2", lazy=True)

    
    def __repr__(self):
        return self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "worker_id": self.worker_id
          
            # do not serialize the password, its a security breach
        }
    

    

