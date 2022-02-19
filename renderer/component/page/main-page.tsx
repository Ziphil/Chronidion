//

import * as react from "react";
import {
  ReactElement
} from "react";
import Clock from "../compound/clock";
import {
  create
} from "../create";


const MainPage = create(
  "MainPage",
  function ({
  }: {
  }): ReactElement {

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