from app import app
from flask import jsonify, request
import json


news_list = [
    {"headline" : "n0llan ställer till det!", 
    "text": "wow oh man wow n0llan fuckade upp!",
    "author": "foppe", "tags":"cool"}
]

#Definiera olika URL-er och vad de leder till
@app.route("/")
def index():
    return "Du har fått igång flask!"

@app.route("/news", methods = ["GET"])
def get_news():
    return jsonify(news_list)

@app.route("/news", methods = ["POST", "PUT"])
def add_news():
    news_list.append(request.json)
    return "Laddade upp artikel skriven av " + request.json["author"] +"\n"