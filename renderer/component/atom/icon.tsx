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
    name,
    className
  }: {
    name: IconName,
    className?: string
  }): ReactElement {

    let node = (
      <span className={"icon" + ((className) ? ` ${className}` : "")}>
        <FontAwesomeIcon icon={name}/>
      </span>
    );
    return node;

  }
);


export default Icon;