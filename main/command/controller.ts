//

import {BrowserWindow} from "electron";
import type {QueryName, QueryState} from "/main/command/type";


export class CommandController {

  private readonly mainWindow: BrowserWindow;

  public constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  public setup(): void {
  }

  protected sendQueryStateChanged<N extends QueryName>(name: N, state: QueryState<N>): void {
    this.mainWindow.webContents.send(`query:${name}`, state);
  }

  public static use(this: new(mainWindow: BrowserWindow) => CommandController, mainWindow: BrowserWindow): void {
    const controller = new this(mainWindow);
    controller.setup();
  }

}