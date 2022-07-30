//

import axios from "axios";
import {
  IconName
} from "../../component/atom/icon";


export interface Room {

  readonly temperature?: number;
  readonly humidity?: number;
  readonly discomfort?: number;
  readonly discomfortIconName?: IconName;
  readonly carbon?: number;

}


export class RoomFactory {

  public static async fetch(): Promise<Room> {
    const [dht22Return, mhz19Return] = await Promise.all([RoomFactory.fetchDht22Return(), RoomFactory.fetchMhz19Return()]);
    return {...dht22Return, ...mhz19Return};
  }

  private static async fetchDht22Return(): Promise<Pick<Room, "temperature" | "humidity" | "discomfort" | "discomfortIconName">> {
    try {
      const {temperature, humidity} = await axios.get("http://localhost:8080/sensor", {params: {type: "dht22"}}).then((response) => response.data);
      const discomfort = RoomFactory.calcDiscomfort(temperature, humidity);
      const discomfortIconName = RoomFactory.calcDiscomfortIconName(discomfort);
      return {temperature, humidity, discomfort, discomfortIconName};
    } catch (error) {
      return {};
    }
  }

  private static async fetchMhz19Return(): Promise<Pick<Room, "carbon">> {
    try {
      const {carbon} = await axios.get("http://localhost:8080/sensor", {params: {type: "mhz19"}}).then((response) => response.data);
      return {carbon};
    } catch (error) {
      return {};
    }
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