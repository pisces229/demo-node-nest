import { Test, TestingModule } from '@nestjs/testing';
import { DefaultAppRepository } from './default-app.repository';
import { DefaultAppService } from './default-app.service';

describe('1.DefaultAppService', () => {
  let service: DefaultAppService;
  let repository: DefaultAppRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DefaultAppService,
        // DefaultAppRepository,
        {
          provide: DefaultAppRepository,
          useValue: new DefaultAppRepository(),
        },
      ],
    }).compile();
    service = await module.resolve<DefaultAppService>(DefaultAppService);
    repository = await module.resolve<DefaultAppRepository>(
      DefaultAppRepository,
    );
  });
  it('defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
  it('run', async () => {
    jest.spyOn(service, 'run');
    expect(await service.run()).toBe(
      'DefaultAppService.DefaultAppRepository.run',
    );
    expect(await repository.run()).toBe('DefaultAppRepository.run');
    await service.run();
    expect(service.run).toHaveBeenCalledTimes(2);
    repository.run = async () => 'Overwrite.run';
    expect(await repository.run()).toBe('Overwrite.run');
    expect(await service.run()).toBe('DefaultAppService.Overwrite.run');
    expect(service.run).toHaveBeenCalledTimes(3);
  });
});
describe('2.DefaultAppService', () => {
  let service: DefaultAppService;
  let repository: DefaultAppRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DefaultAppService,
        // DefaultAppRepository,
        {
          provide: DefaultAppRepository,
          useValue: {
            run: jest.fn().mockImplementation(async () => 'Mock.run'),
          },
        },
      ],
    }).compile();
    service = await module.resolve<DefaultAppService>(DefaultAppService);
    repository = await module.resolve<DefaultAppRepository>(
      DefaultAppRepository,
    );
  });
  it('defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
  it('run', async () => {
    jest.spyOn(service, 'run');
    expect(await service.run()).toBe('DefaultAppService.Mock.run');
    expect(await repository.run()).toBe('Mock.run');
    expect(service.run).toHaveBeenCalledTimes(1);
    expect(repository.run).toHaveBeenCalledTimes(2);
  });
});
