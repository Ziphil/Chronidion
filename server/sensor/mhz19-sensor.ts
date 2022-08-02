//

import type originalLibrary from "serialport";
import type {
  SerialPort
} from "serialport";
import {
  Sensor
} from "./sensor";


export class Mhz19Sensor implements Sensor<Mhz19Reading> {

  private readonly port?: SerialPort;
  private resolve: ((reading: Mhz19Reading) => void) | null = null;
  private reject: ((error: unknown) => void) | null = null;

  public constructor(path: string) {
    const library = getLibrary();
    if (library !== undefined) {
      const SerialPort = library["SerialPort"];
      this.port = new SerialPort({path, baudRate: 9600});
      this.setup();
    }
  }

  private setup(): void {
    if (this.port) {
      this.port.on("close", () => {
        console.log("MHZ19: port closed");
      });
      this.port.on("error", (error) => {
        this.reject?.(error);
        this.reject = null;
        console.log("MHZ19: port error");
        console.error(error);
      });
      this.port.on("data", (packet) => {
        const copiedPacket = [...packet];
        if (copiedPacket.length >= 9) {
          const carbon = copiedPacket[2] * 0x100 + copiedPacket[3];
          this.resolve?.({carbon});
          this.resolve = null;
        }
      });
    }
  }

  public read(): Promise<Mhz19Reading> {
    if (this.port) {
      const promise = new Promise<Mhz19Reading>((resolve, reject) => {
        try {
          this.sendPacket([0xFF, 0x1, 0x86, 0x0, 0x0, 0x0, 0x0, 0x0]);
          this.resolve = resolve;
          this.reject = reject;
        } catch (error) {
          reject(error);
        }
      });
      return promise;
    } else {
      throw new Error("MHZ19: library not found");
    }
  }

  public async readDebug(): Promise<Mhz19Reading> {
    const carbon = Math.random() * 800 + 400;
    return {carbon};
  }

  private sendPacket(packet: Array<number>): void {
    if (this.port) {
      const checksumedPacket = [...packet, Mhz19Sensor.calcChecksum(packet)];
      this.port.write(checksumedPacket, (error) => {
        if (error) {
          this.reject?.(error);
          this.reject = null;
          console.log("MHZ19: write error");
          console.error(error);
        }
      });
    }
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