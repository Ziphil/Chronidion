//

import * as react from "react";
import {
  Fragment,
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

    const {iconNode, value, decimalLength, unit} = getMeteoKindSpec(meteo, kind);
    const node = (
      <div className="pane">
        <div className="pane-head">
          <div className="pane-head-left">
            {(meteo.date === undefined) ? (
              <Fragment>
                <Letter string="Current" wide={true}/>
              </Fragment>
            ) : (
              <Fragment>
                <Letter string={meteo.date.year() % 100} length={2} split={true}/>
                <Letter string="/"/>
                <Letter string={meteo.date.month() + 1} length={2} split={true}/>
                <Letter string="/"/>
                <Letter string={meteo.date.date()} length={2} split={true}/>
              </Fragment>
            )}
          </div>
          <div className="pane-head-right">
            <span className="pane-head-icon">
              {iconNode}
            </span>
          </div>
        </div>
        <div className="pane-main">
          <div className="pane-main-left">
            <span className="pane-main-icon">
              <Icon name={meteo.weather.iconName} large={true}/>
            </span>
          </div>
          <div className="pane-main-right">
            {(value !== undefined) ? (
              <Fragment>
                <Letter string={value ?? 0} decimalLength={decimalLength} split={true}/>
                <Letter string={unit} unit={true}/>
              </Fragment>
            ) : (
              <Fragment>
                <Letter string="—"/>
                <Letter string={unit} unit={true}/>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
    return node;

  }
);


function getMeteoKindSpec(meteo: Meteo, kind: MeteoKind): {iconNode: ReactElement, value: number | undefined, decimalLength: number | undefined, unit: string} {
  if (kind === "temperature") {
    const spec = {
      iconNode: <><Icon name="temperature-half"/></>,
      value: meteo.temperatures.day,
      decimalLength: 1,
      unit: "°C"
    };
    return spec;
  } else if (kind === "maxTemperature") {
    const spec = {
      iconNode: <><Icon name="angles-up"/><Icon name="temperature-full"/></>,
      value: meteo.temperatures.max,
      decimalLength: 1,
      unit: "°C"
    };
    return spec;
  } else if (kind === "minTemperature") {
    const spec = {
      iconNode: <><Icon name="angles-down"/><Icon name="temperature-empty"/></>,
      value: meteo.temperatures.min,
      decimalLength: 1,
      unit: "°C"
    };
    return spec;
  } else if (kind === "humidity") {
    const spec = {
      iconNode: <><Icon name="water"/></>,
      value: meteo.humidity,
      decimalLength: 0,
      unit: "%"
    };
    return spec;
  } else if (kind === "precipitation") {
    const spec = {
      iconNode: <><Icon name="droplet"/></>,
      value: meteo.precipitation,
      decimalLength: 0,
      unit: "%"
    };
    return spec;
  } else {
    const spec = {
      iconNode: <></>,
      value: undefined,
      decimalLength: undefined,
      unit: ""
    };
    return spec;
  }
}

const METEO_KINDS = ["temperature", "maxTemperature", "minTemperature", "pressure", "humidity", "precipitation"] as const;
export const MeteoKindUtil = LiteralUtilType.create(METEO_KINDS);
export type MeteoKind = LiteralType<typeof METEO_KINDS>;

export default MeteoPane;