//

import * as react from "react";
import {
  ReactElement,
  useState
} from "react";
import useSWR from "swr";
import {
  MeteoFactory
} from "../../model/meteo";
import Icon from "../atom/icon";
import MenuButton from "../atom/menu-button";
import MeteoPane from "../compound/meteo-pane";
import {
  MeteoKind
} from "../compound/meteo-pane";
import {
  create
} from "../create";
import Page from "./page";


const MeteoPage = create(
  "MeteoPage",
  function ({
    show,
    onPreviousPage,
    onNextPage
  }: {
    show: boolean,
    onPreviousPage: () => unknown,
    onNextPage: () => unknown
  }): ReactElement | null {

    const [index, setIndex] = useState(0);
    const [kind, setKind] = useState<MeteoKind>("temperature");
    const {data: meteos} = useSWR("/meteo", MeteoFactory.fetch, {refreshInterval: 5 * 60 * 1000});

    const node = (
      <Page show={show}>
        <div className="page">
          {(meteos !== undefined) && <MeteoPane meteo={meteos[index]} kind={kind}/>}
        </div>
        <div className="menu">
          <div className="menu-button-group">
            <MenuButton onClick={onNextPage}><Icon name="page" simple={true}/></MenuButton>
          </div>
          <div className="menu-button-group">
            <MenuButton onClick={() => setKind("humidity")}><Icon name="humidity" simple={true}/></MenuButton>
            <MenuButton onClick={() => setKind("precipitation")}><Icon name="precipitation" simple={true}/></MenuButton>
            <MenuButton onClick={() => setKind("temperature")}><Icon name="temperature" simple={true}/></MenuButton>
            <MenuButton onClick={() => setIndex((index) => (index + 1) % 8)}><Icon name="toggle" simple={true}/></MenuButton>
          </div>
        </div>
      </Page>
    );
    return node;

  }
);


export default MeteoPage;