import { ChatInputApplicationCommandData, Client, CommandInteraction } from "discord.js";
import { CoreCommands } from "./core";
import { FunCommands } from "./fun";
import { LookupCommands } from "./lookups";

export interface Command extends ChatInputApplicationCommandData {
  run: (client: Client, interaction: CommandInteraction) => void;
}

export const Commands: Command[] = [
  ...CoreCommands,
  ...FunCommands,
  ...LookupCommands
];

export * from './fun';
