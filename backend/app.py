from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager

app = Flask(__name__)
app.config['SECRET_KEY'] = 'princi'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = False

CORS(
    app,
    resources={r"/*": {"origins": "http://localhost:5173"}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

# import models AFTER app is defined
from models import db, User

# initialize extensions
db.init_app(app)

login_manager = LoginManager()
login_manager.login_view = "login"
login_manager.init_app(app)

# user loader
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# import routes AFTER models and login_manager
from routes import *

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)