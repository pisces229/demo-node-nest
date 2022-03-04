import { Test, TestingModule } from '@nestjs/testing';
import { DefaultAppController } from './default-app.controller';
import { DefaultAppRepository } from './default-app.repository';
import { DefaultAppService } from './default-app.service';

describe('DefaultAppController', () => {
  let controller: DefaultAppController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefaultAppController],
      providers: [DefaultAppService, DefaultAppRepository],
    }).compile();
    controller = await module.resolve<DefaultAppController>(
      DefaultAppController,
    );
  });
  it('defined', () => {
    expect(controller).toBeDefined();
  });
  it('run', async () => {
    expect(await controller.run()).toBe(
      'DefaultAppController.DefaultAppService.DefaultAppRepository.run',
    );
  });
});
