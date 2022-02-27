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
import ClockPane from "../compound/clock-pane";
import {
  create
} from "../create";


const ClockPage = create(
  "ClockPage",
  function ({
    initialInstant,
    show
  }: {
    initialInstant: Instant,
    show: boolean
  }): ReactElement | null {

    let [instant] = useState(initialInstant);
    let rerender = useRerender();

    useKeyEvent((key) => {
      if (key === "z") {
        instant.toggleShift();
        rerender();
      }
    }, show);

    useKeyEvent((key) => {
      let stopwatchInstant = instant as StopwatchInstant;
      if (key === " " || key === "Enter") {
        stopwatchInstant.startOrStop();
        rerender();
      } else if (key === "Backspace") {
        stopwatchInstant.reset();
        rerender();
      } else if (key === "q") {
        stopwatchInstant.addOffset(3600000);
        rerender();
      } else if (key === "a") {
        stopwatchInstant.addOffset(-3600000);
        rerender();
      } else if (key === "w") {
        stopwatchInstant.addOffset(60000);
        rerender();
      } else if (key === "s") {
        stopwatchInstant.addOffset(-60000);
        rerender();
      } else if (key === "e") {
        stopwatchInstant.addOffset(1000);
        rerender();
      } else if (key === "d") {
        stopwatchInstant.addOffset(-1000);
        rerender();
      }
    }, show && instant instanceof StopwatchInstant);

    useInterval(() => {
      instant.update();
      rerender();
    }, 37);

    let node = (show) && (
      <div className="clock-page">
        <ClockPane instant={instant}/>
      </div>
    );
    return node || null;

  }
);


const CLOCK_MODES = ["gregorian", "hairian", "stopwatch"] as const;
export let ClockModeUtil = LiteralUtilType.create(CLOCK_MODES);
export type ClockMode = LiteralType<typeof CLOCK_MODES>;

export default ClockPage;