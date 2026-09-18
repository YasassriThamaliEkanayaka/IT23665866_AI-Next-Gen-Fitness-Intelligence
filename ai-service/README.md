# FitFlow AI / ML Microservice (FastAPI + Python)

This microservice provides real-time personalized workout plan generation, intelligent macro budgeting, and fatigue autoregulation analysis.

## Endpoints
- `GET /`: Health check and model readiness status
- `POST /recommend/workout`: Generates tailored resistance training plans based on athlete profile and constraints
- `POST /recommend/nutrition`: Computes metabolic BMR, TDEE, dynamic macro distribution, and hydration targets

## Quick Start
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate # or venv\Scripts\activate on Windows

# Install requirements
pip install -r requirements.txt

# Start FastAPI server
uvicorn main:app --reload --port 8000
```
Interactive Swagger UI: `http://localhost:8000/docs`
