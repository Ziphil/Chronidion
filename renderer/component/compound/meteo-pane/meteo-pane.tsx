//

import * as react from "react";
import {Fragment, ReactElement} from "react";
import {Meteo} from "/renderer/model/meteo";
import {LiteralType, LiteralUtilType} from "/renderer/util/literal-type";
import {Letter} from "/renderer/component/atom/letter";
import {Icon} from "/renderer/component/atom/icon";
import {create} from "/renderer/component/create";
import {Pane, PaneHeader, PaneMain} from "/renderer/component/compound/pane";


const MeteoPane = create(
  require("./meteo-pane.scss"), "MeteoPane",
  function ({
    meteo,
    kind
  }: {
    meteo: Meteo,
    kind: MeteoKind
  }): ReactElement {

    const {headNode, value, decimalLength, unit} = getMeteoKindSpec(meteo, kind);

    return (
      <Pane>
        <PaneHeader>
          <div>
            {(meteo.date === null) ? (
              <Fragment>
                <Letter wide={true}>Current</Letter>
              </Fragment>
            ) : (
              <Fragment>
                <Letter length={2} split={true}>{meteo.date.year() % 100}</Letter>
                <Letter>/</Letter>
                <Letter length={2} split={true}>{meteo.date.month() + 1}</Letter>
                <Letter>/</Letter>
                <Letter length={2} split={true}>{meteo.date.date()}</Letter>
              </Fragment>
            )}
          </div>
          <div>
            {headNode}
          </div>
        </PaneHeader>
        <PaneMain>
          <div styleName="icon">
            {(kind === "temperature" && meteo.weatherIconName !== undefined) && <Icon name={meteo.weatherIconName}/>}
          </div>
          <div>
            {(value === null) ? (
              <Letter>—</Letter>
            ) : (value === undefined) ? (
              <Letter> </Letter>
            ) : (
              <Letter decimalLength={decimalLength} split={true}>{value}</Letter>
            )}
            {(unit !== null) && <Letter unit={true}>{unit}</Letter>}
          </div>
        </PaneMain>
      </Pane>
    );

  }
);


function getMeteoKindSpec(meteo: Meteo, kind: MeteoKind): {headNode: ReactElement, value?: number | null, decimalLength: number, unit: string | null} {
  if (kind === "temperature") {
    const spec = {
      headNode: <><Letter wide={true}>Temp</Letter></>,
      value: meteo.temperature,
      decimalLength: 1,
      unit: "°C"
    };
    return spec;
  } else if (kind === "maxTemperature") {
    const spec = {
      headNode: <><span styleName="head-icon"><Icon name="max"/></span><Letter wide={true}>Temp</Letter></>,
      value: meteo.maxTemperature,
      decimalLength: 1,
      unit: "°C"
    };
    return spec;
  } else if (kind === "minTemperature") {
    const spec = {
      headNode: <><span styleName="head-icon"><Icon name="min"/></span><Letter wide={true}>Temp</Letter></>,
      value: meteo.minTemperature,
      decimalLength: 1,
      unit: "°C"
    };
    return spec;
  } else if (kind === "pressure") {
    const spec = {
      headNode: <><Letter wide={true}>Pressure</Letter></>,
      value: meteo.pressure,
      decimalLength: 0,
      unit: "hPa"
    };
    return spec;
  } else if (kind === "humidity") {
    const spec = {
      headNode: <><Letter wide={true}>Humid</Letter></>,
      value: meteo.humidity,
      decimalLength: 0,
      unit: "%"
    };
    return spec;
  } else if (kind === "precipitation") {
    const spec = {
      headNode: <><Letter wide={true}>Precip</Letter></>,
      value: meteo.precipitation,
      decimalLength: 0,
      unit: "%"
    };
    return spec;
  } else if (kind === "wind") {
    const spec = {
      headNode: <><Letter wide={true}>Wind</Letter></>,
      value: meteo.wind,
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