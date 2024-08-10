//

import {IconName} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as react from "react";
import {Fragment, ReactElement, useCallback} from "react";
import {create} from "/renderer/component/create";
import {Letter} from "/renderer/component/atom/letter";
import type {CommandArg, CommandName} from "/main/command/type";
import {data} from "/renderer/util/data";


export const CommandButton = create(
  require("./command-button.scss"), "CommandButton",
  function <N extends CommandName>({
    spec,
    icon,
    text,
    division = 3,
    size = "medium"
  }: {
    spec: {name: N, arg: CommandArg<N>},
    icon?: CommandButtonIcon,
    text?: string,
    division?: number,
    size?: "small" | "medium" | "large"
  }): ReactElement {

    const {name, arg} = spec;
    const hasText = text !== undefined;

    const handleClick = useCallback(function (): void {
      window.api.invoke(`command:${name}`, arg);
    }, [name, arg]);

    return (
      <button styleName="root" onClick={handleClick} {...data({division, size, hasText})}>
        <div styleName="left">
          {(Array.isArray(icon)) ? (
            <Fragment>
              {(icon[0]) && (
                <FontAwesomeIcon icon={icon[0]}/>
              )}
              {(icon[1]) && (
                <div styleName="small-icon">
                  <FontAwesomeIcon icon={icon[1]}/>
                </div>
              )}
            </Fragment>
          ) : (icon) && (
            <FontAwesomeIcon icon={icon}/>
          )}
        </div>
        {(text !== undefined) && (
          <div styleName="right">
            <Letter wide={true} simple={true}>{text}</Letter>
          </div>
        )}
      </button>
    );

  }
);


export type CommandButtonIcon = IconName | [IconName] | [IconName | false | null | undefined, IconName | false | null | undefined];