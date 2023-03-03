import { Logger } from '@nestjs/common'
import { checkEnv } from './env-check'

const mustExistEnvList: string[] = [
  'CHATGPT_API_KEY',
]
checkEnv(mustExistEnvList)

export default () => {
  return {
    port: process.env.PORT || 3000,

    chatgptGatewayEndpoint: process.env.CHATGPT_GATEWAY_ENDPOINT || 'https://chatgpt.juzibot.com',
    chatgptApiKey: process.env.CHATGPT_API_KEY || '',

    miaohuiEndpoint: process.env.MIAOHUI_ENDPOINT || 'https://ex-api.botorange.com',

    enableContentSecurity: process.env.ENABLE_CONTENT_SECURITY === 'true',
  }
}

process.on('unhandledRejection', (reason, promise) => {
  promise.catch(e => Logger.error(`receive unhandled rejection, reason: ${reason}\n${e?.stack || e?.message}`))
})

process.on('uncaughtException', (error, origin) => {
  Logger.error(`receive uncaught exception:\n${error?.stack || error?.message}\norigin: ${origin}`)
})
