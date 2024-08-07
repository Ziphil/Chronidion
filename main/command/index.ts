//

import discord from "./discord";
import {createCommandCatalog} from "/main/util/command";


export const COMMAND_CATALOG = {
  ...createCommandCatalog("discord", discord)
};

export type CommandCatalog = typeof COMMAND_CATALOG;
export type CommandName = keyof CommandCatalog;
export type CommandArg<T extends CommandName> = Parameters<CommandCatalog[T]>[0];