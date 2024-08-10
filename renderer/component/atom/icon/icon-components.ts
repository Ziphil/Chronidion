//

import {
  faArrowDown,
  faBoltLightning,
  faCloudDrizzle,
  faCloudSun,
  faClouds,
  faCommand,
  faDownToLine,
  faMinus,
  faSlidersSimple,
  faSmog,
  faSnowflake,
  faSun,
  faUmbrella,
  faUpToLine
} from "@fortawesome/sharp-light-svg-icons";


export const ICON_DEFINITIONS = {
  clear: faSun,
  cloudClear: faCloudSun,
  cloud: faClouds,
  shower: faCloudDrizzle,
  rain: faUmbrella,
  snow: faSnowflake,
  mist: faSmog,
  thunder: faBoltLightning,
  dizzy: faMinus,
  discomfort: faMinus,
  neutral: faMinus,
  comfort: faMinus,
  page: faCommand,
  toggle: faSlidersSimple,
  next: faArrowDown,
  max: faUpToLine,
  min: faDownToLine
};

export type IconName = keyof typeof ICON_DEFINITIONS;