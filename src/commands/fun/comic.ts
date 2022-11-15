import axios from 'axios';
import { ApplicationCommandOptionType, Client, CommandInteraction, EmbedBuilder } from "discord.js";
import { Command } from "..";

interface XkcdResponse {
  month: string
  num: number
  link: string
  year: string
  news: string
  safe_title: string
  transcript: string
  alt: string
  img: string
  title: string
  day: string
}

export const Xkcd: Command = {
  name: "xkcd",
  description: "Display a (or the latest) comic from xkcd.",
  type: 1,
  options: [
    {
      name: 'number',
      description: 'The number of the comic to return.',
      required: false,
      type: ApplicationCommandOptionType.String
    }
  ],
  run: async (_client: Client, interaction: CommandInteraction) => {
    const comicNumber = interaction.options.get('number')

    let url = 'https://xkcd.com/info.0.json'
    
    if (interaction.options && comicNumber)
      url = `https://xkcd.com/${comicNumber.value}/info.0.json`

    try {
      await axios.get(url).then(
        async (response: { data: XkcdResponse }) =>
          await interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle(`${response.data.num} - ${response.data.safe_title}`)
                .setURL(`https://xkcd.com/${response.data.num}`)
                .setFooter({
                  text: `Published ${response.data.year}-${response.data.month}-${response.data.day} (YYYY-MM-DD)`,
                })
                .setImage(response.data.img),
            ],
            ephemeral: false
          })
      )
    } catch {
      await interaction.reply({
        content: 'Something went wrong!',
        ephemeral: true
      })
    }
  }
};