import { CommandInteraction } from 'discord.js'

export default {
  data: {
    name: 'w',
    description: '検索する',
    options: [{
      type: 'STRING',
      name: 'word',
      description: '検索する単語',
      required: true
    }]
  },
  async execute (interaction: CommandInteraction) {
    // required なので絶対ある。
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await interaction.reply(`https://www.weblio.jp/content/${interaction.options.getString('word')}`)
  }
}
