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


const Root = create(
  "Root",
  function ({
  }: {
  }): ReactElement | null {

    const [mode, setMode] = useState<PageMode>("gregorian");

    const updateColors = useCallback(function (): void {
      const now = new Date();
      const ratio = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400;
      const hue = ratio * 360 + 270;
      document.documentElement.style.setProperty("--first-color", getColorString(hue, 8));
      document.documentElement.style.setProperty("--second-color", getColorString(hue, 6));
    }, []);

    useKeyEvent((key) => {
      const query = queryParser.parse(window.location.search);
      const id = (typeof query.idString === "string") ? parseInt(query.idString) : -1;
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
      }
    }, true);

    useInterval(updateColors, 10000);
    useMount(updateColors);

    const node = (
      <>
        <ClockPage initialInstant={new GregorianInstant()} show={mode === "gregorian"}/>
        <ClockPage initialInstant={new HairianInstant()} show={mode === "hairian"}/>
        <ClockPage initialInstant={new StopwatchInstant()} show={mode === "stopwatch"}/>
        <MeteoPage show={mode === "meteo"}/>
      </>
    );
    return node;

  }
);


function getColorString(hue: number, lightness: number): string {
  const modifiedHue = Math.floor((hue + 360) % 360);
  return `hsl(${modifiedHue}, 15%, ${lightness}%)`;
}

const PAGE_MODES = ["gregorian", "hairian", "stopwatch", "meteo"] as const;
export const PageModeUtil = LiteralUtilType.create(PAGE_MODES);
export type PageMode = LiteralType<typeof PAGE_MODES>;

export default Root;