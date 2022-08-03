//

import axios from "axios";
import {
  IconName
} from "../../component/atom/icon";
import {
  makeRace
} from "../../util/timeout-promise";


export interface Room {

  readonly temperature?: number;
  readonly humidity?: number;
  readonly discomfort?: number;
  readonly discomfortIconName?: IconName;
  readonly carbon?: number;
  readonly carbonIconName?: IconName;

}


export class RoomFactory {

  public static async fetch(timeout: number): Promise<Room> {
    const [dht22Reading, mhz19Reading] = await Promise.all([RoomFactory.fetchDht22Reading(timeout), RoomFactory.fetchMhz19Reading(timeout)]);
    return {...dht22Reading, ...mhz19Reading};
  }

  private static async fetchDht22Reading(timeout: number): Promise<Pick<Room, "temperature" | "humidity" | "discomfort" | "discomfortIconName">> {
    try {
      const {temperature, humidity} = await makeRace(RoomFactory.fetchReading("dht22"), timeout);
      const discomfort = RoomFactory.calcDiscomfort(temperature, humidity);
      const discomfortIconName = RoomFactory.calcDiscomfortIconName(discomfort);
      return {temperature, humidity, discomfort, discomfortIconName};
    } catch (error) {
      return {};
    }
  }

  private static async fetchMhz19Reading(timeout: number): Promise<Pick<Room, "carbon" | "carbonIconName">> {
    try {
      const {carbon} = await makeRace(RoomFactory.fetchReading("mhz19"), timeout);
      const carbonIconName = RoomFactory.calcCarbonIconName(carbon);
      return {carbon, carbonIconName};
    } catch (error) {
      return {};
    }
  }

  private static async fetchReading(type: string): Promise<any> {
    const reading = await axios.get("http://localhost:8080/sensor", {params: {type}}).then((response) => response.data);
    return reading;
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

  private static calcCarbonIconName(carbon: number): IconName {
    if (carbon < 750) {
      return "comfort";
    } else if (carbon < 1000) {
      return "neutral";
    } else if (carbon < 1250) {
      return "discomfort";
    } else {
      return "dizzy";
    }
  }

}