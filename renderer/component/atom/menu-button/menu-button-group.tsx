//

import * as react from "react";
import {ReactElement, ReactNode} from "react";
import {create} from "/renderer/component/create";


export const MenuButtonGroup = create(
  require("./menu-button-group.scss"), "MenuButtonGroup",
  function ({
    children
  }: {
    children?: ReactNode
  }): ReactElement {

    return (
      <div styleName="root">
        {children}
      </div>
    );

  }
);