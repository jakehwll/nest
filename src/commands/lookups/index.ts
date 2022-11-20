import { Command } from "..";
import { Npm, Pypi } from "./dev";
import { McSkin } from "./gaming";

export const LookupCommands: Command[] = [
  Pypi, Npm, McSkin
]