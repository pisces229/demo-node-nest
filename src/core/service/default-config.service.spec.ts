import { Test, TestingModule } from '@nestjs/testing';
import DefaultConfig from 'src/config';
import { DefaultConfigService } from 'src/core/service/default-config.service';
import { ConfigModule } from '@nestjs/config';

describe('DefaultConfigService', () => {
  let defaultConfigService: DefaultConfigService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: [`env/development.env`],
          load: [DefaultConfig],
          // expandVariables: true,
        }),
      ],
      providers: [DefaultConfigService],
    }).compile();
    defaultConfigService = await module.resolve<DefaultConfigService>(
      DefaultConfigService,
    );
  });
  it('defined', () => {
    expect(defaultConfigService).toBeDefined();
  });
  it('run', async () => {
    console.log(defaultConfigService.environment());
    console.log(defaultConfigService.port());
    console.log(defaultConfigService.database());
  });
});
