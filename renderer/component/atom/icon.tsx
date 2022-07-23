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
  IconType
} from "react-icons/lib";
import {
  DataUtil
} from "../../util/data";
import {
  create
} from "../create";


const ICON_NODES = {
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
} as {[key: string]: IconType | undefined};


const Icon = create(
  "Icon",
  function ({
    name,
    large = false,
    className
  }: {
    name: string,
    large?: boolean,
    className?: string
  }): ReactElement {

    const iconType = ICON_NODES[name];
    const data = DataUtil.create({
      large: {if: large, true: "true"}
    });
    const node = (
      <span className={"icon" + ((className) ? ` ${className}` : "")} {...data}>
        {(iconType) && createElement(iconType)}
      </span>
    );
    return node;

  }
);


export default Icon;