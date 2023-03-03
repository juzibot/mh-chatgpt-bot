import { Body, Controller, HttpCode, Inject, Logger, Post } from '@nestjs/common';
import { ChatgptGatewayService } from 'src/chatgpt-gateway/chatgpt-gateway.service';
import { exceptionAnswer, sensitiveAnswer, sensitiveQuestion } from 'src/config/msg-config';
import { ContentSecurityService } from 'src/content-security/content-security.service';
import { MessageModel, MsgType, TextPayload } from './miaohui.interface';
import { MiaohuiService } from './miaohui.service';

@Controller('miaohui')
export class MiaohuiController {
  @Inject()
  private readonly service: MiaohuiService;

  @Inject()
  private readonly chatgptGatewayService: ChatgptGatewayService;

  @Inject()
  private readonly contentSecurityService: ContentSecurityService;

  private readonly logger = new Logger(MiaohuiController.name)

  @Post('message')
  @HttpCode(200)
  async message (@Body() body: { data: MessageModel }) {
    const { token, chatId, contactId, botId, type, payload, roomId } = body.data;
    if (type !== MsgType.Text) {
      this.logger.log(`Skip process message ${MsgType[type]} that is not text type`);
      return;
    }

    const textPayload = payload as TextPayload
    const text = textPayload.text;

    this.logger.log(`Start processing botId: ${botId}, contactId: ${contactId}, message: ${text}`);
    const replyMessage = await this.getMessageReply(botId, contactId, text);
    this.logger.log(`Replying to botId: ${botId}, contactId: ${contactId}, message: ${replyMessage}`);
    const mention = roomId ? [contactId] : undefined;
    await this.service.replyTextMessage(token, chatId, replyMessage, mention);
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
