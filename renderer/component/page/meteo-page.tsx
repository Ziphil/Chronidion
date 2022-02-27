//

import axios from "axios";
import * as react from "react";
import {
  ReactElement,
  useState
} from "react";
import useSWR from "swr";
import {
  useKeyEvent
} from "../../hook";
import {
  Meteo
} from "../../model/meteo";
import MeteoPane from "../compound/meteo-pane";
import {
  MeteoKind
} from "../compound/meteo-pane";
import {
  create
} from "../create";


const MeteoPage = create(
  "MeteoPage",
  function ({
    show
  }: {
    show: boolean
  }): ReactElement | null {

    let [index, setIndex] = useState(0);
    let [kind, setKind] = useState<MeteoKind>("temperature");
    let {data, error} = useSWR("/meteo", fetchMeteos, {refreshInterval: 5 * 60 * 1000});

    useKeyEvent((key) => {
      if (key === "q") {
        setIndex((index) => Math.max(index - 1, 0));
      } else if (key === "a") {
        setIndex((index) => Math.min(index + 1, 7));
      }
      if (key === "z") {
        setKind("temperature");
      } else if (key === "x") {
        setKind("maxTemperature");
      } else if (key === "c") {
        setKind("minTemperature");
      } else if (key === "v") {
        setKind("humidity");
      } else if (key === "b") {
        setKind("precipitation");
      }
    }, show);

    let innerNode = (data !== undefined) && <MeteoPane meteo={data[index]} kind={kind}/>;
    let node = (show) && (
      <div className="meteo-page">
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

export default MeteoPage;