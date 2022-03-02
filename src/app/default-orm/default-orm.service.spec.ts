import { Test, TestingModule } from '@nestjs/testing';
import { DefaultOrmService } from './default-orm.service';

describe('DefaultOrmService', () => {
  let service: DefaultOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultOrmService],
    }).compile();

    service = module.get<DefaultOrmService>(DefaultOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
