import axios from "axios"
import { ApplicationCommandOptionType, ApplicationCommandType, Client, CommandInteraction } from "discord.js"
import { Command } from ".."

const URL_MCUUID_API = "https://api.mojang.com/users/profiles/minecraft/{user}"
const URL_MCSKIN_API = "https://visage.surgeplay.com/{image}/{uuid}.png"
const URL_OSU_API = "https://osu.ppy.sh/api/get_user"

export const McSkin: Command = {
  name: "mcskin",
  description: "Display a given Minecraft user's skin.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'username',
      description: 'The players username to lookup.',
      required: true,
      type: ApplicationCommandOptionType.String
    },
    {
      name: 'type',
      description: 'The type of image to return.',
      required: false,
      type: ApplicationCommandOptionType.String,
      choices: [
        { name: "face", value: "face" },
        { name: "front", value: "front" },
        { name: "front full", value: "frontfull" },
        { name: "head", value: "head" },
        { name: "bust", value: "bust" },
        { name: "full", value: "full" },
        { name: "skin", value: "skin" }
      ]
    }
  ],
  run: async (_client: Client, interaction: CommandInteraction) => {
    const username = interaction.options.get('username')?.value
    const image_type = interaction.options.get('type') ?? "face"
    
    try {
      const uuid_mojang =
        await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`)
      if ( !uuid_mojang ) return await interaction.reply(`Couldn't find user ${username}`)
      const { id: uuid } = uuid_mojang.data

      const file = `https://visage.surgeplay.com/${image_type}/${uuid}.png`

      await interaction.reply({
        content: file
      })
    } catch (e) {
      console.log(e)
      return await interaction.reply(`Couldn't find user \`${username}\``)
    }
  }
}