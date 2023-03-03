import { Test, TestingModule } from '@nestjs/testing';
import { ChatgptGatewayService } from './chatgpt-gateway.service';

describe('ChatgptGatewayService', () => {
  let service: ChatgptGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatgptGatewayService],
    }).compile();

    service = module.get<ChatgptGatewayService>(ChatgptGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
