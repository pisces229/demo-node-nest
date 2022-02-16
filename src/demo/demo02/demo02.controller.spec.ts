import { Test, TestingModule } from '@nestjs/testing';
import { Demo02Controller } from './demo02.controller';

describe('Demo02Controller', () => {
  let controller: Demo02Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Demo02Controller],
    }).compile();

    controller = module.get<Demo02Controller>(Demo02Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
