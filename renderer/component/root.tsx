//

import * as queryParser from "query-string";
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

    let query = queryParser.parse(window.location.search);
    let id = (typeof query.idString === "string") ? parseInt(query.idString) : -1;
    let node = (
      <MainPage id={id}/>
    );
    return node;

  }
);


export default Root;