//

import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as react from "react";
import {ReactElement, useCallback} from "react";
import {create} from "/renderer/component/create";
import {Letter} from "/renderer/component/atom/letter";


export const CommandButton = create(
  require("./command-button.scss"), "CommandButton",
  function ({
    name
  }: {
    name: string
  }): ReactElement {

    const handleClick = useCallback(function (): void {
      window.api.invoke(name);
    }, [name]);

    return (
      <button styleName="root" onClick={handleClick}>
        <div styleName="left">
          <FontAwesomeIcon icon={faDiscord}/>
        </div>
        <div styleName="right">
          <Letter wide={true} simple={true}>Mute ON/OFF</Letter>
        </div>
      </button>
    );

  }
);