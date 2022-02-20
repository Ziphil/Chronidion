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

    useEvent("keydown", (event) => {
      if (show) {
        let key = event.key;
        if (key === "z") {
          instant.toggleShift();
        }
      }
    });

    useEvent("keydown", (event) => {
      if (show) {
        let key = event.key;
        if (instant instanceof StopwatchInstant) {
          if (key === " " || key === "Enter") {
            instant.startOrStop();
          } else if (key === "Backspace") {
            instant.reset();
          } else if (key === "q") {
            instant.addOffset(3600000);
          } else if (key === "a") {
            instant.addOffset(-3600000);
          } else if (key === "w") {
            instant.addOffset(60000);
          } else if (key === "s") {
            instant.addOffset(-60000);
          } else if (key === "e") {
            instant.addOffset(1000);
          } else if (key === "d") {
            instant.addOffset(-1000);
          }
        }
      }
    });

    useInterval(() => {
      instant.update();
      rerender();
    }, 13);

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