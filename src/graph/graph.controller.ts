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
    return this.graphService.getHourlyGraphData(plant);
  }
}
