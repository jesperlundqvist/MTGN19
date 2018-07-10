from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app import app, db
import hashlib
from os import urandom
from flask import jsonify

from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)

class UserType(db.Model):
    __tablename__ = "usertype"
    id = Column(Integer, primary_key=True)
    name = Column(String(64), unique=True)

    users = relationship("User", back_populates="user_type")

    def __init__(self, name):
        self.name = name

    def to_dict(self):
        type = {}
        type["id"] = self.id
        type["name"] = self.name
        return type

class N0lleGroup(db.Model):
    __tablename__ = "n0llegroup"
    id = Column(Integer, primary_key=True)
    name = Column(String(64), unique=True)

    users = relationship("User", back_populates="n0llegroup")

    def __init__(self, name):
        self.name = name

    def to_dict(self):
        group = {}
        group["id"] = self.id
        group["name"] = self.name
        return group

class User(db.Model):
    id = Column(Integer, primary_key=True)
    username = Column(String(64), unique=True)
    name = Column(String(64))
    password_hash = Column(String(1024)) # Använd set_password!
    password_salt = Column(String(1024)) # Använd set_password!

    user_type_id = Column(Integer, ForeignKey('usertype.id')) # Någon av nØllan, KPH, ARR, INPHO, LEK, VRAQUE, RSA, ÖPH
    user_type = relationship("UserType", back_populates="users")

    n0llegroup_id = Column(Integer, ForeignKey('n0llegroup.id'))
    n0llegroup = relationship("N0lleGroup", back_populates="users")

    admin = Column(Boolean(), default=False) # Electus + INPHO
    hidden = Column(Boolean(), default=False) # FusknØllan och VRAQUE som inte joinat ännu måste gömmas
    profile_picture = Column(String(64), default="/images/profiles/default.png")
    q1 = Column(String(1024), default="")
    q2 = Column(String(1024), default="")
    q3 = Column(String(1024), default="")
    description = Column(String(1024), default="")

    def __init__(self, username, name, password, user_type, n0llegroup=None):
        self.username = username
        self.name = name
        self.user_type = user_type
        self.n0llegroup = n0llegroup

        self.set_password(password)

    def set_password(self, password):
        self.password_salt = urandom(256).hex()
        saltedPassword = (self.password_salt + password).encode("utf-8")

        m = hashlib.sha256()
        m.update(saltedPassword)
        self.password_hash = m.hexdigest()

    def generate_auth_token(self, expiration = 600):
        s = Serializer(app.config['SECRET_KEY'], expires_in = expiration)
        return s.dumps({ 'id': self.id })

    def verify_password(self, password):
        saltedPassword = (self.password_salt + password).encode("utf-8")

        m = hashlib.sha256()
        m.update(saltedPassword)
        password_hash = m.hexdigest()

        return (password_hash == self.password_hash)

    def to_dict(self):
        user = {}
        user["id"] = self.id
        user["username"] = self.username
        user["name"] = self.name
        user["type"] = { "id": self.user_type.id, "name": self.user_type.name }
        if (self.n0llegroup):
            user["n0llegroup"] = { "id": self.n0llegroup.id, "name": self.n0llegroup.name }
        user["admin"] = self.admin
        user["hidden"] = self.hidden
        user["profile_picture"] = self.profile_picture
        user["description"] = self.description
        user["q1"] = self.q1
        user["q2"] = self.q2
        user["q3"] = self.q3
        return user

    def to_json(self):
        return jsonify(self.to_dict())

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None # valid token, but expired
        except BadSignature:
            return None # invalid token
        user = User.query.get(data['id'])
        return user

    def __repr__(self):
        return '<User %r>' % (self.username)
