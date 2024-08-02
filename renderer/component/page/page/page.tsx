//

import * as react from "react";
import {ReactElement, ReactNode} from "react";
import {create} from "/renderer/component/create";


export const Page = create(
  require("./page.scss"), "Page",
  function ({
    show,
    children
  }: {
    show: boolean,
    children: ReactNode
  }): ReactElement | null {

    return (show) ? (
      <div styleName="root">
        {children}
      </div>
    ) : null;

  }
);