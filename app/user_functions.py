from app.models.user import User, UserType, N0lleGroup
from app import db
from flask import jsonify, g

def get_all_users():
    user_list = User.query.all()
    res_list = []
    for user in user_list:
        res_list.append(user.to_dict())
    return jsonify(res_list)

def get_user_by_filter(filter):
    user_list = User.query.filter_by(**filter.to_dict()).all()

    if len(user_list) == 1:
        return jsonify(user_list[0].to_dict())

    res_list = []
    for user in user_list:
        res_list.append(user.to_dict())
    return jsonify(res_list)

def add_user(data):
    if g.user.admin:
        n0llegroup = None

        if data.get("n0llegroup_id"):
            n0llegroup = N0lleGroup.query.get(data["n0llegroup_id"])

        u = User(data["username"], data["name"], data["password"], UserType.query.get(data["type_id"]), n0llegroup)
        db.session.add(u)
        db.session.commit()

        return jsonify({"user_id": u.id}), 200
    else:
        return jsonify({"message": "unauthorized"}), 401

def delete_user(filter):
    if g.user.admin:
        users = User.query.filter_by(**filter.to_dict())
        user_count = users.count()
        users.delete()
        db.session.commit()
        return jsonify({"count": user_count}), 200
    else:
        return jsonify({"message": "unauthorized"}), 401

def edit_user(filter, data):
    users = User.query.filter_by(**filter.to_dict())
    user_count = users.count()
    for user in users:
        if g.user.admin or g.user.id == user.id:
            if data.get("username"):
                user.username = data["username"]
            if data.get("name"):
                user.name = data["name"]
            if data.get("password"):
                user.set_password(data["password"])
            if data.get("type_id") and g.user.admin:
                user.user_type_id = UserType.query.get(data["type_id"])
            if data.get("n0llegroup_id") and g.user.admin:
                user.n0llegroup_id = N0lleGroup.query.get(data["n0llegroup_id"])
            if data.get("admin") and g.user.admin:
                user.admin = data["admin"]
            if data.get("hidden") and g.user.admin:
                user.hidden = data["hidden"]
            if data.get("profile_picture"):
                user.profile_picture = data["profile_picture"]
            if data.get("description"):
                user.description = data["description"]
            if data.get("q1"):
                user.q1 = data["q1"]
            if data.get("q2"):
                user.q2 = data["q2"]
            if data.get("q3"):
                user.q3 = data["q3"]
        else:
            return jsonify({"message": "unauthorized"}), 401
    db.session.commit()
    return jsonify({"count": user_count}), 200
