import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sensor } from '../sensor/sensor.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Plants } from '../plants/plants.entity';
import { GraphDataDto } from './graph.dto';

@Injectable()
export class GraphService {
  constructor(
    @InjectRepository(Sensor)
    private sensorRepository: Repository<Sensor>,
    @InjectRepository(Plants)
    private plantRepository: Repository<Plants>,
  ) {}

  async getHourlyGraphData(plant: string): Promise<GraphDataDto[]> {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

    const selectedPlant: Plants = await this.plantRepository.findOne({
      select: ['id'],
      where: {
        name: plant,
      },
    });

    const plantId: number = selectedPlant.id;
    const queryBuilder: SelectQueryBuilder<Sensor> = this.sensorRepository
      .createQueryBuilder('reading')
      .select([
        "DATE_FORMAT(reading.created_at, '%H') as date",
        'AVG(reading.temperature) as temperature',
        'AVG(reading.humidity) as humidity',
      ])
      .where(
        'reading.created_at >= :startOfDay AND reading.created_at < :endOfDay AND reading.plantId = :plantId',
        { startOfDay, endOfDay, plantId },
      )
      .groupBy('date');

    const results = await queryBuilder.getRawMany();
    return results;
  }
}
