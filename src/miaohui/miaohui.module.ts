import { Module } from '@nestjs/common';
import { ChatgptGatewayModule } from 'src/chatgpt-gateway/chatgpt-gateway.module';
import { ContentSecurityModule } from 'src/content-security/content-security.module';
import { MiaohuiController } from './miaohui.controller';
import { MiaohuiService } from './miaohui.service';

@Module({
  imports: [
    ChatgptGatewayModule,
    ContentSecurityModule,
  ],
  controllers: [MiaohuiController],
  providers: [MiaohuiService]
})
export class MiaohuiModule {}
