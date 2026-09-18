import { Controller, Get, Post, Body } from '@nestjs/common';
import { NutritionService } from './nutrition.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Nutrition')
@Controller('api/v1/nutrition')
export class NutritionController {
  constructor(private readonly nutritionService: NutritionService) {}

  @Get('logs')
  @ApiOperation({ summary: 'Get current daily nutrition logs' })
  async getLogs() {
    return this.nutritionService.getDailyLogs();
  }

  @Post('logs')
  @ApiOperation({ summary: 'Add a new meal entry' })
  async addLog(@Body() body: any) {
    return this.nutritionService.addLogEntry(body);
  }

  @Post('ai-targets')
  @ApiOperation({ summary: 'Calculate AI-optimized macros and calorie targets' })
  async calculateTargets(@Body() athleteProfile: any) {
    return this.nutritionService.calculateAiTargets(athleteProfile);
  }
}
