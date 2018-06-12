from sqlalchemy import Column, Integer, String
from app.database import Base
from app import app

from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(64), unique=True)
    password_hash = Column(String(64))

    def generate_auth_token(self, expiration = 600):
        s = Serializer(app.config['SECRET_KEY'], expires_in = expiration)
        return s.dumps({ 'id': self.id })

    def verify_password(self, password_hash):
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

    def __init__(self, username=None, password_hash=None):
        self.username = username
        self.password_hash = password_hash

    def __repr__(self):
        return '<User %r>' % (self.username)
