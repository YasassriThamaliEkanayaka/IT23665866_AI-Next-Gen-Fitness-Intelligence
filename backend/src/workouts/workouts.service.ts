import { Injectable, Logger } from '@nestjs/common';
import { AiGatewayService } from '../ai/ai.gateway.service';

export interface ExerciseItem {
  id: string;
  name: string;
  targetMuscle: string;
  sets: number;
  reps: number;
  restSeconds: number;
  weightKg?: number;
  instructions: string;
  animationType: string;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  durationMinutes: number;
  estimatedCalories: number;
  exercises: ExerciseItem[];
}

@Injectable()
export class WorkoutsService {
  private readonly logger = new Logger(WorkoutsService.name);

  constructor(private readonly aiGateway: AiGatewayService) {}

  private mockPlans: WorkoutPlan[] = [
    {
      id: 'plan-hypertrophy-push',
      title: 'Hypertrophy Alpha: Chest & Triceps',
      category: 'Hypertrophy / Push',
      difficulty: 'Advanced',
      durationMinutes: 48,
      estimatedCalories: 460,
      exercises: [
        {
          id: 'ex-1',
          name: 'Barbell Incline Bench Press',
          targetMuscle: 'Upper Chest & Front Delts',
          sets: 4,
          reps: 10,
          restSeconds: 90,
          weightKg: 80,
          instructions: 'Retract scapulae, touch upper clavicle smoothly, press explosively upward.',
          animationType: 'bench-press'
        },
        {
          id: 'ex-2',
          name: 'Cable Standing Chest Flys',
          targetMuscle: 'Mid-Pectoralis Squeeze',
          sets: 3,
          reps: 12,
          restSeconds: 60,
          weightKg: 25,
          instructions: 'Maintain slight elbow bend, drive palms together with 2-second peak contraction.',
          animationType: 'cable-fly'
        },
        {
          id: 'ex-3',
          name: 'Overhead Dumbbell Tricep Extension',
          targetMuscle: 'Triceps Long Head',
          sets: 3,
          reps: 12,
          restSeconds: 60,
          weightKg: 32,
          instructions: 'Keep elbows tucked near ears, full deep stretch at bottom of movement.',
          animationType: 'tricep-ext'
        },
        {
          id: 'ex-4',
          name: 'Dips (Weighted)',
          targetMuscle: 'Lower Chest & Triceps',
          sets: 3,
          reps: 10,
          restSeconds: 75,
          weightKg: 15,
          instructions: 'Lean torso forward 30 degrees to maximize pectoral muscle fiber activation.',
          animationType: 'dips'
        }
      ]
    },
    {
      id: 'plan-shred-pull',
      title: 'Metabolic Pull: Back & Biceps Blitz',
      category: 'Strength & Conditioning',
      difficulty: 'Intermediate',
      durationMinutes: 45,
      estimatedCalories: 490,
      exercises: [
        {
          id: 'ex-5',
          name: 'Weighted Wide-Grip Pull-ups',
          targetMuscle: 'Latissimus Dorsi',
          sets: 4,
          reps: 8,
          restSeconds: 90,
          weightKg: 10,
          instructions: 'Full dead-hang at bottom, pull chest all the way to bar height.',
          animationType: 'pullup'
        },
        {
          id: 'ex-6',
          name: 'Barbell Bent-Over Row',
          targetMuscle: 'Rhomboids & Mid-Back',
          sets: 4,
          reps: 10,
          restSeconds: 75,
          weightKg: 70,
          instructions: 'Hinge hips at 45 degrees, pull bar smoothly to navel.',
          animationType: 'bent-row'
        },
        {
          id: 'ex-7',
          name: 'Incline Dumbbell Bicep Curls',
          targetMuscle: 'Biceps Brachii',
          sets: 3,
          reps: 12,
          restSeconds: 60,
          weightKg: 16,
          instructions: 'Supinate wrists outward at peak of curl for maximum peak contraction.',
          animationType: 'bicep-curl'
        }
      ]
    }
  ];

  async getAllPlans(): Promise<WorkoutPlan[]> {
    return this.mockPlans;
  }

  async getPlanById(id: string): Promise<WorkoutPlan | null> {
    return this.mockPlans.find(p => p.id === id) || this.mockPlans[0];
  }

  async generateAiWorkout(goal: string, level: string, duration: number, equipment: string) {
    this.logger.log(`Invoking Python AI Microservice for customized workout recommendation`);
    return this.aiGateway.requestWorkoutPlan({
      goal,
      fitness_level: level,
      target_duration: duration,
      equipment_available: equipment
    });
  }
}
