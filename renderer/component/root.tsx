//

import * as queryParser from "query-string";
import * as react from "react";
import {
  ReactElement,
  useState
} from "react";
import {
  useEvent
} from "react-use";
import {
  GregorianInstant,
  HairianInstant,
  StopwatchInstant
} from "../module/instant";
import {
  LiteralType,
  LiteralUtilType
} from "../module/literal-type";
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

    let [mode, setMode] = useState<ClockMode>("gregorian");
    let [gregorianInstant] = useState(new GregorianInstant());
    let [hairianInstant] = useState(new HairianInstant());
    let [stopwatchInstant] = useState(new StopwatchInstant());

    useEvent("keydown", (event) => {
      let key = event.key;
      let query = queryParser.parse(window.location.search);
      let id = (typeof query.idString === "string") ? parseInt(query.idString) : -1;
      if (key === "F5") {
        window.api.send("move-default-position", id);
      } else if (key === "F12") {
        window.api.send("open-dev-tools", id);
      }
    });

    useEvent("keydown", (event) => {
      let key = event.key;
      if (key === "1") {
        setMode(ClockModeUtil.cast(0));
      } else if (key === "2") {
        setMode(ClockModeUtil.cast(1));
      } else if (key === "3") {
        setMode(ClockModeUtil.cast(2));
      } else if (key === "4") {
        setMode(ClockModeUtil.cast(3));
      }
    });

    let innerNode = (() => {
      if (mode === "gregorian") {
        return <ClockPage instant={gregorianInstant}/>;
      } else if (mode === "hairian") {
        return <ClockPage instant={hairianInstant}/>;
      } else if (mode === "stopwatch") {
        return <ClockPage instant={stopwatchInstant}/>;
      } else if (mode === "meteo") {
        return <MeteoPage/>;
      }
    })();
    let node = (
      <div className="main">
        <div className="page-container">
          {innerNode}
        </div>
        <div className="menu-container">
        </div>
      </div>
    );
    return node;

  }
);


const CLOCK_MODES = ["gregorian", "hairian", "stopwatch", "meteo"] as const;
export let ClockModeUtil = LiteralUtilType.create(CLOCK_MODES);
export type ClockMode = LiteralType<typeof CLOCK_MODES>;

export default Root;