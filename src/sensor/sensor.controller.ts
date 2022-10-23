import { Body, Controller, Get, Post } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorDto } from './sensor.dto';
import { Sensor } from './sensor.entity';

@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}
  @Get()
  getAll(): Promise<Sensor[]> {
    return this.sensorService.getAll();
  }
  @Post()
  addData(@Body() sensorData: Sensor): Promise<Sensor> {
    return this.sensorService.createOne(sensorData);
  }
}
