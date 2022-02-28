//


export interface SystemInfo {

  readonly cpu: {load?: number, speed?: number, temperature?: number};
  readonly memory: {percentage?: number, usedSize?: number};
  readonly network: {received?: number, transferred?: number};

}


export class SystemInfoFactory {

  public static fromData(data: any): SystemInfo {
    let cpu = {
      load: data["currentLoad"]["currentLoad"],
      speed: data["cpuCurrentSpeed"]["avg"],
      temperature: data["cpuTemperature"]["main"]
    };
    let memory = {
      percentage: data["mem"]["used"] / data["mem"]["total"] * 100,
      usedSize: data["mem"]["used"] / (1024 * 1024 * 1024)
    };
    let network = {
      received: data["networkStats"][0]["rx_sec"] * 8 / (1000 * 1),
      transferred: data["networkStats"][0]["tx_sec"] * 8 / (1000 * 1)
    };
    let info = {cpu, memory, network};
    return info;
  }

}