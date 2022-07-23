//

import * as react from "react";
import {
  ReactElement,
  useState
} from "react";
import {
  useInterval
} from "react-use";
import {
  useKeyEvent,
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

    useKeyEvent((key) => {
      if (key === "Tab") {
        instant.toggleShift();
        rerender();
      }
    }, show);

    useKeyEvent((key) => {
      const stopwatchInstant = instant as StopwatchInstant;
      if (key === " " || key === "Enter") {
        stopwatchInstant.startOrStop();
        rerender();
      } else if (key === "Backspace") {
        stopwatchInstant.reset();
        rerender();
      } else if (key === "a") {
        stopwatchInstant.addOffset(3600000);
        rerender();
      } else if (key === "z") {
        stopwatchInstant.addOffset(-3600000);
        rerender();
      } else if (key === "s") {
        stopwatchInstant.addOffset(60000);
        rerender();
      } else if (key === "x") {
        stopwatchInstant.addOffset(-60000);
        rerender();
      } else if (key === "d") {
        stopwatchInstant.addOffset(1000);
        rerender();
      } else if (key === "c") {
        stopwatchInstant.addOffset(-1000);
        rerender();
      }
    }, show && instant instanceof StopwatchInstant);

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
          <MenuButton onClick={onPreviousPage}>L</MenuButton>
          <MenuButton onClick={onNextPage}>R</MenuButton>
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