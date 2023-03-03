import { Module } from '@nestjs/common';
import { MiaohuiModule } from './miaohui/miaohui.module';
import { ChatgptGatewayModule } from './chatgpt-gateway/chatgpt-gateway.module';
import { ConfigModule } from '@nestjs/config';
import { ContentSecurityModule } from './content-security/content-security.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MiaohuiModule,
    ChatgptGatewayModule,
    ContentSecurityModule,
  ],
})
export class AppModule {}
