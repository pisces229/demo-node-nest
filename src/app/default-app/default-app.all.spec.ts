import { Test, TestingModule } from '@nestjs/testing';
import { DefaultLogger } from 'src/core/logger/default.logger';
import { DefaultAppRepository } from './default-app.repository';
import { DefaultAppService } from './default-app.service';
import { Scope } from '@nestjs/common';
import { DefaultConfigService } from 'src/core/service/default-config.service';

describe('DefaultAppAllTest', () => {
  let service: DefaultAppService;
  let repository: DefaultAppRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          scope: Scope.DEFAULT,
          provide: DefaultLogger,
          useValue: {
            debug: jest.fn((message: string) => console.log(message)),
            info: jest.fn((message: string) => console.log(message)),
          },
        },
        {
          scope: Scope.DEFAULT,
          provide: DefaultConfigService,
          useValue: {
            environment: jest.fn(() => 'Jest Test'),
          },
        },
        // app
        {
          scope: Scope.DEFAULT,
          provide: DefaultAppService,
          useClass: DefaultAppService,
        },
        {
          scope: Scope.DEFAULT,
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
    console.log(await service.run());
    expect(service.run).toHaveBeenCalledTimes(2);
  });
});
