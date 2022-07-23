//

import * as react from "react";
import {
  ReactElement,
  ReactNode
} from "react";
import {
  create
} from "../create";


const Page = create(
  "Page",
  function ({
    show,
    children
  }: {
    show: boolean,
    children: [ReactNode, ReactNode]
  }): ReactElement | null {

    const node = (show) && (
      <div className="main">
        <div className="page-container-wrapper">
          <div className="page-container">
            {children[0]}
          </div>
        </div>
        <div className="menu-container-wrapper">
          <div className="menu-container">
            {children[1]}
          </div>
        </div>
      </div>
    );
    return node || null;

  }
);


export default Page;