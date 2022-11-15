import axios from 'axios';
import { Client, CommandInteraction, EmbedBuilder } from "discord.js";
import { Command } from "..";

interface FakeGitResponse {
  hash: string
  commit_message: string
  permalink: string
}

export const FakeGit: Command = {
  name: "fakegit",
  description: "Generate a fake commit message that looks like a Discord webhook.",
  type: 1,
  run: async (client: Client, interaction: CommandInteraction) => {
    let url = 'http://whatthecommit.com/index.json'

    const guild = interaction.guild?.name.toLowerCase().replaceAll(' ', '_')
    const username = interaction.user.username

    try {
      await axios.get(url).then(
        async (response: { data: FakeGitResponse }) =>
          await interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle(`[${guild ?? username}:${username}] 1 new commit`)
                .setDescription(
                  `[\`${response.data.hash.substring(0, 8)}\`](${
                    response.data.permalink
                  }) ${response.data.commit_message}`
                )
                .setURL(response.data.permalink)
                .setAuthor({
                  iconURL: `${interaction.user.avatarURL()}`,
                  name: `${interaction.user.username}#${interaction.user.discriminator}`,
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