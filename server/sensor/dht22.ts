//

import type originalLibrary from "node-dht-sensor";
import {
  Sensor
} from "./sensor";


export class Dht22Sensor implements Sensor<Dht22Return> {

  private readonly library?: Dht22Library;
  private readonly pin: number;

  public constructor(pin: number) {
    this.library = getLibrary();
    this.pin = pin;
  }

  public async read(): Promise<Dht22Return> {
    if (this.library) {
      const {temperature, humidity} = await this.library.promises.read(22, this.pin);
      return {temperature, humidity};
    } else {
      throw new Error("DHT22: library not found");
    }
  }

  public async readDebug(): Promise<Dht22Return> {
    const temperature = Math.random() * 15 + 25;
    const humidity = Math.random() * 100;
    return {temperature, humidity};
  }

}


export type Dht22Return = {temperature: number, humidity: number};
type Dht22Library = typeof originalLibrary;

function getLibrary(): Dht22Library | undefined {
  try {
    return require("node-dht-sensor");
  } catch (error) {
    console.log("DHT22: library not loaded");
    console.error(error);
    return undefined;
  }
}