import axios from "axios"
import { ApplicationCommandOptionType, ApplicationCommandType, Client, CommandInteraction, EmbedBuilder } from "discord.js"
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

export const Osu: Command = {
  name: "osu",
  description: "Display's information about a given OSU user.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'username',
      description: 'The players username to lookup.',
      required: true,
      type: ApplicationCommandOptionType.String
    }
  ],
  run: async (_client: Client, interaction: CommandInteraction) => {
    const username = interaction.options.get('username')?.value
    
    try {
      const osu_api = `https://osu.ppy.sh/api/get_user`
      const osu_query = {"k": process.env.OSU_TOKEN, "u": username}
      
      const embed_keys = {
        "Play Count": "playcount",
        "Country": "country",
        "Level": "level",
        "Ranked Score": "ranked_score",
        "Total Score": "total_score",
        "Accuracy": "accuracy",
        "SS Ranking": "count_rank_ss",
        "S Ranking": "count_rank_s",
        "A Ranking": "count_rank_a",
        "300s": "count300",
        "100s": "count100",
        "50s": "count50",
      }

      await axios.get(osu_api, {
        params: osu_query
      }).then(async (response) => {
        const { username, userid } = response.data

        const embed = new EmbedBuilder()
          .setTitle(`${username}`)
          .setDescription(`\`${userid}\``)
          .setURL(`https://osu.ppy.sh/u/${userid}`)
          .setThumbnail("https://a.ppy.sh/${userid}")
          .addFields(
            Object.entries(embed_keys).map(([key, value]) => ({
              name: key,
              value: response.data.get(value)
            }))
          )

        await interaction.reply({
          embeds: [ embed ]
        })
      })
    } catch (e) {
      console.log(e)
      return await interaction.reply(`Couldn't find user \`${username}\``)
    }
  }
}