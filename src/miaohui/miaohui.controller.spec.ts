import { Test, TestingModule } from '@nestjs/testing';
import { MiaohuiController } from './miaohui.controller';

describe('MiaohuiController', () => {
  let controller: MiaohuiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MiaohuiController],
    }).compile();

    controller = module.get<MiaohuiController>(MiaohuiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
