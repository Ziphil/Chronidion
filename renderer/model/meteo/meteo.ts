//

import axios from "axios";
import dayjs from "dayjs";
import {
  Dayjs
} from "dayjs";
import {
  IconName
} from "../../component/atom/icon";
import METEO_DATA from "./meteo-data.json";


export interface Meteo {

  readonly date: Dayjs | null;
  readonly weather?: number;
  readonly weatherIconName?: IconName;
  readonly temperature?: number;
  readonly maxTemperature?: number | null;
  readonly minTemperature?: number | null;
  readonly pressure?: number;
  readonly humidity?: number;
  readonly precipitation?: number | null;
  readonly wind?: number;
  readonly windDirection?: number;

}


export class MeteoFactory {

  public static async fetch(): Promise<Array<Meteo>> {
    const [currentMeteo, forecastMeteos] = await Promise.all([MeteoFactory.fetchCurrentMeteo(), MeteoFactory.fetchForecastMeteos()]);
    return [currentMeteo, ...forecastMeteos];
  }

  private static async fetchCurrentMeteo(): Promise<Meteo> {
    const url = "https://api.openweathermap.org/data/2.5";
    const key = process.env["WEATHER_KEY"];
    try {
      const {data} = await axios.get(`${url}/weather?lat=35.6895&lon=139.6917&units=metric&appid=${key}`);
      const meteo = MeteoFactory.fromCurrentData(data);
      return meteo;
    } catch (error) {
      return {date: null};
    }
  }

  private static async fetchForecastMeteos(): Promise<Array<Meteo>> {
    const url = "https://api.openweathermap.org/data/2.5";
    const key = process.env["WEATHER_KEY"];
    try {
      const {data} = await axios.get(`${url}/forecast/daily?lat=35.6895&lon=139.6917&cnt=7&units=metric&appid=${key}`);
      const meteo = MeteoFactory.fromForecastData(data);
      return meteo;
    } catch (error) {
      const now = dayjs();
      const meteos = Array.from({length: 7}, (dummy, index) => ({date: now.add(index, "day").startOf("day")}));
      return meteos;
    }
  }

  private static fromCurrentData(data: any): Meteo {
    const meteoData = METEO_DATA as any;
    const date = null;
    const weather = +data["weather"][0]["id"];
    const weatherIconName = meteoData[data["weather"][0]["id"]]["iconName"];
    const temperature = data["main"]["temp"];
    const maxTemperature = null;
    const minTemperature = null;
    const pressure = data["main"]["pressure"];
    const humidity = data["main"]["humidity"];
    const precipitation = null;
    const wind = data["wind"]["speed"];
    const windDirection = data["wind"]["deg"];
    const meteo = {date, weather, weatherIconName, temperature, maxTemperature, minTemperature, pressure, humidity, precipitation, wind, windDirection};
    return meteo;
  }

  private static fromForecastData(data: {list: Array<any>}): Array<Meteo> {
    const meteoData = METEO_DATA as any;
    const meteos = data["list"].map((dailyData) => {
      const date = dayjs(dailyData["dt"] * 1000);
      const weather = dailyData["weather"][0]["id"];
      const weatherIconName = meteoData[dailyData["weather"][0]["id"]]["iconName"];
      const temperature = dailyData["temp"]["day"];
      const maxTemperature = dailyData["temp"]["max"];
      const minTemperature = dailyData["temp"]["min"];
      const pressure = dailyData["pressure"];
      const humidity = dailyData["humidity"];
      const precipitation = dailyData["pop"] * 100;
      const wind = dailyData["speed"];
      const windDirection = dailyData["deg"];
      const meteo = {date, weather, weatherIconName, temperature, maxTemperature, minTemperature, pressure, humidity, precipitation, wind, windDirection};
      return meteo;
    });
    return meteos;
  }

}