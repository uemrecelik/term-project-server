import { Test, TestingModule } from '@nestjs/testing';
import { SensorController } from './sensor.controller';

describe('SensorController', () => {
  let controller: SensorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorController],
    }).compile();

    controller = module.get<SensorController>(SensorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe('SensorController', () => {
  let controller: SensorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorController],
    }).compile();

    describe('addData', () => {
      // addData testing for adding new data
      it('should create a Sensor object with the given temperature and humidity', () => {
        const result = controller.addData(25, 60);
        expect(result).toEqual({
          id: null,
          temperature: 25,
          humidity: 60,
          created_at: expect.any(Date),
        });
      });
    });
  });
});
