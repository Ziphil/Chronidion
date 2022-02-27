//

import axios from "axios";
import * as react from "react";
import {
  ReactElement,
  useState
} from "react";
import {
  useInterval
} from "react-use";
import {
  useKeyEvent
} from "../../hook";
import {
  Meteo
} from "../../model/meteo";
import {
  MeteoKind
} from "../compound/meteo-pane";
import {
  create
} from "../create";


const SystemPage = create(
  "SystemPage",
  function ({
    show
  }: {
    show: boolean
  }): ReactElement | null {

    let [kind, setKind] = useState<MeteoKind>("temperature");

    useKeyEvent((key) => {
    }, show);

    useInterval(async () => {
    }, 1000);

    let innerNode = null;
    let node = (show) && (
      <div className="system-page">
        {innerNode}
      </div>
    );
    return node || null;

  }
);


async function fetchMeteos(): Promise<Array<Meteo>> {
  let url = "https://api.openweathermap.org/data/2.5";
  let key = process.env["WEATHER_KEY"];
  let currentPromise = axios.get(`${url}/weather?lat=35.6895&lon=139.6917&units=metric&appid=${key}`).then((response) => Meteo.fromCurrentData(response.data));
  let forecastPromise = axios.get(`${url}/forecast/daily?lat=35.6895&lon=139.6917&cnt=7&units=metric&appid=${key}`).then((response) => Meteo.fromForecastData(response.data));
  let [currentMeteo, forecastMeteos] = await Promise.all([currentPromise, forecastPromise]);
  console.log([currentMeteo, ...forecastMeteos]);
  return [currentMeteo, ...forecastMeteos];
}

export default SystemPage;