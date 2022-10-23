import { Body, Controller, Get, Post } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorDto } from './sensor.dto';
import { SensorEntity } from './sensor.entity';

@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}
  @Get()
  getAll(): Promise<SensorEntity[]> {
    return this.sensorService.getAll();
  }
  @Post()
  addData(@Body() sensorData: SensorDto): Promise<SensorEntity> {
    return this.sensorService.createOne(sensorData);
  }
}
