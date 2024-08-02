//

import * as react from "react";
import {ReactElement, ReactNode} from "react";
import {create} from "/renderer/component/create";


export const PaneMain = create(
  require("./pane-main.scss"), "PaneMain",
  function ({
    children
  }: {
    children: ReactNode
  }): ReactElement {

    return (
      <div styleName="root">
        {children}
      </div>
    );

  }
);