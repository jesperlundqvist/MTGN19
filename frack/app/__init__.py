#Den här filen används för att starta webservern
from flask import Flask

app = Flask(__name__, instance_relative_config=True) #Skapa ett flask-objekt
app.config.from_pyfile('flask.cfg')

from app import routes #importera routern
