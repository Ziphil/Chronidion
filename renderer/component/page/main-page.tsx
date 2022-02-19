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
import Clock from "../compound/clock";
import {
  create
} from "../create";


const MainPage = create(
  "MainPage",
  function ({
  }: {
  }): ReactElement {

    let [gregorianInstant, setGregorianInstant] = useState(new GregorianInstant());
    let [hairianInstant, setHairianInstant] = useState(new HairianInstant());
    let rerender = useRerender();

    useInterval(() => {
      gregorianInstant.update();
      hairianInstant.update();
      rerender();
    }, 10);

    let node = (
      <div className="main">
        <div className="clock-container">
          <Clock instant={gregorianInstant}/>
        </div>
        <div className="menu-container">
        </div>
      </div>
    );
    return node;

  }
);


export default MainPage;