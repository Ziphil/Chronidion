//

import {
  NewHairianDate
} from "talqis";
import {
  Instant
} from "./instant";


export class HairianInstant implements Instant {

  public year: number = 1;
  public month: number = 1;
  public day: number = 1;
  public hairia: number = 1;
  public hours: number = 0;
  public minutes: number = 0;
  public seconds: number = 0;
  public prefix: null = null;
  private shift: boolean;

  public constructor() {
    this.shift = true;
  }

  public update(): void {
    let date = NewHairianDate.current();
    let shift = this.shift;
    this.year = date.getYear(shift);
    this.month = date.getMonth(shift);
    this.day = date.getDate(shift);
    this.hairia = date.getHairia(shift);
    this.hours = date.getHours(shift);
    this.minutes = date.getMinutes(shift);
    this.seconds = date.getSeconds(shift);
  }

  public setShift(shift: boolean): void {
    this.shift = shift;
  }

}