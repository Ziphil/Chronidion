//


export interface SystemInfo {

  readonly cpu: {load?: number, speed?: number, temperature?: number};
  readonly memory: {percentage?: number, usedSize?: number};

}


export class SystemInfoFactory {

  public static fromData(data: any): SystemInfo {
    let cpu = {
      load: data.currentLoad.currentLoad,
      speed: data.cpuCurrentSpeed.avg,
      temperature: data.cpuTemperature.main
    };
    let memory = {
      percentage: data.mem.used / data.mem.total * 100,
      usedSize: data.mem.used / (1024 * 1024 * 1024)
    };
    let info = {cpu, memory};
    return info;
  }

}