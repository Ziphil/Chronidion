//


export interface Room {

  readonly temperature: number;
  readonly humidity: number;
  readonly disconfort: number;

}


export class RoomFactory {

  public static async fetch(): Promise<Room> {
    const temperature = Math.random() * 50 - 10;
    const humidity = Math.random() * 100;
    const disconfort = RoomFactory.calcDisconfort(temperature, humidity);
    return {temperature, humidity, disconfort};
  }

  private static calcDisconfort(temperature: number, humidity: number): number {
    return 0.81 * temperature + 0.01 * humidity * (0.99 * temperature - 14.3) + 46.3;
  }

}