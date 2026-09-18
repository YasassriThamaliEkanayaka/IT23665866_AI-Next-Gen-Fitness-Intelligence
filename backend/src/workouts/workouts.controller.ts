import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Workouts')
@Controller('api/v1/workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get('plans')
  @ApiOperation({ summary: 'Get all structured workout programs' })
  async getPlans() {
    return this.workoutsService.getAllPlans();
  }

  @Get('plans/:id')
  @ApiOperation({ summary: 'Get specific workout plan by ID' })
  async getPlanById(@Param('id') id: string) {
    return this.workoutsService.getPlanById(id);
  }

  @Post('ai-generate')
  @ApiOperation({ summary: 'Generate custom AI workout via FastAPI Microservice' })
  async generateAiWorkout(
    @Body() body: { goal: string; level: string; duration: number; equipment: string },
  ) {
    return this.workoutsService.generateAiWorkout(
      body.goal || 'Hypertrophy',
      body.level || 'Intermediate',
      body.duration || 45,
      body.equipment || 'Full Gym',
    );
  }
}
