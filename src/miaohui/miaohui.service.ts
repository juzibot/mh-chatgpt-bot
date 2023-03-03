import axios from 'axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MiaohuiService {
  @Inject()
  private readonly configService: ConfigService;

  async replyTextMessage (
    token: string,
    chatId: string,
    message: string,
  ) {
    const endpoint = this.configService.get<string>('miaohuiEndpoint');
    const res = await axios.post(`${endpoint}/message/send`, {
      chatId,
      token,
      messageType: 0,
      payload: {
        text: message,
      }
    });
    return res.data;
  }
}
