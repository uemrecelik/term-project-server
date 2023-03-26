import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sensor } from './sensor.entity';
import { Repository } from 'typeorm';
import { Plants } from '../plants/plants.entity';

@Injectable() // Injectable decorator means this service can contain other public services
export class SensorService {
  constructor(
    @InjectRepository(Sensor)
    private sensorRepository: Repository<Sensor>,
    @InjectRepository(Plants)
    private plantRepository: Repository<Plants>,
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

  async checkNotification(userId: number): Promise<Sensor[]> {
    const usersPlants = await this.plantRepository.find({
      select: ['id'],
      where: {
        userId: userId,
      },
    });
    const plantIds = usersPlants.map((plant: Plants) => plant.id);

    console.log(plantIds);

    const queryBuilder = this.sensorRepository.createQueryBuilder('sensor');

    queryBuilder.innerJoin(
      `(SELECT plantId, MAX(created_at) AS max_created_at FROM sensor GROUP BY plantId)`,
      's2',
      'sensor.plantId = s2.plantId AND sensor.created_at = s2.max_created_at',
    );

    queryBuilder.where('sensor.plantId IN (:...plantIds)', {
      plantIds,
    });

    queryBuilder.orderBy('sensor.created_at', 'DESC');

    return await queryBuilder.getMany();
  }
}
