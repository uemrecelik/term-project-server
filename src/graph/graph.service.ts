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
        "DATE_FORMAT(reading.created_at, '%H:00') as date",
        'AVG(reading.temperature) as avg_temperature',
        'AVG(reading.humidity) as avg_humidity',
      ])
      .where(
        'reading.created_at >= :startOfDay AND reading.created_at < :endOfDay AND reading.plantId = :plantId',
        { startOfDay, endOfDay, plantId },
      )
      .groupBy('date');

    const results = await queryBuilder.getRawMany();

    return results.map(
      (result: {
        date: string;
        avg_temperature: string;
        avg_humidity: string;
      }) => ({
        date: result.date,
        temperature: parseFloat(result.avg_temperature),
        humidity: parseFloat(result.avg_humidity),
      }),
    );
  }

  async getDailyGraphData(plant: string): Promise<GraphDataDto[]> {
    const now = new Date();
    const endOfDay = new Date();
    const startOfDay = new Date(endOfDay.getTime() - 7 * 24 * 60 * 60 * 1000);

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
        "DATE_FORMAT(reading.created_at, '%W') as day",
        "DATE_FORMAT(reading.created_at, '%Y-%m-%d') as date",
        'AVG(reading.temperature) as avg_temperature',
        'AVG(reading.humidity) as avg_humidity',
      ])
      .where(
        'reading.created_at >= :startOfDay AND reading.created_at <= :endOfDay AND reading.plantId = :plantId',
        { startOfDay, endOfDay, plantId },
      )
      .groupBy('day');

    const results = await queryBuilder.getRawMany();

    return results.map(
      (result: {
        day: string;
        avg_temperature: string;
        avg_humidity: string;
      }) => ({
        date: result.day,
        temperature: parseFloat(result.avg_temperature),
        humidity: parseFloat(result.avg_humidity),
      }),
    );
  }

  async getWeeklyGraphData(plant: string): Promise<GraphDataDto[]> {
    const now = new Date();
    const endOfWeek = new Date();
    const startOfWeek = new Date(
      endOfWeek.getTime() - 4 * 7 * 24 * 60 * 60 * 1000,
    );

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
        "CONCAT('Week ', WEEK(reading.created_at) - WEEK(:endOfWeek) - 1) as week_number",
        'AVG(reading.temperature) as avg_temperature',
        'AVG(reading.humidity) as avg_humidity',
      ])
      .where(
        'reading.created_at >= :startOfWeek AND reading.created_at <= :endOfWeek AND reading.plantId = :plantId',
        { startOfWeek, endOfWeek, plantId },
      )
      .groupBy('week_number');

    const results = await queryBuilder.getRawMany();

    return results.map(
      (result: {
        week_number: string;
        avg_temperature: string;
        avg_humidity: string;
      }) => ({
        date: result.week_number,
        temperature: parseFloat(result.avg_temperature),
        humidity: parseFloat(result.avg_humidity),
      }),
    );
  }

  async getMonthlyGraphData(plant: string): Promise<GraphDataDto[]> {
    const now = new Date();
    const endOfMonth = new Date();
    const startOfMonth = new Date(
      endOfMonth.getTime() - 12 * 30 * 24 * 60 * 60 * 1000,
    );

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
        "DATE_FORMAT(reading.created_at, '%M') as month_name",
        'AVG(reading.temperature) as avg_temperature',
        'AVG(reading.humidity) as avg_humidity',
      ])
      .where(
        'reading.created_at >= :startOfMonth AND reading.created_at <= :endOfMonth AND reading.plantId = :plantId',
        { startOfMonth, endOfMonth, plantId },
      )
      .groupBy('month_name');

    const results = await queryBuilder.getRawMany();

    return results.map(
      (result: {
        month_name: string;
        avg_temperature: string;
        avg_humidity: string;
      }) => ({
        date: result.month_name,
        temperature: parseFloat(result.avg_temperature),
        humidity: parseFloat(result.avg_humidity),
      }),
    );
  }
}
