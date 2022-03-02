import { Test, TestingModule } from '@nestjs/testing';
import { DefaultOrmController } from './default-orm.controller';

describe('DefaultOrmController', () => {
  let controller: DefaultOrmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefaultOrmController],
    }).compile();

    controller = module.get<DefaultOrmController>(DefaultOrmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
