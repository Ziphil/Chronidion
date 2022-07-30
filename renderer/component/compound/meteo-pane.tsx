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

    const {headNode, value, decimalLength, unit} = getMeteoKindSpec(meteo, kind);
    const node = (
      <div className="pane">
        <div className="pane-head">
          <div className="pane-head-left">
            {(meteo.date === null) ? (
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
            {headNode}
          </div>
        </div>
        <div className="pane-main">
          <div className="pane-main-left">
            <span className="pane-main-icon">
              {(kind === "wind") ? (
                (meteo.wind) && <Icon name="arrow" large={true} style={{transform: `rotate(${meteo.wind.direction + 180}deg)`}}/>
              ) : (
                (meteo.weather) && <Icon name={meteo.weather.iconName} large={true}/>
              )}
            </span>
          </div>
          <div className="pane-main-right">
            {(value === null) ? (
              <Letter string="—"/>
            ) : (value === undefined) ? (
              null
            ) : (
              <Letter string={value} decimalLength={decimalLength} split={true}/>
            )}
            {(unit !== null) && <Letter string={unit} unit={true}/>}
          </div>
        </div>
      </div>
    );
    return node;

  }
);


function getMeteoKindSpec(meteo: Meteo, kind: MeteoKind): {headNode: ReactElement, value?: number | null, decimalLength: number, unit: string | null} {
  if (kind === "temperature") {
    const spec = {
      headNode: <><Letter string="Temp" wide={true}/></>,
      value: meteo.temperatures?.day,
      decimalLength: 1,
      unit: "°C"
    };
    return spec;
  } else if (kind === "maxTemperature") {
    const spec = {
      headNode: <><span className="pane-head-icon"><Icon name="max"/></span><Letter string="Temp" wide={true}/></>,
      value: meteo.temperatures?.max,
      decimalLength: 1,
      unit: "°C"
    };
    return spec;
  } else if (kind === "minTemperature") {
    const spec = {
      headNode: <><span className="pane-head-icon"><Icon name="min"/></span><Letter string="Temp" wide={true}/></>,
      value: meteo.temperatures?.min,
      decimalLength: 1,
      unit: "°C"
    };
    return spec;
  } else if (kind === "humidity") {
    const spec = {
      headNode: <><Letter string="Humid" wide={true}/></>,
      value: meteo.humidity,
      decimalLength: 0,
      unit: "%"
    };
    return spec;
  } else if (kind === "precipitation") {
    const spec = {
      headNode: <><Letter string="Precip" wide={true}/></>,
      value: meteo.precipitation,
      decimalLength: 0,
      unit: "%"
    };
    return spec;
  } else if (kind === "wind") {
    const spec = {
      headNode: <><Letter string="Wind" wide={true}/></>,
      value: meteo.wind?.speed,
      decimalLength: 1,
      unit: "m/s"
    };
    return spec;
  } else {
    const spec = {
      headNode: <></>,
      value: undefined,
      decimalLength: 0,
      unit: null
    };
    return spec;
  }
}

const METEO_KINDS = ["temperature", "maxTemperature", "minTemperature", "pressure", "humidity", "precipitation", "wind"] as const;
export const MeteoKindUtil = LiteralUtilType.create(METEO_KINDS);
export type MeteoKind = LiteralType<typeof METEO_KINDS>;

export default MeteoPane;