//

import {GregorianDate} from "talqis";
import {FloorMath} from "/renderer/util/floor-math";
import {Instant} from "/renderer/model/instant/instant";


export class GregorianInstant extends Instant {

  public constructor() {
    super();
  }

  public update(): void {
    const date = GregorianDate.current();
    const shift = this.shift;
    this.year = date.getYear(shift) % 100;
    this.month = date.getMonth(shift);
    this.day = date.getDate(shift);
    this.weekday = FloorMath.mod(date.getHairia(shift) - 1, 7) + 1;
    this.hairia = date.getHairia(shift);
    this.hours = date.getHours(shift);
    this.minutes = date.getMinutes(shift);
    this.seconds = date.getSeconds(shift);
  }

}