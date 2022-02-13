import { Test, TestingModule } from '@nestjs/testing';
import { TestFirstController } from './test-first.controller';

describe('TestFirstController', () => {
  let controller: TestFirstController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestFirstController],
    }).compile();

    controller = module.get<TestFirstController>(TestFirstController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
