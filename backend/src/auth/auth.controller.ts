import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth & Athlete Profile')
@Controller('api/v1/auth')
export class AuthController {
  @Post('login')
  @ApiOperation({ summary: 'Authenticate user and return JWT session' })
  async login(@Body() credentials: any) {
    return {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fitflow_demo_token',
      expiresIn: 3600,
      user: {
        id: 'usr-custom-athlete',
        email: credentials.email || 'athlete@fitflow.app',
        fullName: 'Custom Athlete',
        role: 'ATHLETE_PRO',
      },
    };
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get current athlete profile' })
  async getProfile() {
    return {
      id: 'usr-custom-athlete',
      fullName: 'Jordan Sterling',
      handle: '@sterling_fit',
      level: 'Advanced Athlete',
      currentStreak: 12,
      totalWorkoutsCompleted: 148,
      weightKg: 78.5,
      targetWeightKg: 75.0,
      heightCm: 182,
      dailyCalorieGoal: 2450,
    };
  }
}
