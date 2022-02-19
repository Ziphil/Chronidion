//

import * as react from "react";
import {
  ReactElement,
  useEffect
} from "react";
import Clock from "../compound/clock";
import {
  create
} from "../create";


const MainPage = create(
  "MainPage",
  function ({
    id
  }: {
    id: number
  }): ReactElement {

    useEffect(() => {
      window.addEventListener("keydown", (event) => {
        if (event.key === "F5") {
          window.api.send("move-default-position", id);
        }
      });
    }, []);

    let node = (
      <div className="main">
        <div className="clock-container">
          <Clock/>
        </div>
        <div className="menu-container">
        </div>
      </div>
    );
    return node;

  }
);


export default MainPage;