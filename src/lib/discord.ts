import { readdir } from 'fs/promises'
import { join, parse } from 'path'

import { Client, CommandInteraction } from 'discord.js'
import type { ChatInputApplicationCommandData } from 'discord.js'

interface ICommand {
  readonly data: ChatInputApplicationCommandData
  readonly execute: (interaction: CommandInteraction) => Promise<void>
}

export class MyBot extends Client {
  readonly commands: ICommand[] = []

  async loadCommand(): Promise<void> {
    const path = join(__dirname, '..', 'commands')
    const files = await readdir(path)

    files.map(parse).forEach(async ({ name }) => {
      // NOTE: must be a relative path
      const path = join('..', 'commands', name)
      const { data, execute }: ICommand = (await import(path)).default

      this.commands.push({ data, execute })
    })

    this.once('ready', async () => {
      const data = this.commands.map(({ data }) => data)

      await this.application?.commands.set(data)
      this.application?.commands.cache.forEach(({ name }) =>
        console.log(`loaded ${name} command`)
      )
    })

    this.on('interactionCreate', async (interaction) => {
      if (!(interaction instanceof CommandInteraction)) return

      const command: ICommand | undefined = this.commands.find(
        (command) => interaction.command?.name === command.data.name
      )

      await command?.execute(interaction).catch(console.error)
    })
  }
}
