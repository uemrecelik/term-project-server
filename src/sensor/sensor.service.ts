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
    return this.sensorRepository.find(); //getAll functions find all data in Sensor entity
  }

  createOne(sensor: Sensor): Promise<Sensor> {
    //Creates a new sensor entity instance and copies all entity properties
    // from this object into a new entity.
    const data = this.sensorRepository.create(sensor);
    //Saves a given entity in the database. If entity does not exist in the database then inserts, otherwise updates
    return this.sensorRepository.save(data);
  }
}
