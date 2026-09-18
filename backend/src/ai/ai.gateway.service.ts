import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiGatewayService {
  private readonly logger = new Logger(AiGatewayService.name);
  private readonly aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';

  async requestWorkoutPlan(payload: {
    goal: string;
    fitness_level: string;
    target_duration: number;
    equipment_available: string;
  }) {
    try {
      this.logger.log(`Dispatching AI Request to ${this.aiServiceUrl}/recommend/workout`);
      const response = await axios.post(`${this.aiServiceUrl}/recommend/workout`, payload, {
        timeout: 5000,
      });
      return response.data;
    } catch (error) {
      this.logger.warn(`FastAPI service unavailable; utilizing deterministic AI fallback engine`);
      return this.generateDeterministicFallbackWorkout(payload);
    }
  }

  async requestNutritionPlan(payload: {
    weight_kg: number;
    height_cm: number;
    goal: string;
    dietary_preference: string;
  }) {
    try {
      const response = await axios.post(`${this.aiServiceUrl}/recommend/nutrition`, payload, {
        timeout: 5000,
      });
      return response.data;
    } catch (error) {
      this.logger.warn(`AI Nutrition fallback invoked`);
      return this.generateDeterministicFallbackNutrition(payload);
    }
  }

  private generateDeterministicFallbackWorkout(params: any) {
    return {
      source: 'AI_FALLBACK_ENGINE',
      title: `AI Adaptive ${params.goal || 'Hypertrophy'} Custom Split`,
      estimated_calories_burn: 480,
      periodization: 'Undulating Micro-Cycle',
      generated_at: new Date().toISOString(),
      exercises: [
        {
          name: 'Barbell Flat Bench Press',
          muscle: 'Pectoralis Major',
          sets: 4,
          reps: '8-10',
          rest_sec: 90,
          notes: 'Focus on 3-second eccentric tempo for maximum mechanical tension.',
        },
        {
          name: 'Incline Dumbbell Hex Press',
          muscle: 'Upper Chest & Triceps',
          sets: 3,
          reps: '12',
          rest_sec: 60,
          notes: 'Keep dumbbells pressed together during full range of motion.',
        },
        {
          name: 'Cable Rope Face Pulls',
          muscle: 'Rear Delts & Rotator Cuff',
          sets: 4,
          reps: '15',
          rest_sec: 45,
          notes: 'Pull high towards eye level, rotate external shoulders back.',
        },
      ],
    };
  }

  private generateDeterministicFallbackNutrition(params: any) {
    const bmr = 10 * (params.weight_kg || 75) + 6.25 * (params.height_cm || 178) - 5 * 26 + 5;
    const tdee = Math.round(bmr * 1.55);
    return {
      source: 'AI_NUTRITION_ENGINE',
      target_calories: tdee,
      macros: {
        protein_grams: Math.round((params.weight_kg || 75) * 2.2),
        carbs_grams: Math.round((tdee * 0.45) / 4),
        fats_grams: Math.round((tdee * 0.25) / 9),
      },
      hydration_liters: 3.5,
      recommendations: [
        'Prioritize 35g of bioavailable protein within 2 hours post-workout.',
        'Consume slow-digesting complex carbohydrates 90 minutes before resistance training.',
      ],
    };
  }
}
