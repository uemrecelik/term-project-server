import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sensor } from './sensor.entity';
import { Repository } from 'typeorm';

@Injectable() // Injectable decorator means this service can contain other public services
export class SensorService {
  constructor(
    @InjectRepository(Sensor)
    private sensorRepository: Repository<Sensor>,
  ) {}

  getAll(): Promise<Sensor[]> {
    return this.sensorRepository.find();
  }

  createOne(sensor: Sensor): Promise<Sensor> {
    const data = this.sensorRepository.create(sensor);
    return this.sensorRepository.save(data);
  }

  getPlantsSensor(plantId: number): Promise<Sensor[]> {
    return this.sensorRepository.find({
      where: { plantId: plantId },
    });
  }
}
