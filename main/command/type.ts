/* eslint-disable @typescript-eslint/naming-convention */


export type CommandCatalog = {
  "discord.toggleMute": {},
  "discord.toggleDeaf": {},
  "discord.joinVoiceChannel": {id: string},
  "obs.toggleMute": {},
  "obs.toggleDeaf": {},
  "obs.toggleStream": {},
  "obs.toggleRecord": {},
  "obs.toggleVirtualCam": {},
  "obs.refreshBrowserSource": {},
  "launch.launch": {path: string},
  "launch.openFile": {path: string},
  "noop": {}
};
export type CommandName = keyof CommandCatalog;
export type CommandArg<N extends CommandName> = CommandCatalog[N];

export type QueryCatalog = {
  "discord.mute": boolean,
  "discord.deaf": boolean,
  "obs.mute": boolean,
  "obs.deaf": boolean,
  "obs.stream": boolean,
  "obs.record": boolean,
  "obs.virtualCam": boolean,
  "noop": boolean
};
export type QueryName = keyof QueryCatalog;
export type QueryState<N extends QueryName> = QueryCatalog[N];