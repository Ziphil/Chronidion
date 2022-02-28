//

import {
  IconName
} from "@fortawesome/fontawesome-common-types";
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

  public static fromCurrentData(data: any): Meteo {
    let meteoData = METEO_DATA as any;
    let weather = {
      id: data["weather"][0]["id"],
      iconName: meteoData[data["weather"][0]["id"]]["iconName"]
    };
    let temperatures = {
      day: data["main"]["temp"]
    };
    let pressure = data["main"]["pressure"];
    let humidity = data["main"]["humidity"];
    let meteo = {weather, temperatures, pressure, humidity};
    return meteo;
  }

  public static fromForecastData(data: {list: Array<any>}): Array<Meteo> {
    let meteoData = METEO_DATA as any;
    let meteos = data["list"].map((dailyData) => {
      let date = dayjs(dailyData["dt"] * 1000);
      let weather = {
        id: dailyData["weather"][0]["id"],
        iconName: meteoData[dailyData["weather"][0]["id"]]["iconName"]
      };
      let temperatures = {
        day: dailyData["temp"]["day"],
        max: dailyData["temp"]["max"],
        min: dailyData["temp"]["min"]
      };
      let pressure = dailyData["pressure"];
      let humidity = dailyData["humidity"];
      let precipitation = dailyData["pop"] * 100;
      let meteo = {date, weather, temperatures, pressure, humidity, precipitation};
      return meteo;
    });
    return meteos;
  }

}