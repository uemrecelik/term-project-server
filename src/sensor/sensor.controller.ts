import { Controller, Get, Query } from '@nestjs/common';
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
  addData(
    @Query('id') plantId: number,
    @Query('temp') temp: number,
    @Query('hum') hum: number,
  ): any {
    const date: Date = new Date();
    const sensorData: Sensor = {
      id: null,
      plantId: plantId,
      temperature: temp,
      humidity: hum,
      created_at: date,
    };
    return this.sensorService.createOne(sensorData);
  }

  @Get('/plants-sensor')
  getPlantsSensor(@Query('id') plantId: number): Promise<Sensor[]> {
    return this.sensorService.getPlantsSensor(plantId);
  }

  @Get('/check-notification')
  checkNotification(@Query('userId') userId: number): Promise<Sensor[]> {
    return this.sensorService.checkNotification(userId);
  }
}
