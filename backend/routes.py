from flask import request, jsonify, send_from_directory
from flask_login import login_user, current_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from app import app, db
from models import User, Post

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data sent"}), 400

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "Missing fields"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 409

    user = User(
        username=username,
        email=email,
        password=generate_password_hash(password)
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Register successful"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data sent"}), 400

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Wrong credentials"}), 401

    login_user(user)
    return jsonify({"message": "Login successful"}), 200

@app.route("/auth-status", methods=["GET"])
def auth_status():
    if current_user.is_authenticated:
        return jsonify({
            "logged_in": True,
            "user": {
                "id": current_user.id, 
                "email": current_user.email, 
                "username": current_user.username
            }
        })
    return jsonify({"logged_in": False})

@app.route("/posts", methods=["POST"])
@login_required
def create_post():
    data = request.get_json()

    title = data.get("title")
    content = data.get("content")

    if not title or not content:
        return jsonify({"error": "Missing fields"}), 400

    post = Post(
        title=title,
        content=content,
        user_id=current_user.id   # 👈 link post to user
    )

    db.session.add(post)
    db.session.commit()

    return jsonify({"message": "Post created"}), 201

@app.route("/posts", methods=["GET"])
def get_posts():
    posts = Post.query.order_by(Post.id.desc()).all()

    return jsonify([
        {
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "author": {
                "id": post.author.id,
                "username": post.author.username
            }
        }
        for post in posts
    ])

@app.route('/favicon.ico')
def favicon():
    return send_from_directory('static', 'favicon.ico')