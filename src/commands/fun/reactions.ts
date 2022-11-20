import axios from "axios"
import { ApplicationCommandType, Client, CommandInteraction, EmbedBuilder } from "discord.js"
import { Command } from ".."

const WEEBSH_API = 'https://api.weeb.sh/images/random'

const generate_command = (key: string): Command => {
  return {
    name: key,
    description: `Returns a ${key} image.`,
    type: ApplicationCommandType.ChatInput,
    run: async (_client: Client, interaction: CommandInteraction) => {
      try {
        await axios
          .get(WEEBSH_API, {
            params: {
              Authorization: process.env.WEEBSH_TOKEN,
              type: key,
            },
          })
          .then(
            async (response: { data: any }) =>
              await interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setImage(`${response.data['url'] ?? ''}`)
                    .setFooter({
                      text: `Image provided by ${'weeb.sh'}`,
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
}

export const Cry = generate_command('cry')
export const Dance = generate_command('dance')
export const Happy = generate_command('happy')
export const Hug = generate_command('hug')
export const Kiss = generate_command('kiss')
export const Lewd = generate_command('lewd')
export const Neko = generate_command('neko')
export const Pat = generate_command('pat')
export const Slap = generate_command('slap')
export const Smug = generate_command('smug')
export const Triggered = generate_command('triggered')