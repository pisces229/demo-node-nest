import { Test, TestingModule } from '@nestjs/testing';
import { TestSecondService } from './test-second.service';

describe('TestSecondService', () => {
  let service: TestSecondService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestSecondService],
    }).compile();

    service = module.get<TestSecondService>(TestSecondService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
