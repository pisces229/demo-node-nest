import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DefaultLogger } from 'src/core/logger/default.logger';
import { DefaultAppRepository } from './default-app.repository';
import { DefaultAppService } from './default-app.service';
import { Scope } from '@nestjs/common';

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
            debug: (message: string) => console.log(message),
            info: (message: string) => console.log(message),
          },
        },
        {
          scope: Scope.DEFAULT,
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'server.environment': {
                  return 'TEST';
                }
                case 'server.port': {
                  return 9999;
                }
              }
            }),
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
    await service.run();
    expect(service.run).toHaveBeenCalledTimes(2);
  });
});
