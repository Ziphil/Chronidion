//

import type originalLibrary from "serialport";
import {
  ByteLengthParser,
  SerialPort
} from "serialport";
import {
  Sensor
} from "./sensor";


export class Mhz19Sensor implements Sensor<Mhz19Reading> {

  private readonly port: SerialPort;
  private readonly parser: ByteLengthParser;

  private constructor(library: Mhz19Library, path: string) {
    const SerialPort = library["SerialPort"];
    this.port = new SerialPort({path, baudRate: 9600});
    this.parser = this.port.pipe(new ByteLengthParser({length: 9}));
    this.setup();
  }

  public static create(path: string): Mhz19Sensor | undefined {
    const library = getLibrary();
    const sensor = (library !== undefined) ? new Mhz19Sensor(library, path) : undefined;
    return sensor;
  }

  private setup(): void {
    this.port.on("close", () => {
      console.log("MHZ19: port closed");
    });
    this.port.on("error", (error) => {
      console.log("MHZ19: port error");
      console.error(error);
    });
  }

  public read(): Promise<Mhz19Reading> {
    const promise = new Promise<Mhz19Reading>((resolve, reject) => {
      try {
        this.sendPacket([0xFF, 0x1, 0x86, 0x0, 0x0, 0x0, 0x0, 0x0], reject);
        this.parser.once("data", (packet) => {
          const copiedPacket = [...packet];
          const carbon = copiedPacket[2] * 0x100 + copiedPacket[3];
          resolve({carbon});
        });
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  }

  public async readDebug(): Promise<Mhz19Reading> {
    const carbon = Math.random() * 800 + 400;
    return {carbon};
  }

  private sendPacket(packet: Array<number>, reject: (error: unknown) => void): void {
    const checksumedPacket = [...packet, Mhz19Sensor.calcChecksum(packet)];
    this.port.write(checksumedPacket, (error) => {
      if (error) {
        reject(error);
        console.log("MHZ19: write error");
        console.error(error);
      }
    });
  }

  private static calcChecksum(packet: Array<number>): number {
    const sum = packet.slice(1).reduce((previous, current) => previous + current, 0) % 0x100;
    const checksum = (0xFF - sum + 1) % 0x100;
    return checksum;
  }

}


export type Mhz19Reading = {carbon: number};
type Mhz19Library = typeof originalLibrary;

function getLibrary(): Mhz19Library | undefined {
  try {
    return require("serialport");
  } catch (error) {
    console.log("MHZ19: library not loaded");
    console.error(error);
    return undefined;
  }
}