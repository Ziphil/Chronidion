//

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
import Icon from "../atom/icon";
import Letter from "../atom/letter";
import {
  create
} from "../create";


const MeteoPane = create(
  "MeteoPane",
  function ({
    meteo,
    kind
  }: {
    meteo: Meteo,
    kind: MeteoKind
  }): ReactElement {

    let {iconNode, value, decimalLength, unit} = getMeteoKindSpec(meteo, kind);
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
              <Letter string={unit} unit={true}/>
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
          <div className="meteo-kind-icon">
            {iconNode}
          </div>
        </div>
        <div className="meteo-main">
          <div className="meteo-left">
            <span className="meteo-weather-icon">
              <Icon name={meteo.weather.iconName}/>
            </span>
          </div>
          {rightNode}
        </div>
      </div>
    );
    return node;

  }
);


function getMeteoKindSpec(meteo: Meteo, kind: MeteoKind): {iconNode: ReactElement, value: number | undefined, decimalLength: number | undefined, unit: string} {
  if (kind === "temperature") {
    let spec = {
      iconNode: <Icon name="temperature-half"/>,
      value: Math.round(meteo.temperatures.day),
      decimalLength: undefined,
      unit: "°C"
    };
    return spec;
  } else if (kind === "maxTemperature") {
    let spec = {
      iconNode: <><Icon name="angles-up"/><Icon name="temperature-full"/></>,
      value: meteo.temperatures.max && Math.round(meteo.temperatures.max),
      decimalLength: undefined,
      unit: "°C"
    };
    return spec;
  } else if (kind === "minTemperature") {
    let spec = {
      iconNode: <><Icon name="angles-down"/><Icon name="temperature-empty"/></>,
      value: meteo.temperatures.min && Math.round(meteo.temperatures.min),
      decimalLength: undefined,
      unit: "°C"
    };
    return spec;
  } else if (kind === "humidity") {
    let spec = {
      iconNode: <Icon name="water"/>,
      value: Math.round(meteo.humidity),
      decimalLength: undefined,
      unit: "%"
    };
    return spec;
  } else if (kind === "precipitation") {
    let spec = {
      iconNode: <Icon name="droplet"/>,
      value: meteo.precipitation && Math.round(meteo.precipitation),
      decimalLength: undefined,
      unit: "%"
    };
    return spec;
  } else {
    let spec = {
      iconNode: <></>,
      value: undefined,
      decimalLength: undefined,
      unit: ""
    };
    return spec;
  }
}

const METEO_KINDS = ["temperature", "maxTemperature", "minTemperature", "pressure", "humidity", "precipitation"] as const;
export let MeteoKindUtil = LiteralUtilType.create(METEO_KINDS);
export type MeteoKind = LiteralType<typeof METEO_KINDS>;

export default MeteoPane;