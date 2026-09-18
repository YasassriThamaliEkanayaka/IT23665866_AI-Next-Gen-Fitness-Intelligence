import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts/workouts.controller';
import { WorkoutsService } from './workouts/workouts.service';
import { NutritionController } from './nutrition/nutrition.controller';
import { NutritionService } from './nutrition/nutrition.service';
import { AiGatewayService } from './ai/ai.gateway.service';
import { SocialController } from './social/social.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [],
  controllers: [
    AuthController,
    WorkoutsController,
    NutritionController,
    SocialController,
  ],
  providers: [
    WorkoutsService,
    NutritionService,
    AiGatewayService,
  ],
})
export class AppModule {}
