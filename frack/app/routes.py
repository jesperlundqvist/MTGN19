from app import app
from flask.json import jsonify
from flask import render_template, redirect, url_for

from app.authentication import *

#Definiera olika URL-er och vad de leder till
@app.route("/")
def index():
    return "Du har fått igång flask!"

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/init_db")
def init_db():
    from app.database import init_db
    init_db()
    return "init_db complete"

### API
@app.route('/api/token')
@requires_auth
def get_auth_token():
    token = g.user.generate_auth_token()
    return jsonify({ 'token': token.decode('ascii') })

@app.route("/api/hemlig")
@requires_auth_token
def hemlig():
    return "Välkommen " + g.user.username + "!"
