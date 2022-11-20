import axios from "axios";
import { ApplicationCommandOptionType, ApplicationCommandType, Client, CommandInteraction, EmbedBuilder } from "discord.js";
import { Command } from "..";

export const Jisho: Command = {
  name: "jisho",
  description: "Lookup a word from Japanese.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'keyword',
      description: 'The word to lookup.',
      required: true,
      type: ApplicationCommandOptionType.String
    },
  ],
  run: async (_client: Client, interaction: CommandInteraction) => {
    const keyword = interaction.options.get('keyword')?.value
    const jisho_api = "http://jisho.org/api/v1/search/words"
    const jisho_query = {
      keyword
    }

    await axios.get(jisho_api, {
      params: jisho_query
    }).then(
      async ({ data }) => {
        const definition = data.data[0]

        const japanese = definition.japanese[0]
        const english = definition.senses[0]['english_definitions']
        
        const { word, reading } = japanese

        await interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setTitle(word ?? "???")
            .setDescription(reading ?? "???")
            .addFields([
              { name: "English", value: english ? english.join(', ') : "" }
            ])
          ]
        })
      }
    )
  }
}

export const Urban: Command = {
  name: "urban",
  description: "Grab a word from Urban Dictionary.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'keyword',
      description: 'The word to lookup.',
      required: true,
      type: ApplicationCommandOptionType.String
    },
  ],
  run: async (_client: Client, interaction: CommandInteraction) => {
    const keyword = interaction.options.get('keyword')?.value

    const urban_api = "http://api.urbandictionary.com/v0/define"
    const urban_query = {
      term: keyword
    }

    await axios.get(urban_api, {
      params: urban_query
    }).then(
      async ({ data: response }) => {
        const content = response['list'][0]

        await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle(content.word)
              .setDescription(content.author)
              .setURL(content.permalink)
              .addFields([
                { name: "Definition", value: content.definition },
                { name: "Example", value: content.example },
                { name: "Upvotes", value: `:thumbsup: ${content.thumbs_up}`, inline: true },
                { name: "Downvotes", value: `:thumbsdown: ${content.thumbs_down}`, inline: true },
              ])
          ]
        })
      })
  }
}
