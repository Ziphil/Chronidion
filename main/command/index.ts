//

import discord from "./discord";


type Command = (...args: Array<any>) => Promise<void>;
type Commands = {[N in string]: Command}; ;

function createApiSpecs<S extends string, T extends Commands>(scope: S, apis: T): {[N in (keyof T) & string as `${S}.${N}`]: T[N]} {
  const apiSpecs = {} as any;
  for (const [name, api] of Object.entries(apis)) {
    apiSpecs[`${scope}.${name}`] = api;
  }
  return apiSpecs;
}

export const commands = {
  ...createApiSpecs("discord", discord)
};