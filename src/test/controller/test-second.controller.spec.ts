import { Test, TestingModule } from '@nestjs/testing';
import { TestSecondController } from './test-second.controller';

describe('TestSecondController', () => {
  let controller: TestSecondController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestSecondController],
    }).compile();

    controller = module.get<TestSecondController>(TestSecondController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
