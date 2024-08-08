//

import * as react from "react";
import {Fragment, ReactElement, useCallback} from "react";
import {create} from "/renderer/component/create";
import {Letter} from "/renderer/component/atom/letter";
import type{CommandArg, CommandName} from "/main/command/type";


export const CommandButton = create(
  require("./command-button.scss"), "CommandButton",
  function <N extends CommandName>({
    name,
    arg,
    icon,
    text
  }: {
    name: N,
    arg: CommandArg<N>,
    icon?: ReactElement | [ReactElement, ReactElement | false | null | undefined],
    text?: string
  }): ReactElement {

    const handleClick = useCallback(function (): void {
      window.api.invoke(`command:${name}`, arg);
    }, [name, arg]);

    return (
      <button styleName="root" onClick={handleClick}>
        <div styleName="left">
          {(Array.isArray(icon) && icon[1]) ? (
            <Fragment>
              {icon[0]}
              <div styleName="small-icon">
                {icon[1]}
              </div>
            </Fragment>
          ) : (
            icon
          )}
        </div>
        <div styleName="right">
          {(text !== undefined) && <Letter wide={true} simple={true}>{text}</Letter>}
        </div>
      </button>
    );

  }
);