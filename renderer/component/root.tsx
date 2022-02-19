//

import * as queryParser from "query-string";
import * as react from "react";
import {
  ReactElement
} from "react";
import {
  useEvent
} from "react-use";
import {
  create
} from "./create";
import MainPage from "./page/main-page";


const Root = create(
  "Root",
  function ({
  }: {
  }): ReactElement {

    useEvent("keydown", (event) => {
      if (event.key === "F5") {
        window.api.send("move-default-position", id);
      }
    });

    let query = queryParser.parse(window.location.search);
    let id = (typeof query.idString === "string") ? parseInt(query.idString) : -1;
    let node = (
      <MainPage/>
    );
    return node;

  }
);


export default Root;