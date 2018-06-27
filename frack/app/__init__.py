from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('flask.cfg')
db = SQLAlchemy(app)

from app import routes
from app.models.news import News
from app.models.user import User
db.create_all() #OBS UTAV BARA HELVETE denna ska inte finnas med i prod, den dumpar och skapar en ny databas
adminUser = User(username="admin", password_hash="inpho")
db.session.add(adminUser)
db.session.commit()
