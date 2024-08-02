//

import * as queryParser from "query-string";
import * as react from "react";
import {Fragment, ReactElement, useCallback, useState} from "react";
import {useInterval, useMount} from "react-use";
import {useKeyEvent} from "/renderer/hook";
import {GregorianInstant, HairianInstant, StopwatchInstant} from "/renderer/model/instant";
import {LiteralType, LiteralUtilType} from "/renderer/util/literal-type";
import {ClockPage} from "/renderer/component/page/clock-page";
import {MeteoPage} from "/renderer/component/page/meteo-page";
import {RoomPage} from "/renderer/component/page/room-page";
import {create} from "/renderer/component/create";


const Root = create(
  require("./root.scss"), "Root",
  function ({
  }: {
  }): ReactElement | null {

    const [mode, setMode] = useState<PageMode>("gregorian");

    const updateColors = useCallback(function (): void {
      const now = new Date();
      const ratio = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400;
      const hue = ratio * 360 + 270;
      document.documentElement.style.setProperty("--first-color", getColorString(hue, 30, 80));
      document.documentElement.style.setProperty("--second-color", getColorString(hue, 30, 50));
    }, []);

    const handlePreviousPage = useCallback(function (): void {
      setMode((mode) => PageModeUtil.previous(mode));
    }, []);

    const handleNextPage = useCallback(function (): void {
      setMode((mode) => PageModeUtil.next(mode));
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

    useInterval(updateColors, 10000);
    useMount(updateColors);

    const commonProps = {onPreviousPage: handlePreviousPage, onNextPage: handleNextPage};
    const node = (
      <Fragment>
        <ClockPage initialInstant={new GregorianInstant()} show={mode === "gregorian"} {...commonProps}/>
        <ClockPage initialInstant={new HairianInstant()} show={mode === "hairian"} {...commonProps}/>
        <ClockPage initialInstant={new StopwatchInstant()} show={mode === "stopwatch"} {...commonProps}/>
        <MeteoPage show={mode === "meteo"} {...commonProps}/>
        <RoomPage show={mode === "room"} {...commonProps}/>
      </Fragment>
    );
    return node;

  }
);


function getColorString(hue: number, saturation: number, lightness: number): string {
  const modifiedHue = Math.floor((hue + 360) % 360);
  return `hsl(${modifiedHue}deg, ${saturation}%, ${lightness}%)`;
}

const PAGE_MODES = ["gregorian", "hairian", "stopwatch", "meteo", "room"] as const;
export const PageModeUtil = LiteralUtilType.create(PAGE_MODES);
export type PageMode = LiteralType<typeof PAGE_MODES>;

export default Root;