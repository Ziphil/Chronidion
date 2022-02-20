//

import * as queryParser from "query-string";
import * as react from "react";
import {
  ReactElement,
  useState
} from "react";
import {
  useEvent
} from "react-use";
import {
  GregorianInstant,
  HairianInstant,
  StopwatchInstant
} from "../model/instant";
import {
  LiteralType,
  LiteralUtilType
} from "../util/literal-type";
import {
  create
} from "./create";
import ClockPage from "./page/clock-page";
import MeteoPage from "./page/meteo-page";


const Root = create(
  "Root",
  function ({
  }: {
  }): ReactElement | null {

    let [mode, setMode] = useState<PageMode>("gregorian");

    useEvent("keydown", (event) => {
      let key = event.key;
      let query = queryParser.parse(window.location.search);
      let id = (typeof query.idString === "string") ? parseInt(query.idString) : -1;
      if (key === "F5") {
        window.api.send("move-default-position", id);
      } else if (key === "F12") {
        window.api.send("open-dev-tools", id);
      }
    });

    useEvent("keydown", (event) => {
      let key = event.key;
      if (key === "1") {
        setMode(PageModeUtil.cast(0));
      } else if (key === "2") {
        setMode(PageModeUtil.cast(1));
      } else if (key === "3") {
        setMode(PageModeUtil.cast(2));
      } else if (key === "4") {
        setMode(PageModeUtil.cast(3));
      }
    });

    let node = (
      <div className="main">
        <div className="page-container">
          <ClockPage initialInstant={new GregorianInstant()} show={mode === "gregorian"}/>
          <ClockPage initialInstant={new HairianInstant()} show={mode === "hairian"}/>
          <ClockPage initialInstant={new StopwatchInstant()} show={mode === "stopwatch"}/>
          <MeteoPage show={mode === "meteo"}/>
        </div>
        <div className="menu-container">
        </div>
      </div>
    );
    return node;

  }
);


const PAGE_MODES = ["gregorian", "hairian", "stopwatch", "meteo"] as const;
export let PageModeUtil = LiteralUtilType.create(PAGE_MODES);
export type PageMode = LiteralType<typeof PAGE_MODES>;

export default Root;