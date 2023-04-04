import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plants } from './plants.entity';

@Injectable()
export class PlantsService {
  constructor(
    @InjectRepository(Plants)
    private plantsRepository: Repository<Plants>,
  ) {}

  getUserPlants(userId: number): Promise<Plants[]> {
    return this.plantsRepository.find({
      where: [{ userId: userId }],
    });
  }

  async updateOptimumTemp(value: string, plantId: number): Promise<any> {
    return this.plantsRepository.update(
      { id: plantId },
      { optimum_temp: Number(value) },
    );
  }

  async updateOptimumHum(value: string, plantId: number): Promise<any> {
    return this.plantsRepository.update(
      { id: plantId },
      { optimum_hum: Number(value) },
    );
  }
}
