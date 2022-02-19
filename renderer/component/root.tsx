//

import * as react from "react";
import {
  ReactElement
} from "react";
import {
  create
} from "./create";


const Root = create(
  "Root",
  function ({
  }: {
  }): ReactElement {

    let node = (
      <div>
        Hello, Electron!!
      </div>
    );
    return node;

  }
);


export default Root;