import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-here')
    DEBUG = os.getenv('FLASK_ENV', 'development') == 'development'
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
    # --- CORS: Use VITE_FRONTEND_URL and localhost:5173 ---
    CORS_ORIGINS = [
        os.getenv('VITE_FRONTEND_URL', 'http://localhost:5173'),
        'http://localhost:5173'
    ]
    RATELIMIT_ENABLED = True
    RATELIMIT_STORAGE_URL = "memory://"
    RATELIMIT_STRATEGY = "fixed-window"
    RATELIMIT_DEFAULT = "100 per minute"
    SECURITY_HEADERS = {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1; mode=block',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
    } 