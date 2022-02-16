import { Test, TestingModule } from '@nestjs/testing';
import { DemoSwaggerController } from './demo-swagger.controller';

describe('DemoSwaggerController', () => {
  let controller: DemoSwaggerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemoSwaggerController],
    }).compile();

    controller = module.get<DemoSwaggerController>(DemoSwaggerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
