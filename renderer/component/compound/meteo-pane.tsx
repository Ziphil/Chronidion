//

import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import * as react from "react";
import {
  ReactElement
} from "react";
import {
  Meteo
} from "../../model/meteo";
import {
  create
} from "../create";
import Letter from "./letter";


const MeteoPane = create(
  "MeteoPane",
  function ({
    meteo
  }: {
    meteo: Meteo
  }): ReactElement {

    let node = (
      <div className="meteo">
        <div className="meteo-date">
          <Letter string="Temperature"/>
        </div>
        <div className="meteo-main">
          <div className="meteo-left">
            <span className="meteo-icon">
              <FontAwesomeIcon icon={meteo.wheatherIconName}/>
            </span>
          </div>
          <div className="meteo-right">
            <span className="meteo-temperature-number">
              <Letter string={Math.floor(meteo.temperature)} split={true}/>
            </span>
            <span className="meteo-temperature-point">
              <Letter string="."/>
            </span>
            <span className="meteo-temperature-number">
              <Letter string={Math.round(meteo.temperature * 10) % 10} split={true}/>
            </span>
            <span className="meteo-temperature-unit">
              <Letter string="°"/>
            </span>
          </div>
        </div>
      </div>
    );
    return node;

  }
);


export default MeteoPane;