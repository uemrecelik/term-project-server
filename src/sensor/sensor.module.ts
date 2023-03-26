import { Module } from '@nestjs/common';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from './sensor.entity';
import { Plants } from '../plants/plants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor, Plants])],
  controllers: [SensorController],
  providers: [SensorService],
})
export class SensorModule {}
