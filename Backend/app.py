from flask import Flask
from flask_cors import CORS
from routes.main import main_bp

app = Flask(__name__)

# Enable CORS for all domains on all routes (customize origins as needed)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "*"]}})

# Register blueprints
app.register_blueprint(main_bp)

if __name__ == "__main__":
    app.run(debug=True) 