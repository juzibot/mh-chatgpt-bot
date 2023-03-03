import { Test, TestingModule } from '@nestjs/testing';
import { MiaohuiService } from './miaohui.service';

describe('MiaohuiService', () => {
  let service: MiaohuiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiaohuiService],
    }).compile();

    service = module.get<MiaohuiService>(MiaohuiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
