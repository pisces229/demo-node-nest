import { Test, TestingModule } from '@nestjs/testing';
import { DefaultAppRepository } from './default-app.repository';

describe('DefaultAppRepository', () => {
  let repository: DefaultAppRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultAppRepository],
    }).compile();
    repository = await module.resolve<DefaultAppRepository>(
      DefaultAppRepository,
    );
  });
  it('defined', () => {
    expect(repository).toBeDefined();
  });
  it('run', async () => {
    expect(await repository.run()).toBe('DefaultAppRepository.run');
  });
});
