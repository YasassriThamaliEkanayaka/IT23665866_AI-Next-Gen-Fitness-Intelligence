import { Injectable } from '@nestjs/common';
import { AiGatewayService } from '../ai/ai.gateway.service';

export interface NutritionLogEntry {
  id: string;
  mealType: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  name: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  loggedAt: string;
}

@Injectable()
export class NutritionService {
  constructor(private readonly aiGateway: AiGatewayService) {}

  private userLogs: NutritionLogEntry[] = [
    {
      id: 'log-1',
      mealType: 'BREAKFAST',
      name: 'Egg White Omelet & Oatmeal with Berries',
      calories: 480,
      proteinGrams: 38,
      carbsGrams: 55,
      fatsGrams: 10,
      loggedAt: new Date().toISOString(),
    },
    {
      id: 'log-2',
      mealType: 'LUNCH',
      name: 'Grilled Salmon Bowl with Quinoa & Avocado',
      calories: 650,
      proteinGrams: 46,
      carbsGrams: 62,
      fatsGrams: 22,
      loggedAt: new Date().toISOString(),
    },
  ];

  async getDailyLogs(): Promise<NutritionLogEntry[]> {
    return this.userLogs;
  }

  async addLogEntry(entry: Omit<NutritionLogEntry, 'id' | 'loggedAt'>): Promise<NutritionLogEntry> {
    const newEntry: NutritionLogEntry = {
      ...entry,
      id: `log-${Date.now()}`,
      loggedAt: new Date().toISOString(),
    };
    this.userLogs.unshift(newEntry);
    return newEntry;
  }

  async calculateAiTargets(athleteData: any) {
    return this.aiGateway.requestNutritionPlan(athleteData);
  }
}
