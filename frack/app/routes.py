#Importera moduler
from app.webapp import app as webapp
from flask import jsonify, request, send_from_directory
import json
from app import news
import os


#definiera filsökväg till content
static_dir = os.path.join(os.getcwd(), "static", "Schmeck")


#Definiera olika URL-er och vad de leder till
@webapp.route("/")
def index():
    return send_from_directory(static_dir, "index.html")
@webapp.route("/news", methods = ["GET"])
def get_news():
    return jsonify(news.get_news())

@webapp.route("/news", methods = ["POST", "PUT"])
def add_news():
    
    resp = news.save_to_db(request.json)
    return "WOO DET FUNKADE"