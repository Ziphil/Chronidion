//

import {faDiscord, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {faCamera, faCameraSlash, faSignalStream, faSignalStreamSlash} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as react from "react";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {Page, PageFooter, PageMain} from "/renderer/component/page/page";
import {MenuButton, MenuButtonGroup} from "/renderer/component/atom/menu-button";
import {Letter} from "/renderer/component/atom/letter";
import {Icon} from "/renderer/component/atom/icon";
import {ToggleCommandButton} from "/renderer/component/compound/builtin-command-button";
import {CommandButton} from "/renderer/component/compound/command-button";


export const DeckPage = create(
  require("./deck-page.scss"), "DeckPage",
  function ({
    show,
    onPreviousPage,
    onNextPage
  }: {
    show: boolean,
    onPreviousPage: () => unknown,
    onNextPage: () => unknown
  }): ReactElement | null {

    return (
      <Page show={show}>
        <PageMain>
          <div styleName="list">
            <ToggleCommandButton
              commandSpec={{name: "discord.toggleMute", arg: {}}}
              querySpec={{name: "discord.mute"}}
              text={{on: "Unmute", off: "Mute"}}
              icon={{
                on: [<FontAwesomeIcon key={0} icon={faDiscord}/>, <FontAwesomeIcon key={1} icon={faSignalStream}/>],
                off: [<FontAwesomeIcon key={0} icon={faDiscord}/>, <FontAwesomeIcon key={1} icon={faSignalStreamSlash}/>]
              }}
            />
            <ToggleCommandButton
              commandSpec={{name: "discord.toggleDeaf", arg: {}}}
              querySpec={{name: "discord.deaf"}}
              text={{on: "Unmute", off: "Mute"}}
            />
            <ToggleCommandButton
              commandSpec={{name: "obs.toggleStream", arg: {}}}
              querySpec={{name: "obs.stream"}}
              text={{on: "Stop stream", off: "Start stream"}}
              icon={{
                on: [<FontAwesomeIcon key={0} icon={faYoutube}/>, <FontAwesomeIcon key={1} icon={faSignalStream}/>],
                off: [<FontAwesomeIcon key={0} icon={faYoutube}/>, <FontAwesomeIcon key={1} icon={faSignalStreamSlash}/>]
              }}
            />
            <ToggleCommandButton
              commandSpec={{name: "obs.toggleVirtualCam", arg: {}}}
              querySpec={{name: "obs.virtualCam"}}
              text={{on: "Stop virtual cam", off: "Start virtual cam"}}
              icon={{
                on: [<FontAwesomeIcon key={0} icon={faYoutube}/>, <FontAwesomeIcon key={1} icon={faCamera}/>],
                off: [<FontAwesomeIcon key={0} icon={faYoutube}/>, <FontAwesomeIcon key={1} icon={faCameraSlash}/>]
              }}
            />
            <CommandButton
              spec={{name: "launch.openFile", arg: {path: "D:\\Documents\\Other\\Misc\\基礎語彙一覧2.ods"}}}
              text="Open Sheet"
            />
            <CommandButton
              spec={{name: "launch.launch", arg: {path: "C:\\Program Files\\obs-studio\\bin\\64bit\\obs64.exe"}}}
              text="OBS Studio"
            />
          </div>
        </PageMain>
        <PageFooter>
          <MenuButtonGroup>
            <MenuButton onClick={onNextPage}><Icon name="page" simple={true}/></MenuButton>
            <Letter wide={true} simple={true}>Deck</Letter>
          </MenuButtonGroup>
          <MenuButtonGroup>
          </MenuButtonGroup>
        </PageFooter>
      </Page>
    );

  }
);