//


export type BaseCommand<A = any> = (arg: A) => Promise<void>;
export type BaseCommandCatalog = {[N in string]: BaseCommand};

export type BaseQuery<S = any> = () => Promise<S>;
export type BaseQueryCatalog = {[N in string]: BaseQuery};

export function createCommandCatalog<S extends string, C extends BaseCommandCatalog>(scope: S, singleCatalog: C): {[N in (keyof C) & string as `${S}.${N}`]: C[N]} {
  const catalog = {} as any;
  for (const [name, api] of Object.entries(singleCatalog)) {
    catalog[`command:${scope}.${name}`] = api;
  }
  return catalog;
}

export function createQueryCatalog<S extends string, C extends BaseQueryCatalog>(scope: S, singleCatalog: C): {[N in (keyof C) & string as `${S}.${N}`]: C[N]} {
  const catalog = {} as any;
  for (const [name, api] of Object.entries(singleCatalog)) {
    catalog[`state:${scope}.${name}`] = api;
  }
  return catalog;
}