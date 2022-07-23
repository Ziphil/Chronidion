//

import * as react from "react";
import {
  ReactElement,
  useState
} from "react";
import useSWR from "swr";
import {
  useKeyEvent
} from "../../hook";
import {
  MeteoFactory
} from "../../model/meteo";
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

    useKeyEvent((key) => {
      if (key === "ArrowUp") {
        setIndex((index) => Math.max(index - 1, 0));
      } else if (key === "ArrowDown") {
        setIndex((index) => Math.min(index + 1, 7));
      }
      if (key === "z") {
        setKind("temperature");
      } else if (key === "q") {
        setKind("maxTemperature");
      } else if (key === "a") {
        setKind("minTemperature");
      } else if (key === "x") {
        setKind("humidity");
      } else if (key === "c") {
        setKind("precipitation");
      }
    }, show);

    const node = (
      <Page show={show}>
        <div className="page">
          {(meteos !== undefined) && <MeteoPane meteo={meteos[index]} kind={kind}/>}
        </div>
        <div className="menu">
          <MenuButton onClick={onPreviousPage}>L</MenuButton>
          <MenuButton onClick={onNextPage}>R</MenuButton>
        </div>
      </Page>
    );
    return node;

  }
);


export default MeteoPage;