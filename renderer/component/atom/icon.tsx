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
  DataUtil
} from "../../util/data";
import {
  create
} from "../create";


const Icon = create(
  "Icon",
  function ({
    name,
    large = false,
    className
  }: {
    name: IconName,
    large?: boolean,
    className?: string
  }): ReactElement {

    const data = DataUtil.create({
      large: {if: large, true: "true"}
    });
    const node = (
      <span className={"icon" + ((className) ? ` ${className}` : "")} {...data}>
        <FontAwesomeIcon icon={name}/>
      </span>
    );
    return node;

  }
);


export default Icon;