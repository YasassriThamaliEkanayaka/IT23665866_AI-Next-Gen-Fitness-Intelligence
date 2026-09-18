import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Social & Community')
@Controller('api/v1/social')
export class SocialController {
  private feed = [
    {
      id: 'post-1',
      athleteName: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
      action: 'completed Chest & Triceps Blitz',
      metrics: '48 mins • 460 kcal • 14,200 kg Volume',
      badge: '🔥 14-Day Consistency Master',
      likes: 38,
      timestamp: '18m ago',
    },
    {
      id: 'post-2',
      athleteName: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120',
      action: 'hit a new Personal Record: Deadlift 160kg',
      metrics: '1 Rep Max Achieved • +10kg PR',
      badge: '👑 Heavyweight Titan',
      likes: 64,
      timestamp: '1h ago',
    },
    {
      id: 'post-3',
      athleteName: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
      action: 'completed 10k Tempo Run',
      metrics: '42:15 • 710 kcal • 4:13 /km pace',
      badge: '⚡ Speed Demon',
      likes: 42,
      timestamp: '3h ago',
    },
  ];

  @Get('feed')
  @ApiOperation({ summary: 'Fetch live community activity feed' })
  getFeed() {
    return this.feed;
  }

  @Post('feed/:id/cheer')
  @ApiOperation({ summary: 'Send cheer / like to athlete post' })
  cheerPost(@Param('id') id: string) {
    const post = this.feed.find((p) => p.id === id);
    if (post) {
      post.likes += 1;
      return { success: true, likes: post.likes };
    }
    return { success: false, message: 'Post not found' };
  }
}
