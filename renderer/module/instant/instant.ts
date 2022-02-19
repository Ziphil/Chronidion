//


export interface Instant {

  year: number | null;
  month: number | null;
  day: number | null;
  hairia: number | null;
  hours: number | null;
  minutes: number | null;
  seconds: number | null;
  prefix: string | null;

  update(): void;

}