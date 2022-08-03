//

import type originalLibrary from "node-dht-sensor";
import {
  Sensor
} from "./sensor";


export class Dht22Sensor implements Sensor<Dht22Reading> {

  private readonly library: Dht22Library;
  private readonly pin: number;

  public constructor(library: Dht22Library, pin: number) {
    this.library = library;
    this.pin = pin;
  }

  public static create(pin: number): Dht22Sensor | undefined {
    const library = getLibrary();
    const sensor = (library !== undefined) ? new Dht22Sensor(library, pin) : undefined;
    return sensor;
  }

  public async read(): Promise<Dht22Reading> {
    const {temperature, humidity} = await this.library.promises.read(22, this.pin);
    return {temperature, humidity};
  }

  public async readDebug(): Promise<Dht22Reading> {
    const temperature = Math.random() * 15 + 25;
    const humidity = Math.random() * 100;
    return {temperature, humidity};
  }

}


export type Dht22Reading = {temperature: number, humidity: number};
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