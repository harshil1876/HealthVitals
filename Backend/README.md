# HealthVitals Backend

A Python Flask-based backend API for the HealthVitals AI application.

## 🚀 Features

- **Flask Framework**: Modern Python web framework
- **JWT Authentication**: Secure token-based authentication
- **CORS Support**: Cross-origin resource sharing enabled
- **Database Integration**: SQLAlchemy ORM with migration support
- **Environment Configuration**: Secure environment variable management
- **Testing**: Pytest framework for unit testing

## 🛠️ Tech Stack

- **Framework**: Flask 3.0.0
- **Database**: SQLAlchemy with migration support
- **Authentication**: JWT tokens
- **Security**: bcrypt for password hashing
- **Testing**: pytest
- **Deployment**: gunicorn

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshil1876/HealthVitals.git
   cd HealthVitals/Backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**
   ```bash
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

6. **Run the application**
   ```bash
   # Development mode
   python app.py
   
   # Production mode
   gunicorn app:app
   ```

## 🏗️ Project Structure

```
Backend/
├── app.py                 # Main application file
├── config.py             # Configuration settings
├── requirements.txt      # Python dependencies
├── .gitignore           # Git ignore rules
├── README.md            # Project documentation
├── models/              # Database models
├── routes/              # API routes
├── services/            # Business logic
├── utils/               # Utility functions
└── tests/               # Test files
```

## 🔧 Configuration

Create a `.env` file in the Backend directory with the following variables:

```env
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///healthvitals.db
JWT_SECRET_KEY=your-jwt-secret-key
```

## 🚀 Available Scripts

- `python app.py` - Start development server
- `gunicorn app:app` - Start production server
- `pytest` - Run tests
- `flask db init` - Initialize database
- `flask db migrate` - Create database migration
- `flask db upgrade` - Apply database migrations

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Health Data
- `GET /api/health/vitals` - Get health vitals
- `POST /api/health/vitals` - Add health vitals
- `PUT /api/health/vitals/<id>` - Update health vitals
- `DELETE /api/health/vitals/<id>` - Delete health vitals

### AI Analysis
- `POST /api/ai/symptom-analysis` - Analyze symptoms
- `POST /api/ai/lifestyle-coaching` - Get lifestyle advice
- `POST /api/ai/persona-assessment` - Run persona assessment

## 🧪 Testing

Run tests using pytest:

```bash
pytest
```

Run tests with coverage:

```bash
pytest --cov=app tests/
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team. 