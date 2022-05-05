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
    const word = <string>interaction.options.getString('word')
    const fixedWord = word.replace(/\s/g, '+')
    const url = `https://www.weblio.jp/content/${fixedWord}`
    await interaction.reply(url)
  }
}
