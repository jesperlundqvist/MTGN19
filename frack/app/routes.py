from app.webapp import app
from flask import jsonify, request
import json
from app import news


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
    j_obj = news.as_news(request.json)
    #TODO: skriva funktionen save to db
    resp = news.save_to_db(j_obj)
    if resp:
        return "Laddade upp artikel skriven av " + request.json["author"] +"\n"
    else:
        return "Något gick fel!, en liten fucky-wucky!"