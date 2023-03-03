import { Module } from '@nestjs/common';
import { ChatgptGatewayService } from './chatgpt-gateway.service';

@Module({
  providers: [ChatgptGatewayService],
  exports: [ChatgptGatewayService],
})
export class ChatgptGatewayModule {}
