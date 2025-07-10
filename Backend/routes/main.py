from flask import Blueprint, jsonify, request
import json
import os
from datetime import datetime

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

@main_bp.route("/api/history", methods=["GET"])
def history():
    # Get filter params
    categories = request.args.getlist("categories")  # e.g. ["vital_signs", "medication"]
    date_from = request.args.get("dateFrom")  # e.g. "2024-01-01"
    date_to = request.args.get("dateTo")      # e.g. "2024-01-31"
    durations = request.args.getlist("durations")  # ["short", "medium", "long"]
    has_health_data = request.args.get("hasHealthData") == "true"

    # Load conversations
    json_path = os.path.join(os.path.dirname(__file__), '../../healthvitals_ai/Backend/conversations.json')
    with open(json_path, 'r', encoding='utf-8') as f:
        conversations = json.load(f)

    def duration_category(seconds):
        if seconds < 5 * 60:
            return "short"
        elif seconds <= 15 * 60:
            return "medium"
        else:
            return "long"

    def has_health_data_fn(conv):
        # Example: check if summary or transcript mentions health data keywords
        keywords = ["blood pressure", "heart rate", "medication", "symptom", "mental health"]
        text = (conv.get("summary") or "") + " ".join([m.get("content", "") for m in conv.get("transcript", [])])
        return any(k in text.lower() for k in keywords)

    # Filtering
    filtered = []
    for conv in conversations:
        # Categories (if present in summary or transcript)
        if categories:
            found = False
            for cat in categories:
                if cat.replace('_', ' ') in (conv.get("summary") or "").lower():
                    found = True
            if not found:
                continue
        # Date range
        if date_from:
            if conv.get("timestamp") and conv["timestamp"][:10] < date_from:
                continue
        if date_to:
            if conv.get("timestamp") and conv["timestamp"][:10] > date_to:
                continue
        # Duration
        if durations:
            cat = duration_category(conv.get("duration", 0))
            if cat not in durations:
                continue
        # Has health data
        if has_health_data and not has_health_data_fn(conv):
            continue
        filtered.append(conv)

    return jsonify(filtered) 