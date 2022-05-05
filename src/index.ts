import { discordBotToken } from './constant'
import { MyBot } from './lib/discord'

const weblion = new MyBot({ intents: 32767 })

;(async () => {
  await weblion.loadCommand()
  await weblion.login(discordBotToken)

  console.log(`Logged in as ${weblion.user?.tag}`)
})().catch(console.error)

export const client = weblion
