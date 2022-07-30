//

import {
  SerialPort
} from "serialport";


export type Mhz19Return = {carbon: number};


export class Mhz19Sensor {

  private readonly port: SerialPort;

  public constructor() {
    this.port = new SerialPort({path: "/dev/serial0", baudRate: 9600});
    this.setup();
  }

  private setup(): void {
    this.port.on("close", () => {
      console.log("MHZ19 port closed");
    });
    this.port.on("error", (error) => {
      console.log("MHZ19 port error");
      console.error(error);
    });
  }

  public async read(): Promise<Mhz19Return> {
    const promise = new Promise<Mhz19Return>((resolve, reject) => {
      this.sendPacket([0xFF, 0x1, 0x86, 0x0, 0x0, 0x0, 0x0, 0x0], reject);
      this.port.once("data", (packet) => {
        const carbon = packet[2] * 0x100 + packet[3];
        resolve({carbon});
      });
    });
    return promise;
  }

  public async readDebug(): Promise<Mhz19Return> {
    const carbon = Math.random() * 800 + 400;
    return {carbon};
  }

  private sendPacket(packet: Array<number>, reject: (error: any) => void): void {
    const checksumedPacket = [...packet, this.calcChecksum(packet)];
    this.port.write(checksumedPacket, (error) => {
      console.log("MHZ19 write error");
      console.error(error);
      reject(error);
    });
  }

  private calcChecksum(packet: Array<number>): number {
    const sum = packet.reduce((previous, current) => previous + current, 0) % 0x100;
    const checksum = (0xFF - sum + 1) % 0x100;
    return checksum;
  }

}