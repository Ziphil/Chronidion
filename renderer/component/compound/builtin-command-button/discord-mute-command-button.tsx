//

import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {faMicrophone, faMicrophoneSlash} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as react from "react";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {CommandButton} from "/renderer/component/compound/command-button";
import {useQueryState} from "./query-state-hook";


export const DiscordMuteCommandButton = create(
  null, "DiscordMuteCommandButton",
  function ({
    textWhenOn,
    textWhenOff
  }: {
    textWhenOn?: string,
    textWhenOff?: string
  }): ReactElement {

    const mute = useQueryState("discord.mute");

    return (
      <CommandButton
        name="discord.toggleMute"
        arg={{}}
        icon={[
          <FontAwesomeIcon key="main" icon={faDiscord}/>,
          (mute !== null) && <FontAwesomeIcon key="sub" fixedWidth={true} icon={(mute) ? faMicrophoneSlash : faMicrophone}/>
        ]}
        text={(mute === null) ? "" : (mute) ? textWhenOn : textWhenOff}
      />
    );

  }
);