//


export class SystemInfo {

  public readonly cpu!: {load?: number, speed?: number, temperature?: number};
  public readonly memory!: {usedSize?: number, ratio?: number};

  private constructor(object: any) {
    Object.assign(this, object);
  }

  public static fromData(data: any): SystemInfo {
    let cpu = {
      load: data.currentLoad.currentLoad,
      speed: data.cpuCurrentSpeed.avg,
      temperature: data.cpuTemperature.main
    };
    let memory = {
      usedSize: data.mem.used / (1024 * 1024 * 1024),
      ratio: data.mem.used / data.mem.total * 100
    };
    let info = new SystemInfo({cpu, memory});
    return info;
  }

}