//

import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {faVolume, faVolumeSlash} from "@fortawesome/pro-regular-svg-icons";
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

    const deaf = useQueryState("discord.deaf");

    return (
      <CommandButton
        name="discord.toggleDeaf"
        arg={{}}
        icon={[
          <FontAwesomeIcon key="main" icon={faDiscord}/>,
          (deaf !== null) && <FontAwesomeIcon key="sub" fixedWidth={true} icon={(deaf) ? faVolumeSlash : faVolume}/>
        ]}
        text={(deaf === null) ? "" : (deaf) ? textWhenOn : textWhenOff}
      />
    );

  }
);