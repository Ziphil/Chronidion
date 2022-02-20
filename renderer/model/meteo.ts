//

import {
  IconName
} from "@fortawesome/fontawesome-common-types";
import METEO_DATA from "./meteo-data.json";


export class Meteo {

  public readonly wheatherId!: number;
  public readonly temperature!: number;
  public readonly pressure!: number;
  public readonly humidity!: number;

  public constructor(object: any) {
    this.wheatherId = object.wheatherId;
    this.temperature = object.temperature;
    this.pressure = object.pressure;
    this.humidity = object.humidity;
  }

  public get wheatherIconName(): IconName {
    let wheatherId = this.wheatherId as never;
    let wheatherIconName = METEO_DATA[wheatherId]["iconName"];
    return wheatherIconName;
  }

  public static fromCurrentData(data: any): Meteo {
    let wheatherId = data["weather"][0]["id"];
    let temperature = data["main"]["temp"];
    let pressure = data["main"]["pressure"];
    let humidity = data["main"]["humidity"];
    let meteo = new Meteo({wheatherId, temperature, pressure, humidity});
    return meteo;
  }

}