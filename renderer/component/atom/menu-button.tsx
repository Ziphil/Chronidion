//

import * as react from "react";
import {
  MouseEventHandler,
  ReactElement,
  ReactNode
} from "react";
import {
  DataUtil
} from "../../util/data";
import {
  create
} from "../create";


const MenuButton = create(
  "MenuButton",
  function ({
    onClick,
    children,
    className
  }: {
    onClick?: MouseEventHandler<HTMLButtonElement>,
    children: ReactNode,
    className?: string
  }): ReactElement {

    const data = DataUtil.create({
    });
    const node = (
      <button className={"menu-button" + ((className) ? ` ${className}` : "")} onClick={onClick} {...data}>
        {children}
      </button>
    );
    return node;

  }
);


export default MenuButton;