//

import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import * as react from "react";
import {
  ReactElement
} from "react";
import {
  Meteo
} from "../../model/meteo";
import {
  LiteralType,
  LiteralUtilType
} from "../../util/literal-type";
import {
  create
} from "../create";
import Letter from "./letter";


const MeteoPane = create(
  "MeteoPane",
  function ({
    meteo,
    kind
  }: {
    meteo: Meteo,
    kind: MeteoKind
  }): ReactElement {

    let [kindName, value, decimalLength, unit] = getMeteoKindSpec(meteo, kind);
    let dateFullNode = (() => {
      if (meteo.date === undefined) {
        let dateFullNode = (
          <div className="meteo-date-current">
            <Letter string="Current"/>
          </div>
        );
        return dateFullNode;
      } else {
        let dateFullNode = (
          <div className="clock-date-full">
            <span className="clock-year">
              <Letter string={meteo.date.year()} length={4} split={true}/>
            </span>
            <span className="clock-separator">
              <Letter string="/"/>
            </span>
            <span className="clock-month">
              <Letter string={meteo.date.month() + 1} length={2} split={true}/>
            </span>
            <span className="clock-separator">
              <Letter string="/"/>
            </span>
            <span className="clock-day">
              <Letter string={meteo.date.date()} length={2} split={true}/>
            </span>
          </div>
        );
        return dateFullNode;
      }
    })();
    let rightNode = (() => {
      if (value !== undefined) {
        let rightNode = (
          <div className="meteo-right">
            <span className="meteo-value-number">
              <Letter string={value ?? 0} decimalLength={decimalLength} split={true}/>
            </span>
            <span className="meteo-value-unit">
              <Letter string={unit}/>
            </span>
          </div>
        );
        return rightNode;
      } else {
        let rightNode = (
          <div className="meteo-right">
            <span className="meteo-value-none">
              <Letter string="—"/>
            </span>
          </div>
        );
        return rightNode;
      }
    })();
    let node = (
      <div className="meteo">
        <div className="meteo-date">
          {dateFullNode}
          <div className="meteo-kind">
            <Letter string={kindName}/>
          </div>
        </div>
        <div className="meteo-main">
          <div className="meteo-left">
            <span className="meteo-icon">
              <FontAwesomeIcon icon={meteo.weatherIconName}/>
            </span>
          </div>
          {rightNode}
        </div>
      </div>
    );
    return node;

  }
);


function getMeteoKindSpec(meteo: Meteo, kind: MeteoKind): [string, number | undefined, number | undefined, string] {
  if (kind === "temperature") {
    return ["Temp", meteo.temperatures.day, 1, "°"];
  } else if (kind === "maxTemperature") {
    return ["Max Temp", meteo.temperatures.max, 1, "°"];
  } else if (kind === "minTemperature") {
    return ["Min Temp", meteo.temperatures.min, 1, "°"];
  } else if (kind === "pressure") {
    return ["Press", Math.round(meteo.pressure), undefined, "hPa"];
  } else if (kind === "humidity") {
    return ["Humid", Math.round(meteo.humidity), undefined, "%"];
  } else if (kind === "precipitation") {
    return ["Precip", meteo.precipitation && Math.round(meteo.precipitation), undefined, "%"];
  } else {
    return ["", undefined, undefined, ""];
  }
}

const METEO_KINDS = ["temperature", "maxTemperature", "minTemperature", "pressure", "humidity", "precipitation"] as const;
export let MeteoKindUtil = LiteralUtilType.create(METEO_KINDS);
export type MeteoKind = LiteralType<typeof METEO_KINDS>;

export default MeteoPane;