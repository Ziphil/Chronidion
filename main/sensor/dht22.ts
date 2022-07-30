//

import type originalLibrary from "node-dht-sensor";


type Dht22Library = typeof originalLibrary;
const library = require("node-dht-sensor") as Dht22Library;

type Dht22Return = {temperature: number, humidity: number};


export class Dht22Sensor {

  private readonly pin: number;

  public constructor(pin: number) {
    this.pin = pin;
  }

  public async read(): Promise<Dht22Return> {
    const {temperature, humidity} = await library.promises.read(22, this.pin);
    return {temperature, humidity};
  }

  public async readDebug(): Promise<Dht22Return> {
    const temperature = Math.random() * 15 + 25;
    const humidity = Math.random() * 100;
    return {temperature, humidity};
  }

}