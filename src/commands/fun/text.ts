import { ApplicationCommandOptionType, ApplicationCommandType, Client, CommandInteraction } from "discord.js";
import { Command } from "..";

export const BigText: Command = {
  name: "bigtext",
  description: "Convert text into huge emoji.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'content',
      description: 'The content to manipulate.',
      required: true,
      type: ApplicationCommandOptionType.String
    }
  ],
  run: async (_client: Client, interaction: CommandInteraction) => {
    const content = interaction.options.get('content')
    if (!content || !content.value)
      return await interaction.reply({
        content: 'Something went wrong!',
        ephemeral: true
      })
    const reply = (content.value as string)
      .toLowerCase()
      .split('')
      .map((v: string) => (v.match(/[a-z]/i) ? `:regional_indicator_${v}:` : v))
      .join('')
    await interaction.reply(`${reply}`)
  }
}

export const XD: Command = {
  name: "xd",
  description: "Make an XD out of the word given.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'content',
      description: 'The content to manipulate.',
      required: true,
      type: ApplicationCommandOptionType.String
    }
  ],
  run: async (_client: Client, interaction: CommandInteraction) => {
    const content = interaction.options.get('content')
    if (!content || !content.value)
      return await interaction.reply({
        content: 'Something went wrong!',
        ephemeral: true
      })
    const word = content.value as string
    await interaction.reply(`\`\`\`
    ${word}           ${word}     ${word}  ${word}
      ${word}       ${word}       ${word}     ${word}
        ${word}   ${word}         ${word}      ${word}
        ${word}   ${word}         ${word}      ${word}
      ${word}       ${word}       ${word}     ${word}
    ${word}           ${word}     ${word}  ${word}\`\`\``)
  }
}

export const Clapify: Command = {
  name: "clapify",
  description: "Add clap emojis after each word.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'content',
      description: 'The content to manipulate.',
      required: true,
      type: ApplicationCommandOptionType.String
    }
  ],
  run: async (_client: Client, interaction: CommandInteraction) => {
    const content = interaction.options.get('content')
    if (!content || !content.value)
      return await interaction.reply({
        content: 'Something went wrong!',
        ephemeral: true
      })
    const reply = (content.value as string)
      .split(' ')
      .map((v: string) => `${v} 👏 `)
      .join('')
    await interaction.reply(`${reply}`)
  }
}

export const Tobleflep: Command = {
  name: "tobleflep",
  description: "Tableflip, but random.",
  type: ApplicationCommandType.ChatInput,
  run: async (_client: Client, interaction: CommandInteraction) => {
    const tableflip = '(╯°□°）╯︵ ┻━┻'
    const reply = (tableflip as string)
      .split('')
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .join('')
    await interaction.reply(`${reply}`)
  }
}
