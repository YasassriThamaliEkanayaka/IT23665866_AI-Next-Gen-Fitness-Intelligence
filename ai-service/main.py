from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import WorkoutRequest, WorkoutPlanResponse, NutritionRequest, NutritionPlanResponse
from recommender import FitnessRecommenderEngine
from analytics import NutritionAnalyticsEngine

app = FastAPI(
    title="FitFlow AI / ML Intelligence Microservice",
    description="Microservice providing personalized workout recommendations and biometric metabolic analytics",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

recommender = FitnessRecommenderEngine()
analytics = NutritionAnalyticsEngine()

@app.get("/")
def health_check():
    return {
        "status": "online",
        "service": "FitFlow-AI-Microservice",
        "version": "2.0.0",
        "gpu_accelerated": True
    }

@app.post("/recommend/workout", response_model=WorkoutPlanResponse)
def recommend_workout(request: WorkoutRequest):
    try:
        return recommender.generate_plan(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recommend/nutrition", response_model=NutritionPlanResponse)
def calculate_nutrition(request: NutritionRequest):
    try:
        return analytics.calculate_nutrition(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
