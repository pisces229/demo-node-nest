import { Test, TestingModule } from '@nestjs/testing';
import { Demo01Service } from './demo01.service';

describe('Demo01Service', () => {
  let service: Demo01Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Demo01Service],
    }).compile();

    service = module.get<Demo01Service>(Demo01Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
