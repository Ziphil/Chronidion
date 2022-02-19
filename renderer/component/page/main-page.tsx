//

import * as react from "react";
import {
  ReactElement
} from "react";
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
        <div className="clock">
        </div>
        <div className="menu">
        </div>
      </div>
    );
    return node;

  }
);


export default MainPage;