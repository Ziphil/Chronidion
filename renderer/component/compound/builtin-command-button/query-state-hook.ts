//

import {IpcRendererEvent} from "electron";
import {useEffect, useState} from "react";
import type {QueryName, QueryState} from "/main/command/type";


export function useQueryState<N extends QueryName>(name: N): QueryState<N> | null {
  const [state, setState] = useState<QueryState<N> | null>(null);
  useEffect(() => {
    window.api.invoke(`query:${name}`).then(setState);
  }, [name]);
  useEffect(() => {
    const listener = function (event: IpcRendererEvent, state: QueryState<N>): void {
      setState(state);
    };
    window.api.on(`query:${name}`, listener);
    return () => void window.api.off(`query:${name}`, listener);
  }, [name]);
  return state;
}