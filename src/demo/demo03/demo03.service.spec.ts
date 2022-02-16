import { Test, TestingModule } from '@nestjs/testing';
import { Demo03Service } from './demo03.service';

describe('Demo03Service', () => {
  let service: Demo03Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Demo03Service],
    }).compile();

    service = module.get<Demo03Service>(Demo03Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
