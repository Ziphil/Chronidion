//

import * as react from "react";
import {ReactElement, ReactNode} from "react";
import {create} from "/renderer/component/create";


export const PageFooter = create(
  require("./page-footer.scss"), "PageFooter",
  function ({
    children
  }: {
    children: ReactNode
  }): ReactElement {

    return (
      <div styleName="root">
        <div styleName="container">
          {children}
        </div>
      </div>
    );

  }
);