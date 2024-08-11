//

import * as queryParser from "query-string";
import * as react from "react";
import {Fragment, ReactElement, useCallback, useState} from "react";
import {useKeyEvent} from "/renderer/hook";
import {GregorianInstant, HairianInstant, StopwatchInstant} from "/renderer/model/instant";
import {LiteralType, LiteralUtilType} from "/renderer/util/literal-type";
import {ClockPage} from "/renderer/component/page/clock-page";
import {MeteoPage} from "/renderer/component/page/meteo-page";
import {create} from "/renderer/component/create";
import {DeckPage} from "/renderer/component/page/deck-page";


const Root = create(
  require("./root.scss"), "Root",
  function ({
  }: {
  }): ReactElement | null {

    const [mode, setMode] = useState<PageMode>("gregorian");

    const handlePreviousPage = useCallback(function (): void {
      setMode((mode) => PageModeUtil.previous(mode));
    }, []);

    const handleNextPage = useCallback(function (): void {
      setMode((mode) => PageModeUtil.next(mode));
    }, []);

    useKeyEvent((key) => {
      const query = queryParser.parse(window.location.search);
      const id = (typeof query.idString === "string") ? parseInt(query.idString) : -1;
      if (key === "F11") {
        window.api.send("maximize", id);
      } else if (key === "F12") {
        window.api.send("open-dev-tools", id);
      }
    }, true);

    const commonProps = {onPreviousPage: handlePreviousPage, onNextPage: handleNextPage};

    return (
      <Fragment>
        <ClockPage initialInstant={new GregorianInstant()} show={mode === "gregorian"} {...commonProps}/>
        <ClockPage initialInstant={new HairianInstant()} show={mode === "hairian"} {...commonProps}/>
        <ClockPage initialInstant={new StopwatchInstant()} show={mode === "stopwatch"} {...commonProps}/>
        <MeteoPage show={mode === "meteo"} {...commonProps}/>
        <DeckPage show={mode === "deck"} {...commonProps}/>
      </Fragment>
    );

  }
);


const PAGE_MODES = ["gregorian", "hairian", "stopwatch", "meteo", "deck"] as const;
export const PageModeUtil = LiteralUtilType.create(PAGE_MODES);
export type PageMode = LiteralType<typeof PAGE_MODES>;

export default Root;