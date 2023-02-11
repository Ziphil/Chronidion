//


export interface Sensor<R> {

  read(): Promise<R>;

  /** デバッグ用にランダムなデータを返します。*/
  readDebug(): Promise<R>;

}