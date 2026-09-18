from pydantic import BaseModel, Field
from typing import List, Optional

class WorkoutRequest(BaseModel):
    goal: str = Field(..., example="Hypertrophy")
    fitness_level: str = Field(default="Intermediate", example="Intermediate")
    target_duration: int = Field(default=45, example=45)
    equipment_available: str = Field(default="Full Gym", example="Full Gym")
    focus_muscles: Optional[List[str]] = Field(default=["Chest", "Triceps"])

class ExerciseItem(BaseModel):
    name: str
    target_muscle: str
    sets: int
    reps: str
    rest_sec: int
    rpe: int
    notes: str

class WorkoutPlanResponse(BaseModel):
    title: str
    program_type: str
    estimated_calories_burn: int
    readiness_score: int
    exercises: List[ExerciseItem]
    ai_recommendation_rationale: str

class NutritionRequest(BaseModel):
    weight_kg: float = Field(..., example=78.5)
    height_cm: float = Field(..., example=182)
    age: int = Field(default=26, example=26)
    gender: str = Field(default="male", example="male")
    goal: str = Field(default="Muscle Gain", example="Muscle Gain")
    activity_multiplier: float = Field(default=1.55, example=1.55)

class NutritionPlanResponse(BaseModel):
    bmr_calories: int
    tdee_calories: int
    target_daily_calories: int
    protein_grams: int
    carbs_grams: int
    fats_grams: int
    water_intake_liters: float
    meal_split_breakdown: dict
    insights: List[str]
