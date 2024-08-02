//

import {
  BsArrowDown,
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


export const ICON_COMPONENTS = {
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
  next: BsArrowDown,
  max: BsChevronDoubleUp,
  min: BsChevronDoubleDown,
  arrow: BsArrowUp,
  comfort: BsEmojiSmile,
  neutral: BsEmojiNeutral,
  discomfort: BsEmojiFrown,
  dizzy: BsEmojiDizzy
};

export type IconName = keyof typeof ICON_COMPONENTS;