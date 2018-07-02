from sqlalchemy import Column, Integer, String
from app import app, db
import hashlib
from os import urandom

from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)

class User(db.Model):
    id = Column(Integer, primary_key=True)
    username = Column(String(64), unique=True)
    password_hash = Column(String(512)) # Använd set_password!
    password_salt = Column(String(256)) # Använd set_password!

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
