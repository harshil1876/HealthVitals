from flask import Blueprint, jsonify

main_bp = Blueprint('main', __name__)

@main_bp.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "message": "Backend is running!"})

# Routes for frontend navigation
@main_bp.route("/api/overview", methods=["GET"])
def overview():
    return jsonify({"page": "overview", "message": "Overview page data."})

@main_bp.route("/api/dashboard", methods=["GET"])
def dashboard():
    return jsonify({"page": "dashboard", "message": "Dashboard page data."})

@main_bp.route("/api/symptom", methods=["GET"])
def symptom():
    return jsonify({"page": "symptom", "message": "HealthVitals symptom analysis page data."})

@main_bp.route("/api/lifestyle", methods=["GET"])
def lifestyle():
    return jsonify({"page": "lifestyle", "message": "Lifestyle coaching page data."})

@main_bp.route("/api/persona", methods=["GET"])
def persona():
    return jsonify({"page": "persona", "message": "PersonaAI assessment page data."})

@main_bp.route("/api/insights", methods=["GET"])
def insights():
    return jsonify({"page": "insights", "message": "Insights page data."})

@main_bp.route("/api/analytics", methods=["GET"])
def analytics():
    return jsonify({"page": "analytics", "message": "Analytics page data."})

@main_bp.route("/api/goals", methods=["GET"])
def goals():
    return jsonify({"page": "goals", "message": "Goals page data."})

@main_bp.route("/api/reports", methods=["GET"])
def reports():
    return jsonify({"page": "reports", "message": "Reports page data."})

@main_bp.route("/api/settings", methods=["GET"])
def settings():
    return jsonify({"page": "settings", "message": "Settings page data."}) 