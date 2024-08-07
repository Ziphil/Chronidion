//


export type BaseCommand = (arg: any) => Promise<void>;
export type BaseCommandCatalog = {[N in string]: BaseCommand}; ;

export function createCommandCatalog<S extends string, T extends BaseCommandCatalog>(scope: S, apis: T): {[N in (keyof T) & string as `${S}.${N}`]: T[N]} {
  const apiSpecs = {} as any;
  for (const [name, api] of Object.entries(apis)) {
    apiSpecs[`${scope}.${name}`] = api;
  }
  return apiSpecs;
}
