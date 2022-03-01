import { Test, TestingModule } from '@nestjs/testing';
import { Demo01Controller } from './demo01.controller';

describe('Demo01Controller', () => {
  let controller: Demo01Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Demo01Controller],
    }).compile();

    controller = module.get<Demo01Controller>(Demo01Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
