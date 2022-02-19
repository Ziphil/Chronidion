//

import * as react from "react";
import {
  ReactElement,
  useState
} from "react";
import {
  useEvent,
  useInterval
} from "react-use";
import {
  useRerender
} from "../../hook";
import {
  GregorianInstant,
  HairianInstant,
  StopwatchInstant
} from "../../module/instant";
import {
  LiteralType,
  LiteralUtilType
} from "../../module/literal-type";
import Clock from "../compound/clock";
import {
  create
} from "../create";


const MainPage = create(
  "MainPage",
  function ({
  }: {
  }): ReactElement {

    let [mode, setMode] = useState<ClockMode>("gregorian");
    let [gregorianInstant] = useState(new GregorianInstant());
    let [hairianInstant] = useState(new HairianInstant());
    let [stopwatchInstant] = useState(new StopwatchInstant());
    let rerender = useRerender();

    useEvent("keydown", (event) => {
      let key = event.key;
      if (key === "ArrowUp" || key === "ArrowDown") {
        if (mode !== "stopwatch") {
          gregorianInstant.toggleShift();
          hairianInstant.toggleShift();
        } else {
          stopwatchInstant.toggleShift();
        }
      }
      if (key === "ArrowRight") {
        setMode((mode) => ClockModeUtil.next(mode));
      } else if (key === "ArrowLeft") {
        setMode((mode) => ClockModeUtil.previous(mode));
      }
    });

    useEvent("keydown", (event) => {
      let key = event.key;
      if (mode === "stopwatch") {
        if (key === " " || key === "Enter") {
          stopwatchInstant.startOrStop();
        } else if (key === "Backspace") {
          stopwatchInstant.reset();
        } else if (key === "7") {
          stopwatchInstant.addOffset(3600000);
        } else if (key === "1") {
          stopwatchInstant.addOffset(-3600000);
        } else if (key === "8") {
          stopwatchInstant.addOffset(60000);
        } else if (key === "2") {
          stopwatchInstant.addOffset(-60000);
        } else if (key === "9") {
          stopwatchInstant.addOffset(1000);
        } else if (key === "3") {
          stopwatchInstant.addOffset(-1000);
        }
      }
    });

    useInterval(() => {
      let instants = [gregorianInstant, hairianInstant, stopwatchInstant];
      instants.forEach((instance) => instance.update());
      rerender();
    }, 10);

    let instant = (mode === "gregorian") ? gregorianInstant : (mode === "hairian") ? hairianInstant : stopwatchInstant;
    let node = (
      <div className="main">
        <div className="clock-container">
          <Clock instant={instant}/>
        </div>
        <div className="menu-container">
        </div>
      </div>
    );
    return node;

  }
);


const CLOCK_MODES = ["gregorian", "hairian", "stopwatch"] as const;
export let ClockModeUtil = LiteralUtilType.create(CLOCK_MODES);
export type ClockMode = LiteralType<typeof CLOCK_MODES>;

export default MainPage;