import { Test, TestingModule } from '@nestjs/testing';
import { DemoOrmController } from './demo-orm.controller';

describe('DemoOrmController', () => {
  let controller: DemoOrmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemoOrmController],
    }).compile();

    controller = module.get<DemoOrmController>(DemoOrmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
