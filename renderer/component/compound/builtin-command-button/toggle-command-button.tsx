//

import * as react from "react";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {CommandButton, CommandButtonIcon} from "/renderer/component/compound/command-button";
import {useQueryState} from "./query-state-hook";
import type {CommandArg, CommandName, QueryName} from "/main/command/type";


export const ToggleCommandButton = create(
  null, "ToggleCommandButton",
  function <CN extends CommandName, QN extends QueryName>({
    commandSpec,
    querySpec,
    icon,
    text,
    division,
    size
  }: {
    commandSpec: {name: CN, arg: CommandArg<CN>},
    querySpec: {name: QN},
    icon?: {on?: CommandButtonIcon, off?: CommandButtonIcon, loading?: CommandButtonIcon},
    text?: {on?: string, off?: string, loading?: string},
    division?: number,
    size?: string
  }): ReactElement {

    const state = useQueryState(querySpec.name);

    return (
      <CommandButton
        spec={commandSpec}
        icon={(state === null) ? icon?.loading : (state) ? icon?.on : icon?.off}
        text={(state === null) ? text?.loading : (state) ? text?.on : text?.off}
        division={division}
        size={size}
      />
    );

  }
);