//

import * as react from "react";
import {
  ReactElement,
  useCallback,
  useState
} from "react";
import {
  useInterval
} from "react-use";
import {
  useRerender
} from "../../hook";
import {
  Instant,
  StopwatchInstant
} from "../../model/instant";
import {
  LiteralType,
  LiteralUtilType
} from "../../util/literal-type";
import Icon from "../atom/icon";
import MenuButton from "../atom/menu-button";
import ClockPane from "../compound/clock-pane";
import {
  create
} from "../create";
import Page from "./page";


const ClockPage = create(
  "ClockPage",
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
    }, 37);

    const node = (
      <Page show={show}>
        <div className="page">
          <ClockPane instant={instant}/>
        </div>
        <div className="menu">
          <div className="menu-button-group">
            <MenuButton onClick={onPreviousPage}><Icon name="previousPage" simple={true}/></MenuButton>
            <MenuButton onClick={onNextPage}><Icon name="nextPage" simple={true}/></MenuButton>
          </div>
          <div className="menu-button-group">
            {(instant instanceof StopwatchInstant) && <MenuButton onClick={handleStartOrStop}><Icon name={(instant.stopped) ? "start" : "stop"} simple={true}/></MenuButton>}
            {(instant instanceof StopwatchInstant) && <MenuButton onClick={handleReset}><Icon name="reset" simple={true}/></MenuButton>}
            <MenuButton onClick={handleToggleShift}><Icon name="toggle" simple={true}/></MenuButton>
          </div>
        </div>
      </Page>
    );
    return node;

  }
);


const CLOCK_MODES = ["gregorian", "hairian", "stopwatch"] as const;
export const ClockModeUtil = LiteralUtilType.create(CLOCK_MODES);
export type ClockMode = LiteralType<typeof CLOCK_MODES>;

export default ClockPage;