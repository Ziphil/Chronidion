//

import {
  IconName
} from "@fortawesome/fontawesome-common-types";
import axios from "axios";
import dayjs from "dayjs";
import {
  Dayjs
} from "dayjs";
import METEO_DATA from "./meteo-data.json";


export interface Meteo {

  readonly date?: Dayjs;
  readonly weather: {id: number, iconName: IconName};
  readonly temperatures: {day: number, max?: number, min?: number};
  readonly pressure: number;
  readonly humidity: number;
  readonly precipitation?: number;

}


export class MeteoFactory {

  public static async fetch(): Promise<Array<Meteo>> {
    const url = "https://api.openweathermap.org/data/2.5";
    const key = process.env["WEATHER_KEY"];
    const currentPromise = axios.get(`${url}/weather?lat=35.6895&lon=139.6917&units=metric&appid=${key}`).then((response) => MeteoFactory.fromCurrentData(response.data));
    const forecastPromise = axios.get(`${url}/forecast/daily?lat=35.6895&lon=139.6917&cnt=7&units=metric&appid=${key}`).then((response) => MeteoFactory.fromForecastData(response.data));
    const [currentMeteo, forecastMeteos] = await Promise.all([currentPromise, forecastPromise]);
    return [currentMeteo, ...forecastMeteos];
  }

  public static fromCurrentData(data: any): Meteo {
    const meteoData = METEO_DATA as any;
    const weather = {
      id: data["weather"][0]["id"],
      iconName: meteoData[data["weather"][0]["id"]]["iconName"]
    };
    const temperatures = {
      day: data["main"]["temp"]
    };
    const pressure = data["main"]["pressure"];
    const humidity = data["main"]["humidity"];
    const meteo = {weather, temperatures, pressure, humidity};
    return meteo;
  }

  public static fromForecastData(data: {list: Array<any>}): Array<Meteo> {
    const meteoData = METEO_DATA as any;
    const meteos = data["list"].map((dailyData) => {
      const date = dayjs(dailyData["dt"] * 1000);
      const weather = {
        id: dailyData["weather"][0]["id"],
        iconName: meteoData[dailyData["weather"][0]["id"]]["iconName"]
      };
      const temperatures = {
        day: dailyData["temp"]["day"],
        max: dailyData["temp"]["max"],
        min: dailyData["temp"]["min"]
      };
      const pressure = dailyData["pressure"];
      const humidity = dailyData["humidity"];
      const precipitation = dailyData["pop"] * 100;
      const meteo = {date, weather, temperatures, pressure, humidity, precipitation};
      return meteo;
    });
    return meteos;
  }

}