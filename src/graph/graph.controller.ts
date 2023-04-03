import { Controller, Get, Query } from '@nestjs/common';
import { GraphService } from './graph.service';
import { Sensor } from '../sensor/sensor.entity';
import { GraphDataDto } from './graph.dto';

@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Get()
  getPlantsSensor(
    @Query('plant') plant: string,
    @Query('date') date: string,
  ): Promise<GraphDataDto[]> {
    switch (date) {
      case 'Hourly':
        return this.graphService.getHourlyGraphData(plant);
      case 'Daily':
        return this.graphService.getDailyGraphData(plant);
      case 'Weekly':
        return this.graphService.getWeeklyGraphData(plant);
      case 'Monthly':
        return this.graphService.getMonthlyGraphData(plant);
      default:
        throw new Error('Invalid Date Interval');
    }
  }
}
