//

import * as react from "react";
import {ReactElement, ReactNode} from "react";
import {create} from "/renderer/component/create";


export const PaneHeader = create(
  require("./pane-header.scss"), "PaneHeader",
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