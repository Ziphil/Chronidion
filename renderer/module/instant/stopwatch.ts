//

import {
  FloorMath
} from "../floor-math";
import {
  Instant
} from "./instant";


export class StopwatchInstant extends Instant {

  private lastDate: Date | null = null;
  private offset: number = 0;

  public constructor() {
    super();
    this.prefix = "Stopwatch";
  }

  public update(): void {
    let date = new Date();
    let duration = ((this.lastDate !== null) ? date.getTime() - this.lastDate.getTime() : 0) + this.offset;
    this.year = null;
    this.month = null;
    this.day = null;
    this.hairia = null;
    if (this.shift) {
      this.hours = FloorMath.div(FloorMath.mod(duration, 360000000), 3600000);
      this.minutes = FloorMath.div(FloorMath.mod(duration, 3600000), 60000);
      this.seconds = FloorMath.div(FloorMath.mod(duration, 60000), 1000);
      this.minutesSeparator = ":";
    } else {
      this.hours = FloorMath.div(FloorMath.mod(duration, 3600000), 60000);
      this.minutes = FloorMath.div(FloorMath.mod(duration, 60000), 1000);
      this.seconds = FloorMath.div(FloorMath.mod(duration, 1000), 10);
      this.minutesSeparator = ".";
    }
  }

  public start(): void {
    let date = new Date();
    this.lastDate = date;
  }

  public stop(): void {
    let date = new Date();
    this.offset += (this.lastDate !== null) ? date.getTime() - this.lastDate.getTime() : 0;
    this.lastDate = null;
  }

  public startOrStop(): void {
    if (this.lastDate === null) {
      this.start();
    } else {
      this.stop();
    }
  }

  public reset(): void {
    this.lastDate = null;
    this.offset = 0;
  }

  public addOffset(amount: number): void {
    this.offset += amount;
  }

}