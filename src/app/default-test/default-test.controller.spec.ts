import { Test, TestingModule } from '@nestjs/testing';
import { DefaultTestController } from './default-test.controller';

describe('DefaultTestController', () => {
  let controller: DefaultTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefaultTestController],
    }).compile();

    controller = module.get<DefaultTestController>(DefaultTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
