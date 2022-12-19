import { Module } from '@nestjs/common';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from './sensor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor])],
  controllers: [SensorController],
  providers: [
    SensorService,
    {
      provide: getRepositoryToken(SensorService),
      useValue: {},
    },
  ],
})
export class SensorModule {}
