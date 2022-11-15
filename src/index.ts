import { Client } from "discord.js";
import interaction from './listeners/command';
import ready from "./listeners/ready";

console.log("Bot is starting...");

const client = new Client({
    intents: ['Guilds']
});

ready(client)
interaction(client)

client.login(process.env.TOKEN ?? "")