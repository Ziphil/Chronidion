//

import * as react from "react";
import {
  CSSProperties,
  ReactElement,
  createElement
} from "react";
import {
  BsArrowLeftRight,
  BsArrowUp,
  BsChevronDoubleDown,
  BsChevronDoubleUp,
  BsCloudDrizzle,
  BsCloudHaze,
  BsCloudSun,
  BsCloudy,
  BsCommand,
  BsEmojiDizzy,
  BsEmojiFrown,
  BsEmojiNeutral,
  BsEmojiSmile,
  BsLightning,
  BsSnow,
  BsSun,
  BsUmbrella
} from "react-icons/bs";
import {
  DataUtil
} from "../../util/data";
import {
  create
} from "../create";


const ICON_COMPONENTS = {
  clear: BsSun,
  cloudClear: BsCloudSun,
  cloud: BsCloudy,
  shower: BsCloudDrizzle,
  rain: BsUmbrella,
  snow: BsSnow,
  mist: BsCloudHaze,
  thunder: BsLightning,
  page: BsCommand,
  toggle: BsArrowLeftRight,
  max: BsChevronDoubleUp,
  min: BsChevronDoubleDown,
  arrow: BsArrowUp,
  comfort: BsEmojiSmile,
  neutral: BsEmojiNeutral,
  discomfort: BsEmojiFrown,
  dizzy: BsEmojiDizzy
};


const Icon = create(
  "Icon",
  function ({
    name,
    large = false,
    simple = false,
    className,
    style
  }: {
    name: IconName,
    large?: boolean,
    simple?: boolean,
    className?: string,
    style?: CSSProperties
  }): ReactElement {

    const iconComponent = ICON_COMPONENTS[name];
    const data = DataUtil.create({
      large: {if: large, true: "true"},
      simple: {if: simple, true: "true"}
    });
    const node = (
      <span className={"icon" + ((className) ? ` ${className}` : "")} style={style} {...data}>
        {(iconComponent) && createElement(iconComponent)}
      </span>
    );
    return node;

  }
);


export type IconName = keyof typeof ICON_COMPONENTS;

export default Icon;