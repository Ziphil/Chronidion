//

import {
  FunctionComponent,
  ReactNode
} from "react";


export function create<C extends FunctionComponent<any>>(component: C): C;
export function create<C extends FunctionComponent<any>>(name: string, component: C): C;
export function create<C extends FunctionComponent<any>>(...args: [C] | [string, C]): C {
  const [component, name] = (args.length === 1) ? [args[0]] : [args[1], args[0]];
  component.displayName = name ?? "<unknown>";
  return component;
}

export type WithChildren<P> = P & {children?: ReactNode};
export type StylesRecord = {[key: string]: string | undefined};