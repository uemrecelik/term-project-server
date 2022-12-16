import { Test, TestingModule } from '@nestjs/testing';
import { SensorService } from './sensor.service';
import { Sensor } from './sensor.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('SensorService', () => {
  let service: SensorService;
  let repository: Repository<Sensor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorService],
    }).compile();

    repository = module.get<Repository<Sensor>>(getRepositoryToken(Sensor));

    service = module.get<SensorService>(SensorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    //Testing getAll method
    it('should return an array of sensors', async () => {
      const result = [
        { id: 1, temperature: 25, humidity: 50, created_at: new Date() },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(result);

      expect(await service.getAll()).toEqual(result);
    });
  });
});
