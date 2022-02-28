//

import {
  NewHairianDate
} from "talqis";
import {
  Instant
} from "./instant";


export class HairianInstant extends Instant {

  public constructor() {
    super();
  }

  public update(): void {
    let date = NewHairianDate.current();
    let shift = this.shift;
    this.year = date.getYear(shift) % 100;
    this.month = date.getMonth(shift);
    this.day = date.getDate(shift);
    this.hairia = date.getHairia(shift);
    this.hours = date.getHours(shift);
    this.minutes = date.getMinutes(shift);
    this.seconds = date.getSeconds(shift);
  }

}