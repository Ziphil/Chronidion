//

import * as react from "react";
import {
  ReactElement,
  createElement
} from "react";
import {
  BsChevronDoubleDown,
  BsChevronDoubleUp,
  BsCloudDrizzle,
  BsCloudHaze,
  BsCloudSun,
  BsCloudy,
  BsDroplet,
  BsSnow,
  BsSun,
  BsThermometerHalf,
  BsTropicalStorm,
  BsUmbrella,
  BsWater
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
  thunder: BsTropicalStorm
};


const Icon = create(
  "Icon",
  function ({
    name,
    large = false,
    className
  }: {
    name: IconName,
    large?: boolean,
    className?: string
  }): ReactElement {

    const iconComponent = ICON_COMPONENTS[name];
    const data = DataUtil.create({
      large: {if: large, true: "true"}
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