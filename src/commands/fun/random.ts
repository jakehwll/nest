import { ApplicationCommandOptionType, ApplicationCommandType, Client, CommandInteraction } from "discord.js";
import { Command } from "..";

export const Coin: Command = {
  name: "coin",
  description: "Flip a coin.",
  type: ApplicationCommandType.ChatInput,
  run: async (_client: Client, interaction: CommandInteraction) => {
    const choices = ['heads', 'tails']
    var index = Math.floor(Math.random() * choices.length)
    await interaction.reply(choices[index])
  }
}

export const Dice: Command = {
  name: "dice",
  description: "Roll a die with input in the AdX notation.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'times',
      description: 'The object/thing/something to rate.',
      required: true,
      type: ApplicationCommandOptionType.String
    }
  ],
  run: async (_client: Client, interaction: CommandInteraction) => {
    const _times = interaction.options.get('times')
    var [times, num] = [0, 0]
    if (_times && _times.value)
      var [times, num] = (_times.value.toString().split('d') as string[]).map(
        (v: string) => parseInt(v)
      )
    else var [times, num] = [1, 6]
    const maxscore = times * num
    const score = Math.floor(Math.random() * (maxscore - times) + times)
    await interaction.reply(`You rolled a \`${score}/${maxscore}\`.`)
  }
}

export const Rate: Command = {
  name: "rate",
  description: "Gives something a rating.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'object',
      description: 'The object/thing/something to rate.',
      required: true,
      type: ApplicationCommandOptionType.String
    }
  ],
  run: async (_client: Client, interaction: CommandInteraction) => {
    const _object = interaction.options.get('object')
    const rating = Math.floor(Math.random() * (10 - 1))
    if (!_object) return
    await interaction.reply(`Birb rates \`${_object.value}\` a ${rating}/10`)
  }
}

export const Eightball: Command = {
  name: "eightball",
  description: "Asks the magic 8ball a question.",
  type: ApplicationCommandType.ChatInput,
  run: async (_client: Client, interaction: CommandInteraction) => {
    const _options = [
      'That it is certain.',
      'That it is decidedly so.',
      'That there is without a doubt.',
      'Yes, definitely.',
      'You may rely on it.',
      'As I see it, yes.',
      'Most likely.',
      "The outlook's good.",
      'Yes.',
      'Signs point to yes.',
      'Reply hazy, try again.',
      'Ask again later.',
      'Better not tell you now.',
      'Cannot predict now.',
      'Concentrate and ask again.',
      "Don't count on it.",
      'My reply is no.',
      'My sources say no.',
      'Outlook not so good.',
      'Very doubtful.',
    ]
    const option = Math.floor(Math.random() * _options.length)
    await interaction.reply(`${_options[option]}`)
  }
}

export const Aaa: Command = {
  name: "aaa",
  description: "Aaa.",
  type: ApplicationCommandType.ChatInput,
  run: async (_client: Client, interaction: CommandInteraction) => {
    const times = Math.floor(Math.random() * (200 - 1) + 1)
    await interaction.reply(`${'a'.repeat(times)}`)
  }
}