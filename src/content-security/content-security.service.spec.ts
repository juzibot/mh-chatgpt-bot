import { Test, TestingModule } from '@nestjs/testing';
import { ContentSecurityService } from './content-security.service';

describe('ContentSecurityService', () => {
  let service: ContentSecurityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentSecurityService],
    }).compile();

    service = module.get<ContentSecurityService>(ContentSecurityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
