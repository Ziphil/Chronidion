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
  HairianInstant
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
    let instants = [gregorianInstant, hairianInstant];
    let rerender = useRerender();

    useEvent("keydown", (event) => {
      let key = event.key;
      if (key === "ArrowRight") {
        setMode((mode) => ClockModeUtil.next(mode));
      } else if (key === "ArrowLeft") {
        setMode((mode) => ClockModeUtil.previous(mode));
      }
    });

    useInterval(() => {
      instants.forEach((instance) => instance.update());
      rerender();
    }, 10);

    let instant = (mode === "gregorian") ? gregorianInstant : hairianInstant;
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


const CLOCK_MODES = ["gregorian", "hairian"] as const;
export let ClockModeUtil = LiteralUtilType.create(CLOCK_MODES);
export type ClockMode = LiteralType<typeof CLOCK_MODES>;

export default MainPage;