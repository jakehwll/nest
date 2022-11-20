import { Command } from "..";
import { Npm, Pypi } from "./dev";
import { McSkin, Osu } from "./gaming";
import { Jisho, Urban } from "./language";

export const LookupCommands: Command[] = [
  Pypi, Npm, McSkin, Osu, Jisho, Urban
]