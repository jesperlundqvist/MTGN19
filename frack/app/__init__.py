#Den här filen används för att starta webservern
from flask import Flask


app = Flask(__name__) #Skapa ett flask-objekt
from app import news
from app import routes #importera 