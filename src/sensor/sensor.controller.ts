import { Controller, Get, Post, Query } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { Sensor } from './sensor.entity';

@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}
  @Get('/all')
  getAll(): Promise<Sensor[]> {
    //It receives the get requests from the server and runs the getAll method in the service class
    // and sends all the data in the sensor entity
    return this.sensorService.getAll();
  }
  @Get()
  addData(
    @Query('id') id: number,
    @Query('temp') temp: number,
    @Query('hum') hum: number,
  ): any {
    // Recives get requst on /sensor path and pare temp, hum values from url then creates an entity.
    const date: Date = new Date();
    const sensorData: Sensor = {
      id: id,
      temperature: temp,
      humidity: hum,
      created_at: date,
    };
    return this.sensorService.createOne(sensorData); //Create record to db from newly generated entity
  }
}
