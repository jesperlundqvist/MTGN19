from app.webapp import app as webapp
from flask import jsonify, request
import json
from app import news





#Definiera olika URL-er och vad de leder till
@webapp.route("/")
def index():
    return "Du har fått igång flask!"

@webapp.route("/news", methods = ["GET"])
def get_news():
    return jsonify(news.get_news())

@webapp.route("/news", methods = ["POST", "PUT"])
def add_news():
    
    resp = news.save_to_db(request.json)
    return "WOO DET FUNKADE"