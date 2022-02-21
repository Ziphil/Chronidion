//

import {
  IconName
} from "@fortawesome/fontawesome-svg-core";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import * as react from "react";
import {
  ReactElement
} from "react";
import {
  create
} from "../create";


const Icon = create(
  "Icon",
  function ({
    name
  }: {
    name: IconName
  }): ReactElement {

    let node = (
      <span className="icon">
        <FontAwesomeIcon icon={name}/>
      </span>
    );
    return node;

  }
);


export default Icon;