//

import * as react from "react";
import {ReactElement, useCallback, useState} from "react";
import {useInterval} from "react-use";
import {useRerender} from "/renderer/hook";
import {Instant, StopwatchInstant} from "/renderer/model/instant";
import {LiteralType, LiteralUtilType} from "/renderer/util/literal-type";
import {MenuButton, MenuButtonGroup} from "/renderer/component/atom/menu-button";
import {Letter} from "/renderer/component/atom/letter";
import {Icon} from "/renderer/component/atom/icon";
import {create} from "/renderer/component/create";
import {Page, PageFooter, PageMain} from "/renderer/component/page/page";
import {ClockPane} from "/renderer/component/compound/clock-pane";


export const ClockPage = create(
  require("./clock-page.scss"), "ClockPage",
  function ({
    initialInstant,
    show,
    onPreviousPage,
    onNextPage
  }: {
    initialInstant: Instant,
    show: boolean,
    onPreviousPage: () => unknown,
    onNextPage: () => unknown
  }): ReactElement | null {

    const [instant] = useState(initialInstant);
    const rerender = useRerender();

    const handleToggleShift = useCallback(function (): void {
      instant.toggleShift();
      rerender();
    }, [instant, rerender]);

    const handleStartOrStop = useCallback(function (): void {
      if (instant instanceof StopwatchInstant) {
        instant.startOrStop();
        rerender();
      }
    }, [instant, rerender]);

    const handleReset = useCallback(function (): void {
      if (instant instanceof StopwatchInstant) {
        instant.reset();
        rerender();
      }
    }, [instant, rerender]);

    useInterval(() => {
      instant.update();
      rerender();
    }, 93);

    return (
      <Page show={show}>
        <PageMain>
          <ClockPane instant={instant}/>
        </PageMain>
        <PageFooter>
          <MenuButtonGroup>
            <MenuButton onClick={onNextPage}><Icon name="page" simple={true}/></MenuButton>
            <Letter wide={true} simple={true}>{(instant instanceof StopwatchInstant) ? "Stopwatch" : "Clock"}</Letter>
          </MenuButtonGroup>
          <MenuButtonGroup>
            {(instant instanceof StopwatchInstant) && <MenuButton onClick={handleReset}><Letter simple={true}>R</Letter></MenuButton>}
            {(instant instanceof StopwatchInstant) && <MenuButton onClick={handleStartOrStop}><Letter simple={true}>S</Letter></MenuButton>}
            <MenuButton onClick={handleToggleShift}><Icon name="toggle" simple={true}/></MenuButton>
          </MenuButtonGroup>
        </PageFooter>
      </Page>
    );

  }
);


const CLOCK_MODES = ["gregorian", "hairian", "stopwatch"] as const;
export const ClockModeUtil = LiteralUtilType.create(CLOCK_MODES);
export type ClockMode = LiteralType<typeof CLOCK_MODES>;