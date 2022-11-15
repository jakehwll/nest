import { Command } from '..'
import { Xkcd } from './comic'
import { FakeGit } from './dev'
import { InspiroBot, RandomBirb, RandomCat, RandomDog } from './image'
import { Aaa, Coin, Dice, Eightball, Rate } from './random'
import { Cry, Dance, Happy, Hug, Kiss, Lewd, Neko, Pat, Slap, Smug, Triggered } from './reactions'
import { BigText, Clapify, Tobleflep, XD } from './text'

export const FunCommands: Command[] = [
  Xkcd, FakeGit, RandomDog, RandomBirb, RandomCat, InspiroBot, Coin, Dice, Rate, Eightball, Aaa, Cry, Dance, Happy, Hug, Kiss, Lewd, Neko, Pat, Slap, Smug, Triggered, BigText, XD, Clapify, Tobleflep
]