//

import {
  IconName
} from "../../component/atom/icon";


export interface Room {

  readonly temperature: number;
  readonly humidity: number;
  readonly discomfort: number;
  readonly discomfortIconName: IconName;

}


export class RoomFactory {

  public static async fetch(): Promise<Room> {
    const {temperature, humidity} = await window.api.invoke("fetch-dht");
    const discomfort = RoomFactory.calcDiscomfort(temperature, humidity);
    const discomfortIconName = RoomFactory.calcDiscomfortIconName(discomfort);
    return {temperature, humidity, discomfort, discomfortIconName};
  }

  private static calcDiscomfort(temperature: number, humidity: number): number {
    return 0.81 * temperature + 0.01 * humidity * (0.99 * temperature - 14.3) + 46.3;
  }

  private static calcDiscomfortIconName(discomfort: number): IconName {
    if (discomfort < 55) {
      return "dizzy";
    } else if (discomfort < 60) {
      return "discomfort";
    } else if (discomfort < 65) {
      return "neutral";
    } else if (discomfort < 70) {
      return "comfort";
    } else if (discomfort < 75) {
      return "neutral";
    } else if (discomfort < 80) {
      return "discomfort";
    } else {
      return "dizzy";
    }
  }

}