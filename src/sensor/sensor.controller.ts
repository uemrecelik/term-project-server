import { Controller, Get, Post, Query } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { Sensor } from './sensor.entity';

@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}
  @Get('/all')
  getAll(): Promise<Sensor[]> {
    return this.sensorService.getAll();
  }
  @Get()
  addData(@Query('temp') temp: number, @Query('hum') hum: number): any {
    const date: Date = new Date();
    const sensorData: Sensor = {
      id: null,
      temperature: temp,
      humidity: hum,
      created_at: date,
    };
    return this.sensorService.createOne(sensorData);
  }
}
