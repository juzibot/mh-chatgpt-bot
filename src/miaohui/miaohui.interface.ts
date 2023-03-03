export enum Gender {
  Unknown = 0,
  Male    = 1,
  Female  = 2,
}

export enum ContactType {
  Unknown     = 0,
  Individual  = 1,
  Official    = 2,
  Corporation = 3,
}

export enum RoomInvitationStatus {
  CREATED,
  SUCCESS,
  ERROR,
}

export enum MessageSource {
  PHONE = 0,
  CONSOLE = 1,
  BROADCAST = 2,
  AUTO_REPLY = 3,
  CREATE_ROOM = 4,
  BOT_REPLY = 5,
  API = 6,
  SOP = 7,
}

export interface TextPayload {
  text: string,
  mention?: string[],
  quoteMessage?: QuoteMessage,
  wecomMention?: string[], // send message wecom
}

export interface QuoteMessage {
  wxid: string,
  nickame: string,
  messageId: string,
  type: MsgType,
  content: MessagePayload,
  timestamp: number,
}

export interface VoicePayload {
  voiceUrl: string,
  duration: number,
}

export interface ImagePayload {
  imageUrl: string,
  size?: number,
  artwork?: {
    url: string,
    height: number,
    width: number,
  },
}

export interface VideoPayload {
  videoUrl: string,
}

export interface ChannelPayload {
  avatarUrl: string,
  coverUrl: string,
  description: string,
  feedType: number,
  nickname: string,
  thumbUrl: string,
  url: string,
  extras: string,
}

export interface UrlPayload {
  title: string,
  description: string,
  thumbnailUrl: string,
  url: string,
}

export interface FilePayload {
  name: string,
  fileUrl: string,
  size?: number,
}

export interface RecalledPayload {
  content: string,
}

export interface EmoticonPayload {
  imageUrl?: string,
}

export interface MiniProgramPayload {
  appid?: string, // for mini program message
  description?: string, // for mini program message
  pagePath?: string, // for mini program message
  thumbKey?: string, // for mini program message
  thumbUrl?: string, // for mini program message
  title?: string, // for mini program message
  username?: string, // for mini program message
}

export interface LocationPayload {
  accuracy: number,
  address: string,
  latitude: number,
  longitude: number,
  name: string,
}

export interface ContactCardPayload {
  content?: string,
  avatar: string;
  coworker: boolean;
  friend: boolean;
  gender: Gender;
  wxid: string;
  name: string;
  type: ContactType;
  weixin: string;
}

export interface RawPayload {
  content: string,
}

export interface RoomInvitationPayload {
  roomTopic: string,
  avatarUrl: string,
  invitaterName: string,
  inviteModelId: string,
  inviteStatus: RoomInvitationStatus,
}

export enum MsgType {
  Unknown = 0,
  Attachment = 1,
  Audio = 2,
  Contact = 3,
  ChatHistory = 4,
  Emoticon = 5,
  Image = 6,
  Text = 7,
  Location = 8,
  MiniProgram = 9,
  Money = 10,
  Recalled = 11,
  Url = 12,
  Video = 13,
  Channel = 14,
  RoomInvitation = 9999,
  System = 10000,
  WechatSystem = 10001,
}

export type MessagePayload = TextPayload
                           | VoicePayload
                           | ImagePayload
                           | VideoPayload
                           | ChannelPayload
                           | UrlPayload
                           | FilePayload
                           | EmoticonPayload
                           | LocationPayload
                           | RawPayload
                           | RecalledPayload
                           | MiniProgramPayload
                           | RoomInvitationPayload;

export interface MessageModel {
  token: string,
  messageId: string,
  botId: string,
  groupId: string,
  chatId: string,
  roomTopic?: string,
  roomId?: string,
  roomWecomChatId?: string,
  contactName: string,
  contactId: string,
  contactExternalUserId?: string,
  contactType: ContactType,
  coworker: boolean,
  payload: MessagePayload,
  type: MsgType,
  timestamp: number,
  snapshotDay: string,
  avatar: string,
  isSelf: boolean,
  mentionSelf: boolean,
  sendBy?: string, // user in xiaoju system that trigger the message
  source?: MessageSource,
  isHello?: boolean,
  corporation?: string,
  extraInfo?: string,
  errCode?: number,
  isAutoLoad?: boolean
}

export interface MessageModelPacket {
  clientId?: string,
  message: MessageModel,
}
