import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { Plants } from './plants.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('plants')
export class PlantsController {
  constructor(private readonly plantService: PlantsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll(@Body() user: { id: number; username: string }): Promise<Plants[]> {
    const userId: number = user.id;
    return this.plantService.getUserPlants(userId);
  }
}
