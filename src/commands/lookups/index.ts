import { Command } from "..";
import { Npm, Pypi } from "./dev";
import { McSkin, Osu } from "./gaming";

export const LookupCommands: Command[] = [
  Pypi, Npm, McSkin, Osu
]