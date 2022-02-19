import { Test, TestingModule } from '@nestjs/testing';
import { DemoOrmService } from './demo-orm.service';

describe('DemoOrmService', () => {
  let service: DemoOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DemoOrmService],
    }).compile();

    service = module.get<DemoOrmService>(DemoOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
