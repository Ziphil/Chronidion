//

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as react from "react";
import {CSSProperties, ReactElement} from "react";
import {create} from "/renderer/component/create";
import {data} from "/renderer/util/data";
import {ICON_DEFINITIONS, IconName} from "./icon-components";


export const Icon = create(
  require("./icon.scss"), "Icon",
  function ({
    name,
    large = false,
    simple = false,
    ...rest
  }: {
    name: IconName,
    large?: boolean,
    simple?: boolean,
    className?: string,
    style?: CSSProperties
  }): ReactElement {

    const icon = ICON_DEFINITIONS[name];

    return (
      <span styleName="root" {...data({large, simple})} {...rest}>
        {(icon !== undefined) && <FontAwesomeIcon icon={icon}/>}
      </span>
    );

  }
);