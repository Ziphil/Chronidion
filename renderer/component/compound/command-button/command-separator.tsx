//

import * as react from "react";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";


export const CommandSeparator = create(
  require("./command-separator.scss"), "CommandSeparator",
  function ({
  }: {
  }): ReactElement {

    return (
      <div styleName="root"/>
    );

  }
);