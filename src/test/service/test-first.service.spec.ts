import { Test, TestingModule } from '@nestjs/testing';
import { TestFirstService } from './test-first.service';

describe('TestFirstService', () => {
  let service: TestFirstService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestFirstService],
    }).compile();

    service = module.get<TestFirstService>(TestFirstService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
