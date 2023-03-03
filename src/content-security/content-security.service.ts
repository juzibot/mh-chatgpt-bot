import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SensWordList } from './word-list';

@Injectable()
export class ContentSecurityService {
  @Inject()
  private readonly configService: ConfigService;

  async isSensitive (message: string) {
    const enableContentSecurity = this.configService.get<boolean>('enableContentSecurity');
    if (!enableContentSecurity) {
      return false;
    }
    return SensWordList.some(word => message.includes(word));
  }
}
