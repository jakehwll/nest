import { ApplicationCommandType, Client, CommandInteraction } from "discord.js"
import { Command } from ".."

export const Stats: Command = {
  name: "stats",
  description: "Display statistics about the bot.",
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    const { guilds, channels, users } = {
      guilds: client.guilds.cache.size,
      channels: client.guilds.cache.reduce((acc, guild) => acc + guild.channels.cache.size, 0),
      users: client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)
    }
    await interaction.reply({
      content: 
        `Birb is playing in ${guilds} guilds, with ${channels} channels and ${users} users.`
    })
  }
}

export const Ping: Command = {
  name: "ping",
  description: "Returns the bot's response time.",
  type: ApplicationCommandType.ChatInput,
  run: async (_client: Client, interaction: CommandInteraction) => {
    interaction.reply('Pong!')
  }
}