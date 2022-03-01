//


export interface SystemInfo {

  readonly cpu: {load?: number, speed?: number, temperature?: number};
  readonly memory: {percentage?: number, usedSize?: number};
  readonly network: {received?: number, transferred?: number};

}


export class SystemInfoFactory {

  public static fromData(data: any): SystemInfo {
    let networkStatsData = data["networkStats"] as Array<any>;
    let receivedBytesData = networkStatsData.map((statData) => statData["rx_sec"]);
    let transferredBytesData = networkStatsData.map((statData) => statData["tx_sec"]);
    let receivedByte = receivedBytesData.every((byteData) => byteData !== null) ? receivedBytesData.reduce((previous, current) => previous + current) : null;
    let transferredByte = transferredBytesData.every((byteData) => byteData !== null) ? transferredBytesData.reduce((previous, current) => previous + current) : null;
    let cpu = {
      load: data["currentLoad"]["currentLoad"] ?? undefined,
      speed: data["cpuCurrentSpeed"]["avg"] ?? undefined,
      temperature: data["cpuTemperature"]["main"] ?? undefined
    };
    let memory = {
      percentage: (data["mem"]["used"] !== null && data["mem"]["total"] !== null) ? data["mem"]["used"] / data["mem"]["total"] * 100 : undefined,
      usedSize: (data["mem"]["used"] !== null) ? data["mem"]["used"] / (1024 * 1024 * 1024) : undefined
    };
    let network = {
      received: (receivedByte !== null) ? Math.min(receivedByte / 125, 99999) : undefined,
      transferred: (transferredByte !== null) ? Math.min(transferredByte / 125, 99999) : undefined
    };
    let info = {cpu, memory, network};
    return info;
  }

}