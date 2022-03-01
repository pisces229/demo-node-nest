import { Test, TestingModule } from '@nestjs/testing';
import { Demo02Service } from './demo02.service';

describe('Demo02Service', () => {
  let service: Demo02Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Demo02Service],
    }).compile();

    service = module.get<Demo02Service>(Demo02Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
