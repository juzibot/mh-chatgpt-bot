import axios from 'axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatgptGatewayService {
  @Inject()
  private readonly configService: ConfigService;

  async sendMessage (sessionId: string, message: string) {
    const endpoint = this.configService.get<string>('chatgptGatewayEndpoint');
    const apiKey = this.configService.get<string>('chatgptApiKey');
    const res = await axios.post(`${endpoint}/api/chatgpt/message`, {
      sessionId,
      message,
    }, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      }
    });

    return res.data as {
      response: string,
      errMsg?: string,
    }
  }
}
