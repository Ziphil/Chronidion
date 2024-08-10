/* eslint-disable @typescript-eslint/naming-convention */


export type CommandCatalog = {
  "discord.toggleMute": {},
  "discord.toggleDeaf": {},
  "obs.toggleStream": {},
  "obs.toggleRecord": {},
  "obs.toggleVirtualCam": {},
  "obs.refreshBrowserSource": {},
  "launch.launch": {path: string},
  "launch.openFile": {path: string}
};
export type CommandName = keyof CommandCatalog;
export type CommandArg<N extends CommandName> = CommandCatalog[N];

export type QueryCatalog = {
  "discord.mute": boolean,
  "discord.deaf": boolean,
  "obs.stream": boolean,
  "obs.record": boolean,
  "obs.virtualCam": boolean
};
export type QueryName = keyof QueryCatalog;
export type QueryState<N extends QueryName> = QueryCatalog[N];