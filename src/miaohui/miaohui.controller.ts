import { Body, Controller, HttpCode, Inject, Logger, Post } from '@nestjs/common';
import { ChatgptGatewayService } from 'src/chatgpt-gateway/chatgpt-gateway.service';
import { exceptionAnswer, sensitiveAnswer, sensitiveQuestion } from 'src/config/msg-config';
import { ContentSecurityService } from 'src/content-security/content-security.service';
import { MessageModel, MsgType, TextPayload } from './miaohui.interface';
import { MiaohuiService } from './miaohui.service';

@Controller('miaohui')
export class MiaohuiController {
  private readonly logger = new Logger(MiaohuiController.name)

  @Inject()
  private readonly service: MiaohuiService;

  @Inject()
  private readonly chatgptGatewayService: ChatgptGatewayService;

  @Inject()
  private readonly contentSecurityService: ContentSecurityService;

  @Post('message')
  @HttpCode(200)
  async message (@Body() body: { data: MessageModel }) {
    const { token, chatId, contactId, botId, type, payload } = body.data;
    if (type !== MsgType.Text) {
      this.logger.log(`Skip process message ${MsgType[type]} that is not text type`);
      return;
    }

    const textPayload = payload as TextPayload
    const replyMessage = await this.getMessageReply(botId, contactId, textPayload.text);
    await this.service.replyTextMessage(token, chatId, replyMessage);
  }

  private async getMessageReply (
    botId: string,
    contactId: string,
    message: string,
  ): Promise<string> {
    const isQuestionSensitive = await this.contentSecurityService.isSensitive(message);
    if (isQuestionSensitive) {
      return sensitiveQuestion;
    }

    const sessionId = `${botId}_${contactId}`;
    const reply = await this.chatgptGatewayService.sendMessage(sessionId, message);
    if (reply.errMsg) {
      return exceptionAnswer;
    }

    const isAnswerSensitive = await this.contentSecurityService.isSensitive(reply.response);
    if (isAnswerSensitive) {
      return sensitiveAnswer;
    }
    return reply.response;
  }
}
