//

import axios from "axios";
import * as react from "react";
import {
  ReactElement
} from "react";
import {
  useEvent
} from "react-use";
import useSWR from "swr";
import {
  Meteo
} from "../../model/meteo";
import MeteoPane from "../compound/meteo-pane";
import {
  create
} from "../create";


const MeteoPage = create(
  "MeteoPage",
  function ({
  }: {
  }): ReactElement {

    let {data, error} = useSWR("/weather", fetchMeteo);

    let node = (
      <div className="meteo-page">
        {data !== undefined && <MeteoPane meteo={data}/>}
      </div>
    );
    return node;

  }
);


async function fetchMeteo(): Promise<Meteo> {
  let key = process.env["WEATHER_KEY"];
  let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=35.6895&lon=139.6917&units=metric&appid=${key}`);
  let meteo = Meteo.fromCurrentData(response.data);
  return meteo;
}

export default MeteoPage;