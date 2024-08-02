//

import * as react from "react";
import {CSSProperties, ReactElement, createElement} from "react";
import {create} from "/renderer/component/create";
import {data} from "/renderer/util/data";
import {ICON_COMPONENTS, IconName} from "./icon-components";


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

    const iconComponent = ICON_COMPONENTS[name];

    return (
      <span styleName="root" {...data({large, simple})} {...rest}>
        {(iconComponent !== undefined) && createElement(iconComponent)}
      </span>
    );

  }
);