//


export abstract class Instant {

  public year: number | null = null;
  public month: number | null = null;
  public day: number | null = null;
  public weekday: number | null = null;
  public hairia: number | null = null;
  public hours: number | null = null;
  public minutes: number | null = null;
  public seconds: number | null = null;
  public prefix: string | null = null;
  public yearSeparator: string = "/";
  public monthSeparator: string = "/";
  public weekdaySeparator: string = ":";
  public hoursSeparator: string = ":";
  public minutesSeparator: string = ":";
  protected shift: boolean;

  public constructor() {
    this.shift = true;
  }

  public abstract update(): void;

  public toggleShift(): void {
    this.shift = !this.shift;
  }

}