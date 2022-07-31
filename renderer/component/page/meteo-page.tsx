//

import * as react from "react";
import {
  ReactElement,
  useCallback,
  useState
} from "react";
import useSWR from "swr";
import {
  MeteoFactory
} from "../../model/meteo";
import Icon from "../atom/icon";
import Letter from "../atom/letter";
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
    const {data: meteos} = useSWR("/meteo", () => MeteoFactory.fetch(5 * 1000), {refreshInterval: 5 * 60 * 1000});

    const handleToggleTemperature = useCallback(function (): void {
      setKind((kind) => {
        if (kind === "temperature") {
          return "maxTemperature";
        } else if (kind === "maxTemperature") {
          return "minTemperature";
        } else if (kind === "minTemperature") {
          return "temperature";
        } else {
          return "temperature";
        }
      });
    }, []);

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
            <MenuButton onClick={() => setKind("wind")}><Letter string="W" simple={true}/></MenuButton>
            <MenuButton onClick={() => setKind("precipitation")}><Letter string="P" simple={true}/></MenuButton>
            <MenuButton onClick={() => setKind("humidity")}><Letter string="H" simple={true}/></MenuButton>
            <MenuButton onClick={handleToggleTemperature}><Letter string="T" simple={true}/></MenuButton>
            <MenuButton onClick={() => setIndex((index) => (index + 1) % 8)}><Icon name="toggle" simple={true}/></MenuButton>
          </div>
        </div>
      </Page>
    );
    return node;

  }
);


export default MeteoPage;