//

import * as react from "react";
import {
  ReactElement,
  createElement
} from "react";
import {
  BsArrowDown,
  BsArrowLeft,
  BsArrowRight,
  BsArrowUp,
  BsChevronDoubleDown,
  BsChevronDoubleUp,
  BsCloudDrizzle,
  BsCloudHaze,
  BsCloudSun,
  BsCloudy,
  BsCommand,
  BsDroplet,
  BsLightning,
  BsPlay,
  BsSnow,
  BsStop,
  BsSun,
  BsThermometerHalf,
  BsUmbrella,
  BsWater,
  BsXCircle
} from "react-icons/bs";
import {
  DataUtil
} from "../../util/data";
import {
  create
} from "../create";


const ICON_COMPONENTS = {
  temperature: BsThermometerHalf,
  max: BsChevronDoubleUp,
  min: BsChevronDoubleDown,
  humidity: BsWater,
  precipitation: BsDroplet,
  clear: BsSun,
  cloudClear: BsCloudSun,
  cloud: BsCloudy,
  shower: BsCloudDrizzle,
  rain: BsUmbrella,
  snow: BsSnow,
  mist: BsCloudHaze,
  thunder: BsLightning,
  previousPage: BsArrowLeft,
  nextPage: BsArrowRight,
  toggle: BsCommand,
  start: BsPlay,
  stop: BsStop,
  reset: BsXCircle,
  previousDay: BsArrowUp,
  nextDay: BsArrowDown
};


const Icon = create(
  "Icon",
  function ({
    name,
    large = false,
    simple = false,
    className
  }: {
    name: IconName,
    large?: boolean,
    simple?: boolean,
    className?: string
  }): ReactElement {

    const iconComponent = ICON_COMPONENTS[name];
    const data = DataUtil.create({
      large: {if: large, true: "true"},
      simple: {if: simple, true: "true"}
    });
    const node = (
      <span className={"icon" + ((className) ? ` ${className}` : "")} {...data}>
        {(iconComponent) && createElement(iconComponent)}
      </span>
    );
    return node;

  }
);


export type IconName = keyof typeof ICON_COMPONENTS;

export default Icon;