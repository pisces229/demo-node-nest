import { Test, TestingModule } from '@nestjs/testing';
import { DefaultSwaggerController } from './default-swagger.controller';

describe('DefaultSwaggerController', () => {
  let controller: DefaultSwaggerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefaultSwaggerController],
    }).compile();

    controller = module.get<DefaultSwaggerController>(DefaultSwaggerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
