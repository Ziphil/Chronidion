//

import {
  IconName
} from "../../component/atom/icon";


export interface Room {

  readonly temperature: number;
  readonly humidity: number;
  readonly disconfort: number;
  readonly disconfortIconName: IconName;

}


export class RoomFactory {

  public static async fetch(): Promise<Room> {
    const {temperature, humidity} = await window.api.invoke("fetch-dht");
    const disconfort = RoomFactory.calcDisconfort(temperature, humidity);
    const disconfortIconName = RoomFactory.calcDisconfortIconName(disconfort);
    return {temperature, humidity, disconfort, disconfortIconName};
  }

  private static calcDisconfort(temperature: number, humidity: number): number {
    return 0.81 * temperature + 0.01 * humidity * (0.99 * temperature - 14.3) + 46.3;
  }

  private static calcDisconfortIconName(disconfort: number): IconName {
    if (disconfort < 55) {
      return "dizzy";
    } else if (disconfort < 60) {
      return "disconfort";
    } else if (disconfort < 65) {
      return "neutral";
    } else if (disconfort < 70) {
      return "confort";
    } else if (disconfort < 75) {
      return "neutral";
    } else if (disconfort < 80) {
      return "disconfort";
    } else {
      return "dizzy";
    }
  }

}