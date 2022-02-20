//

import * as react from "react";
import {
  ReactElement
} from "react";
import {
  Instant
} from "../../model/instant/instant";
import {
  Meteo
} from "../../model/meteo";
import {
  DataUtil
} from "../../util/data";
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
          <Letter string="Current"/>
        </div>
        <div className="meteo-main">
        </div>
      </div>
    );
    return node;

  }
);


export default MeteoPane;