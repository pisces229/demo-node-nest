import { Test, TestingModule } from '@nestjs/testing';
import { Demo03Controller } from './demo03.controller';

describe('Demo03Controller', () => {
  let controller: Demo03Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Demo03Controller],
    }).compile();

    controller = module.get<Demo03Controller>(Demo03Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
