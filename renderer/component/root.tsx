//

import * as react from "react";
import {
  ReactElement
} from "react";
import {
  create
} from "./create";
import MainPage from "./page/main-page";


const Root = create(
  "Root",
  function ({
  }: {
  }): ReactElement {

    let node = (
      <MainPage/>
    );
    return node;

  }
);


export default Root;