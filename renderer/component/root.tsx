//

import * as queryParser from "query-string";
import * as react from "react";
import {
  ReactElement,
  useCallback,
  useState
} from "react";
import {
  useInterval, useMount
} from "react-use";
import {
  useKeyEvent
} from "../hook";
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
import SystemInfoPage from "./page/system-info-page";


const Root = create(
  "Root",
  function ({
  }: {
  }): ReactElement | null {

    let [mode, setMode] = useState<PageMode>("gregorian");

    let updateColors = useCallback(function (): void {
      let now = new Date();
      let ratio = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400;
      let hue = ratio * 360 + 270;
      document.documentElement.style.setProperty("--first-color", getColorString(hue - 20));
      document.documentElement.style.setProperty("--second-color", getColorString(hue + 20));
    }, []);

    useKeyEvent((key) => {
      let query = queryParser.parse(window.location.search);
      let id = (typeof query.idString === "string") ? parseInt(query.idString) : -1;
      if (key === "F5") {
        window.api.send("move-default-position", id);
      } else if (key === "F11") {
        window.api.send("maximize", id);
      } else if (key === "F12") {
        window.api.send("open-dev-tools", id);
      }
    }, true);

    useKeyEvent((key) => {
      if (key === "1") {
        setMode(PageModeUtil.cast(0));
      } else if (key === "2") {
        setMode(PageModeUtil.cast(1));
      } else if (key === "3") {
        setMode(PageModeUtil.cast(2));
      } else if (key === "4") {
        setMode(PageModeUtil.cast(3));
      } else if (key === "5") {
        setMode(PageModeUtil.cast(4));
      }
    }, true);

    useInterval(updateColors, 10000);
    useMount(updateColors);

    let node = (
      <div className="main">
        <div className="page-container">
          <ClockPage initialInstant={new GregorianInstant()} show={mode === "gregorian"}/>
          <ClockPage initialInstant={new HairianInstant()} show={mode === "hairian"}/>
          <ClockPage initialInstant={new StopwatchInstant()} show={mode === "stopwatch"}/>
          <MeteoPage show={mode === "meteo"}/>
          <SystemInfoPage show={mode === "systemInfo"}/>
        </div>
        <div className="menu-container">
        </div>
      </div>
    );
    return node;

  }
);


function getColorString(hue: number): string {
  const modifiedHue = Math.floor((hue + 360) % 360);
  return `hsl(${modifiedHue}, 15%, 7%)`;
}

const PAGE_MODES = ["gregorian", "hairian", "stopwatch", "meteo", "systemInfo"] as const;
export let PageModeUtil = LiteralUtilType.create(PAGE_MODES);
export type PageMode = LiteralType<typeof PAGE_MODES>;

export default Root;