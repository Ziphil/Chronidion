//

import * as react from "react";
import {MouseEventHandler, ReactElement, ReactNode} from "react";
import {create} from "/renderer/component/create";


export const MenuButton = create(
  require("./menu-button.scss"), "MenuButton",
  function ({
    onClick,
    children,
    ...rest
  }: {
    onClick?: MouseEventHandler<HTMLButtonElement>,
    children: ReactNode,
    className?: string
  }): ReactElement {

    return (
      <button styleName="root" onClick={onClick} {...rest}>
        {children}
      </button>
    );

  }
);