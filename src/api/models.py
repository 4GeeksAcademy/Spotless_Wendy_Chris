from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    full_name = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(120), unique=True, nullable=False)
    img = db.Column(db.String(300), unique=True, nullable=True)
    billing = db.Column(db.String(300), unique=True, nullable=False)
    address = db.Column(db.String(120), unique=True, nullable=False)
    

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
    img = db.Column(db.String(300), unique=True, nullable=True)
    banking_info = db.Column(db.String(300), unique=True, nullable=False)
    address = db.Column(db.String(120), unique=True, nullable=False)
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
    name = db.Column(db.String(120), unique=True, nullable=False)
    city = db.Column(db.String(120), unique=True, nullable=False)
    state = db.Column(db.String(120), unique=True, nullable=False)
    beds = db.Column(db.Integer, nullable=False)
    bath = db.Column(db.Integer, nullable=False)
    img = db.Column(db.String(10000), unique=True, nullable=True)
    address = db.Column(db.String(120), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user_link = db.relationship('User', backref='property', lazy=True)
        

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
    special_note = db.Column(db.String(120), nullable=True)
    status = db.Column(db.Boolean, default=True)
    property_link = db.relationship('Property', backref='listing', lazy=True)
        

    def __repr__(self):
        return f'Listing: {self.id}'

    def serialize(self):
        return {
            "id": self.id,
            "property_id": self.property_id,
            "date_needed": self.cdate_needed,
            "special_note": self.sspecial_note,
            "status": self.status
            # do not serialize the password, its a security breach
        }