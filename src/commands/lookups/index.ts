import { Command } from "..";
import { Npm, Pypi } from "./dev";

export const LookupCommands: Command[] = [
  Pypi, Npm
]