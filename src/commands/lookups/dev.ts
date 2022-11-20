import axios from "axios";
import { ApplicationCommandOptionType, ApplicationCommandType, Client, CommandInteraction, EmbedBuilder } from "discord.js";
import { Command } from "..";

const FIELDS_PYPI = ["license", "docs_url", "home_page", "requires_python", "author"]
const FIELDS_NPM = ["license", "homepage"]

interface PypiResponse {
  info: {
    [key: string]: number | string
  }
}

interface NpmReponse {
  [key: string]: number | string
}

export const Pypi: Command = {
  name: "pypi",
  description: "Look up a package on the Python Package Index.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'package_name',
      description: 'The name of the package you\'re seeking.',
      required: true,
      type: ApplicationCommandOptionType.String
    }
  ],
  run: async (_client: Client, interaction: CommandInteraction) => {
    const pypiPackage = interaction.options.get('package_name')
    if ( !pypiPackage ) return interaction.reply('Package is required.')
    const { value: packageName } = pypiPackage
    try {
      await axios.get(`https://pypi.python.org/pypi/${packageName}/json`).then(
        async (response: { status: number, data: PypiResponse }) => {
          const embed = new EmbedBuilder()
            .setTitle(`\`${response.data.info.name}\` - \`${response.data.info.version ?? "?.?.?"}\``)
            .setURL(`https://pypi.python.org/pypi/${packageName}`)
          FIELDS_PYPI.map((v: string) => {
            if ( Object.keys(response.data.info).includes(v) ) {
              return embed.addFields([
                { name: v, value: `${response.data.info[v]}`, inline: true }
              ])
            }
          })
          await interaction.reply({
            embeds: [
              embed
            ],
            ephemeral: false
          })
        }
      )
    } catch (e) {
      await interaction.reply({
        content: 'Something went wrong!',
        ephemeral: true
      })
    }
  }
};

export const Npm: Command = {
  name: "npm",
  description: "Look up a package on the official Node.js package manager registry.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'package_name',
      description: 'The name of the package you\'re seeking.',
      required: true,
      type: ApplicationCommandOptionType.String
    }
  ],
  run: async (_client: Client, interaction: CommandInteraction) => {
    const npmPackage = interaction.options.get('package_name')
    if ( !npmPackage ) return interaction.reply('Package is required.')
    const { value: packageName } = npmPackage
    try {
      await axios.get(`https://registry.npmjs.org/${packageName}`).then(
        async (response: { status: number, data: NpmReponse }) => {
          const embed = new EmbedBuilder()
            .setTitle(`\`${response.data.name}\``)
            .setURL(`https://www.npmjs.com/package/${packageName}`)
          FIELDS_NPM.map((v: string) => {
            if ( Object.keys(response.data).includes(v) ) {
              return embed.addFields([
                { name: v, value: `${response.data[v]}`, inline: true }
              ])
            }
          })
          await interaction.reply({
            embeds: [
              embed
            ],
            ephemeral: false
          })
        }
      )
    } catch (e) {
      console.log(e)
      await interaction.reply({
        content: 'Something went wrong!',
        ephemeral: true
      })
    }
  }
};