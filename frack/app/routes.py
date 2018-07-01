#Importera moduler
from app import app
from flask import jsonify, request, send_from_directory, g
import json
from app import db
import os
from app.models.news import News
import app.news_functions as news_functions
from sqlalchemy import desc
from app.authentication import requires_auth, requires_auth_token, check_auth



STATIC_DIR = os.path.join(os.getcwd(), "static", "Schmeck")


#Definiera olika URL-er och vad de leder till
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return send_from_directory(STATIC_DIR, "index.html")

#ladda CSS
@app.route("/css/<filename>")
def get_css(filename):
    return send_from_directory(os.path.join(STATIC_DIR, "css"), filename)

#ladda JavaScript
@app.route("/js/<filename>")
def get_js(filename):
    return send_from_directory(os.path.join(STATIC_DIR, "js"), filename)

#ladda templates
@app.route("/templates/<filename>")
def get_templates(filename):
    return send_from_directory(os.path.join(STATIC_DIR, "templates"), filename)

#ladda media (bild, film, osv)
@app.route("/api/media/<file_path>")
def get_media(file_path):
    return send_from_directory(os.path.join(STATIC_DIR, "media"), file_path)

@app.route("/news")
def news_page():
    return send_from_directory(STATIC_DIR, "news.html")

@app.route("/news/<id>")
def news_page_specific(id):
    return send_from_directory(STATIC_DIR, "news.html")

@app.route("/news/edit/<id>")
def edit_page(id):
    return send_from_directory(STATIC_DIR, "edit.html")

@app.route("/api/news/", methods=["GET", "POST"])
@app.route("/api/news/<id>", methods=["GET", "DELETE", "PUT"])
@requires_auth_token
def news_route(id=None):
    if request.method == "GET":
        if id == None:
            return news_functions.get_all_news()
        else:
            return news_functions.get_news_by_id(id), 201
    elif request.method == "POST":
        return news_functions.add_news(request.json), 200
    elif request.method == "DELETE":
        return news_functions.delete_news(id), 200
    elif request.method == "PUT":
        return news_functions.edit_news(id, request.json), 201

@app.route('/api/token')
@requires_auth
def get_auth_token():
    token = g.user.generate_auth_token()
    return jsonify({ 'token': token.decode('ascii') })

@app.route('/api/checkToken', methods=["POST"])
def check_token():
    return jsonify({"valid": check_auth(request.json["token"], "", True)})

@app.route("/api/hemlig")
@requires_auth_token
def hemlig():
    return "Välkommen " + g.user.username + "!"
