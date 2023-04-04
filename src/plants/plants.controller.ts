import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { Plants } from './plants.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantService: PlantsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  getAll(@Body() user: { id: number; username: string }): Promise<Plants[]> {
    const userId: number = user.id;
    return this.plantService.getUserPlants(userId);
  }

  @Post('update-temp')
  updateUserName(
    @Query('value') value: string,
    @Query('id') plantId: number,
  ): Promise<any> {
    return this.plantService.updateOptimumTemp(value, plantId);
  }

  @Post('update-hum')
  updateEmail(@Query('value') value: string, @Query('id') plantId: number) {
    return this.plantService.updateOptimumHum(value, plantId);
  }
}
