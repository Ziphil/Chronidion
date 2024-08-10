/* eslint-disable @typescript-eslint/naming-convention */


export type CommandCatalog = {
  "discord.toggleMute": {},
  "discord.toggleDeaf": {},
  "launch.launch": {path: string},
  "launch.openFile": {path: string}
};
export type CommandName = keyof CommandCatalog;
export type CommandArg<N extends CommandName> = CommandCatalog[N];

export type QueryCatalog = {
  "discord.mute": boolean,
  "discord.deaf": boolean
};
export type QueryName = keyof QueryCatalog;
export type QueryState<N extends QueryName> = QueryCatalog[N];