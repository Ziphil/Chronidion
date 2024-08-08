//

import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as react from "react";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {CommandButton} from "/renderer/component/compound/command-button";
import {useQueryState} from "./query-state-hook";


export const DiscordDeafCommandButton = create(
  null, "DiscordDeafCommandButton",
  function ({
    textWhenOn,
    textWhenOff
  }: {
    textWhenOn?: string,
    textWhenOff?: string
  }): ReactElement {

    const mute = useQueryState("discord.deaf");

    return (
      <CommandButton
        name="discord.toggleDeaf"
        arg={{}}
        icon={<FontAwesomeIcon icon={faDiscord}/>}
        text={(mute === null) ? "" : (mute) ? textWhenOn : textWhenOff}
      />
    );

  }
);