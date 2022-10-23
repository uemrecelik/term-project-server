import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SensorEntity } from './sensor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(SensorEntity)
    private sensorRepository: Repository<SensorEntity>,
  ) {}

  getAll(): Promise<SensorEntity[]> {
    return this.sensorRepository.find();
  }

  createOne(sensor: SensorEntity): Promise<SensorEntity> {
    const data = this.sensorRepository.create(sensor);
    return this.sensorRepository.save(data);
  }
}
