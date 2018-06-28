from functools import wraps
from flask import g, request, json
from app.models.user import User

def check_auth(username_or_token, password, only_accept_token):
    user = User.verify_auth_token(username_or_token)
    if not user:
        if only_accept_token:
            return False
        else:
            user = User.query.filter_by(username = username_or_token).first()
            if not user or not user.verify_password(password):
                return False
    g.user = user
    return True

def authenticate():
    message = {'authError': "Requires authentication."}
    resp = json.jsonify(message)

    resp.status_code = 401
    resp.headers['WWW-Authenticate'] = 'Basic realm="mtgn"'

    return resp

def authenticate_token():
    message = {'authError': "Requires authentication token."}
    resp = json.jsonify(message)

    resp.status_code = 401
    resp.headers['WWW-Authenticate'] = 'BasicMtgn realm="mtgn"'

    return resp

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth:
            return authenticate()
        elif not check_auth(auth.username, auth.password, False):
            return authenticate()
        return f(*args, **kwargs)

    return decorated

def requires_auth_token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth:
            return authenticate_token()
        elif not check_auth(auth.username, auth.password, True):
            return authenticate_token()
        return f(*args, **kwargs)

    return decorated
