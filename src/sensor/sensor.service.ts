import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sensor } from './sensor.entity';
import { Repository } from 'typeorm';

@Injectable()
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
}
