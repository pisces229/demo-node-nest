import { Test, TestingModule } from '@nestjs/testing';
import { DefaultPostController } from './default-post.controller';

describe('DefaultPostController', () => {
  let controller: DefaultPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefaultPostController],
    }).compile();

    controller = module.get<DefaultPostController>(DefaultPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
