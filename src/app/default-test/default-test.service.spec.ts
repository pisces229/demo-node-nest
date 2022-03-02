import { Test, TestingModule } from '@nestjs/testing';
import { DefaultTestService } from './default-test.service';

describe('DefaultTestService', () => {
  let service: DefaultTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultTestService],
    }).compile();

    service = module.get<DefaultTestService>(DefaultTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
