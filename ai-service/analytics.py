from models import NutritionRequest, NutritionPlanResponse

class NutritionAnalyticsEngine:
    """
    Computes precise Mifflin-St Jeor BMR, Total Daily Energy Expenditure (TDEE),
    and macronutrient gram distributions based on athlete metabolic targets.
    """

    def calculate_nutrition(self, req: NutritionRequest) -> NutritionPlanResponse:
        # Mifflin-St Jeor Equation
        if req.gender.lower() == "male":
            bmr = 10 * req.weight_kg + 6.25 * req.height_cm - 5 * req.age + 5
        else:
            bmr = 10 * req.weight_kg + 6.25 * req.height_cm - 5 * req.age - 161

        tdee = bmr * req.activity_multiplier

        if "fat loss" in req.goal.lower():
            target_calories = int(tdee - 450)
            protein_g = int(req.weight_kg * 2.3) # Higher protein sparing
            fats_g = int((target_calories * 0.25) / 9)
            carbs_g = int((target_calories - (protein_g * 4 + fats_g * 9)) / 4)
        elif "gain" in req.goal.lower() or "hypertrophy" in req.goal.lower():
            target_calories = int(tdee + 350)
            protein_g = int(req.weight_kg * 2.0)
            fats_g = int((target_calories * 0.25) / 9)
            carbs_g = int((target_calories - (protein_g * 4 + fats_g * 9)) / 4)
        else:
            target_calories = int(tdee)
            protein_g = int(req.weight_kg * 1.8)
            fats_g = int((target_calories * 0.28) / 9)
            carbs_g = int((target_calories - (protein_g * 4 + fats_g * 9)) / 4)

        water_liters = round((req.weight_kg * 0.035) + 0.8, 1)

        return NutritionPlanResponse(
            bmr_calories=int(bmr),
            tdee_calories=int(tdee),
            target_daily_calories=target_calories,
            protein_grams=protein_g,
            carbs_grams=max(50, carbs_g),
            fats_grams=max(35, fats_g),
            water_intake_liters=water_liters,
            meal_split_breakdown={
                "breakfast": int(target_calories * 0.25),
                "lunch": int(target_calories * 0.35),
                "dinner": int(target_calories * 0.30),
                "snack_pre_workout": int(target_calories * 0.10)
            },
            insights=[
                f"Your estimated BMR is {int(bmr)} kcal, requiring {int(tdee)} kcal for maintenance.",
                f"Prescribed high bio-available protein at {protein_g}g/day to maximize muscle protein synthesis.",
                f"Calculated hydration target of {water_liters}L/day including training sweat replenishment."
            ]
        )
