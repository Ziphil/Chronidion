//

import * as react from "react";
import {ReactElement, useState} from "react";
import useSWR from "swr";
import {RoomFactory} from "/renderer/model/room";
import {RoomKind, RoomPane} from "/renderer/component/compound/room-pane";
import {MenuButton, MenuButtonGroup} from "/renderer/component/atom/menu-button";
import {Letter} from "/renderer/component/atom/letter";
import {Icon} from "/renderer/component/atom/icon";
import {create} from "/renderer/component/create";
import {Page, PageFooter, PageMain} from "/renderer/component/page/page";


export const RoomPage = create(
  require("./room-page.scss"), "RoomPage",
  function ({
    show,
    onPreviousPage,
    onNextPage
  }: {
    show: boolean,
    onPreviousPage: () => unknown,
    onNextPage: () => unknown
  }): ReactElement | null {

    const [kind, setKind] = useState<RoomKind>("temperature");
    const {data: room} = useSWR("/room", () => RoomFactory.fetch(1 * 1000), {refreshInterval: 5 * 1000});

    return (
      <Page show={show}>
        <PageMain>
          {(room !== undefined) && <RoomPane room={room} kind={kind}/>}
        </PageMain>
        <PageFooter>
          <MenuButtonGroup>
            <MenuButton onClick={onNextPage}><Icon name="page" simple={true}/></MenuButton>
            <Letter string="Room" wide={true} simple={true}/>
          </MenuButtonGroup>
          <MenuButtonGroup>
            <MenuButton onClick={() => setKind("carbon")}><Letter string="C" simple={true}/></MenuButton>
            <MenuButton onClick={() => setKind("discomfort")}><Letter string="D" simple={true}/></MenuButton>
            <MenuButton onClick={() => setKind("humidity")}><Letter string="H" simple={true}/></MenuButton>
            <MenuButton onClick={() => setKind("temperature")}><Letter string="T" simple={true}/></MenuButton>
            <MenuButton><Icon name="toggle" simple={true}/></MenuButton>
          </MenuButtonGroup>
        </PageFooter>
      </Page>
    );

  }
);