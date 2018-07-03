#Importera moduler
from app import app
from flask import jsonify, request, send_from_directory, g
import json
from app import db
import os
from app.models.news import News
from app.models.user import User
import app.news_functions as news_functions
from sqlalchemy import desc, inspect
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

@app.route("/images/<filename>")
def get_images(filename):
    return send_from_directory(os.path.join(STATIC_DIR, "images"), filename)

#ladda media (bild, film, osv)
@app.route("/api/media/<file_path>")
def get_media(file_path):
    return send_from_directory(os.path.join(STATIC_DIR, "media"), file_path)

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

def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}

@app.route("/api/user/", methods=["GET", "POST"])
@app.route("/api/user/<id>", methods=["GET", "DELETE", "PUT"])
def user_route(id=None):
    if request.method == "GET":
        if id == None:
            res_list =[]
            for user in User.query.all():
                d = object_as_dict(user)
                del d["password_hash"]
                res_list.append(d)
            return jsonify(res_list)
        else:
            return jsonify(object_as_dict(User.query.get(id)))
    elif request.method == "POST":
        u = User(admin = req_json["admin"],
                 description = req_json["description"],
                 hidden = req_json["hidden"],
                 n0llegroup_id = req_json["n0llegroup_id"],
                 profile_picture = req_json["profile_picture"],
                 q1 = req_json["q1"],
                 q2 = req_json["q2"],
                 q3 = req_json["q3"],
                 user_type_id = req_json["user_type_id"],
                 username = req_json["username"])
        db.session.add(u)
        db.session.commit()

        return jsonify({status: "ok"})
    elif request.method == "DELETE":
        User.query.get(id).delete()
        db.session.commit()
        return jsonify({status: "ok"})
    elif request.method == "PUT":
        return None

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
