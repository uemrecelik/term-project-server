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
}
