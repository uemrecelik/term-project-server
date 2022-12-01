import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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
