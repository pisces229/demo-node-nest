import { Test, TestingModule } from '@nestjs/testing';
import { DefaultGetController } from './default-get.controller';

describe('DefaultGetController', () => {
  let controller: DefaultGetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefaultGetController],
    }).compile();

    controller = module.get<DefaultGetController>(DefaultGetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
