import { Module } from '@nestjs/common';
import { GraphService } from './graph.service';
import { GraphController } from './graph.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from '../sensor/sensor.entity';
import { Plants } from '../plants/plants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor, Plants])],
  controllers: [GraphController],
  providers: [GraphService],
})
export class GraphModule {}
