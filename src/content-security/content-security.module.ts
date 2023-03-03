import { Module } from '@nestjs/common';
import { ContentSecurityService } from './content-security.service';

@Module({
  providers: [ContentSecurityService],
  exports: [ContentSecurityService],
})
export class ContentSecurityModule {}
