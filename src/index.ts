import { discordBotToken } from './constant'
import { MyBot } from './lib/discordBot'

const weblion = new MyBot({ intents: 32767 })

;(async () => {
  await weblion.loadCommand()
  await weblion.login(discordBotToken)

  if (weblion.user === null) {
    console.log('Login failed')
    process.exit(1)
  }

  console.log(`Logged in as ${weblion.user.tag}`)
})().catch(console.error)

export const client = weblion
