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

    let {iconNode, value, decimalLength, unit} = getMeteoKindSpec(meteo, kind);
    let leftHeadNode = (() => {
      if (meteo.date === undefined) {
        let leftHeadNode = (
          <Fragment>
            <Letter string="Current"/>
          </Fragment>
        );
        return leftHeadNode;
      } else {
        let leftHeadNode = (
          <Fragment>
            <Letter string={meteo.date.year() % 100} length={2} split={true}/>
            <Letter string="/"/>
            <Letter string={meteo.date.month() + 1} length={2} split={true}/>
            <Letter string="/"/>
            <Letter string={meteo.date.date()} length={2} split={true}/>
          </Fragment>
        );
        return leftHeadNode;
      }
    })();
    let rightMainNode = (() => {
      if (value !== undefined) {
        let rightMainNode = (
          <Fragment>
            <Letter string={value ?? 0} decimalLength={decimalLength} split={true}/>
            <Letter string={unit} unit={true}/>
          </Fragment>
        );
        return rightMainNode;
      } else {
        let rightMainNode = (
          <Fragment>
            <Letter string="—"/>
          </Fragment>
        );
        return rightMainNode;
      }
    })();
    let node = (
      <div className="pane">
        <div className="pane-head">
          <div className="pane-head-left">
            {leftHeadNode}
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
              <Icon name={meteo.weather.iconName}/>
            </span>
          </div>
          <div className="pane-main-right">
            {rightMainNode}
          </div>
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