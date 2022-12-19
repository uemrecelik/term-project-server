import { Test, TestingModule } from '@nestjs/testing';
import { SensorService } from './sensor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sensor } from './sensor.entity';
import { Repository } from 'typeorm';
import { SensorController } from './sensor.controller';

describe('SensorService', () => {
  let service: SensorService;
  let sensorRepository: Repository<Sensor>;
  let controller: SensorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SensorService,
        {
          provide: getRepositoryToken(Sensor),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SensorService>(SensorService);
    sensorRepository = module.get<Repository<Sensor>>(
      getRepositoryToken(Sensor),
    );

    service = module.get<SensorService>(SensorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('sensorRepository should be defined', function () {
    expect(sensorRepository).toBeDefined();
  });

  it('SensorService should add data', async function () {
    const mockSensor: Sensor = {
      id: null,
      temperature: 25,
      humidity: 35,
      created_at: null,
    };
    const result: Sensor = await service.createOne(mockSensor);
    expect(result).toEqual(undefined);
  });
});
