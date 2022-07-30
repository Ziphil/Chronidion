//

import * as react from "react";
import {
  ReactElement,
  useState
} from "react";
import useSWR from "swr";
import {
  RoomFactory
} from "../../model/room";
import Icon from "../atom/icon";
import Letter from "../atom/letter";
import MenuButton from "../atom/menu-button";
import RoomPane from "../compound/room-pane";
import {
  RoomKind
} from "../compound/room-pane";
import {
  create
} from "../create";
import Page from "./page";


const RoomPage = create(
  "RoomPage",
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
    const {data: room} = useSWR("/room", RoomFactory.fetch, {refreshInterval: 5 * 1000});

    const node = (
      <Page show={show}>
        <div className="page">
          {(room !== undefined) && <RoomPane room={room} kind={kind}/>}
        </div>
        <div className="menu">
          <div className="menu-button-group">
            <MenuButton onClick={onNextPage}><Icon name="page" simple={true}/></MenuButton>
          </div>
          <div className="menu-button-group">
            <MenuButton onClick={() => setKind("carbon")}><Letter string="C" simple={true}/></MenuButton>
            <MenuButton onClick={() => setKind("discomfort")}><Letter string="D" simple={true}/></MenuButton>
            <MenuButton onClick={() => setKind("humidity")}><Letter string="H" simple={true}/></MenuButton>
            <MenuButton onClick={() => setKind("temperature")}><Letter string="T" simple={true}/></MenuButton>
            <MenuButton><Icon name="toggle" simple={true}/></MenuButton>
          </div>
        </div>
      </Page>
    );
    return node;

  }
);


export default RoomPage;