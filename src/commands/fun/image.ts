import axios from 'axios'
import { ApplicationCommandType, Client, CommandInteraction, EmbedBuilder } from "discord.js"
import { Command } from '..'

interface RandomImageResponse {
  fileSizeBytes?: string
  url?: string
  file?: string
}

const SERVICES = {
  birb: [
    'https://random.birb.pw/tweet.json',
    'file',
    'random.birb.pw',
    'https://random.birb.pw/img/',
  ],
  dog: ['https://random.dog/woof.json', 'url', 'random.dog', ''],
  cat: ['https://nekos.life/api/v2/img/meow', 'url', 'nekos.life', ''],
}

const INSPIROBOT_URL = 'http://inspirobot.me/api?generate=true'

const generate_command = (key: keyof typeof SERVICES): Command => {
  const [apiURL, fileKey, serviceName, prepend] = SERVICES[key]
  
  return ({
    name: key,
    description: "Generate a fake commit message that looks like a Discord webhook.",
    type: ApplicationCommandType.ChatInput,
    run: async (_client: Client, interaction: CommandInteraction) => {
      try {
        await axios.get(apiURL).then(
          async (response: { data: RandomImageResponse }) =>
            await interaction.reply({
              embeds: [
                new EmbedBuilder()
                .setImage(
                  `${prepend}${response.data[fileKey as 'file'] ?? ''}`
                  )
                  .setFooter({
                    text: `Image provided by ${serviceName}`,
                  }),
                ],
              }))
          } catch (error) {
            await interaction.reply({
              content: 'Something went wrong!',
              ephemeral: true
            })
          }
        }
      })
    }
    
export const RandomDog = generate_command('dog')
export const RandomBirb = generate_command('birb')
export const RandomCat = generate_command('cat')

export const InspiroBot: Command = {
  name: "inspirobot",
  description: "Generate a random image from Inspirobot.",
  type: ApplicationCommandType.ChatInput,
  run: async (_client: Client, interaction: CommandInteraction) => {
    try {
      await axios.get(INSPIROBOT_URL).then(
        async (response) =>
          await interaction.reply({
            embeds: [
              new EmbedBuilder().setImage(response.data).setFooter({
                text: `Image provided by ${'inspirobot.me'}`,
              }),
            ],
          })
      )
    } catch (error) {
      await interaction.reply({
        content: 'Something went wrong!',
        ephemeral: true
      })
    }
  }
}