//

import {
  IconName
} from "@fortawesome/fontawesome-common-types";
import dayjs from "dayjs";
import {
  Dayjs
} from "dayjs";
import METEO_DATA from "./meteo-data.json";


export class Meteo {

  public readonly date?: Dayjs;
  public readonly wheatherId: number;
  public readonly temperatures: {day: number, max?: number, min?: number};
  public readonly pressure: number;
  public readonly humidity: number;
  public readonly precipitation?: number;

  private constructor(object: any) {
    this.date = object.date;
    this.wheatherId = object.wheatherId;
    this.temperatures = object.temperatures;
    this.pressure = object.pressure;
    this.humidity = object.humidity;
    this.precipitation = object.precipitation;
  }

  public get wheatherIconName(): IconName {
    let wheatherId = this.wheatherId as never;
    let wheatherIconName = METEO_DATA[wheatherId]["iconName"];
    return wheatherIconName;
  }

  public static fromCurrentData(data: any): Meteo {
    let wheatherId = data["weather"][0]["id"];
    let temperatures = {day: data["main"]["temp"]};
    let pressure = data["main"]["pressure"];
    let humidity = data["main"]["humidity"];
    let meteo = new Meteo({wheatherId, temperatures, pressure, humidity});
    return meteo;
  }

  public static fromForecastData(data: {list: Array<any>}): Array<Meteo> {
    let meteos = data["list"].map((dailyData) => {
      let date = dayjs(dailyData["dt"] * 1000);
      let wheatherId = dailyData["weather"][0]["id"];
      let temperatures = {day: dailyData["temp"]["day"], max: dailyData["temp"]["max"], min: dailyData["temp"]["min"]};
      let pressure = dailyData["pressure"];
      let humidity = dailyData["humidity"];
      let precipitation = dailyData["pop"] * 100;
      let meteo = new Meteo({date, wheatherId, temperatures, pressure, humidity, precipitation});
      return meteo;
    });
    return meteos;
  }

}