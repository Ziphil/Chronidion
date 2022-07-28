//

import dotenv from "dotenv";
import {
  App,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  app as electronApp,
  ipcMain,
  screen
} from "electron";
import {
  client
} from "electron-connect";
import {
  join as joinPath
} from "path";


dotenv.config({path: "./variable.env"});

const COMMON_WINDOW_OPTIONS = {
  transparent: true,
  frame: false,
  toolbar: false,
  alwaysOnTop: true,
  resizable: true,
  minimizable: true,
  maximizable: true,
  fullscreenable: true,
  autoHideMenuBar: true,
  acceptFirstMouse: true,
  useContentSize: true,
  webPreferences: {preload: joinPath(__dirname, "preload.js"), devTools: true}
};
const PRODUCTION_WINDOW_OPTIONS = {
  webPreferences: {preload: joinPath(__dirname, "preload.js"), devTools: false}
};


export class Main {

  public app: App;
  public windows: Map<number, BrowserWindow>;
  public mainWindow: BrowserWindow | undefined;
  public props: Map<number, object>;

  public constructor(app: App) {
    this.app = app;
    this.windows = new Map();
    this.mainWindow = undefined;
    this.props = new Map();
  }

  public main(): void {
    this.setupEventHandlers();
    this.setupIpc();
  }

  private setupEventHandlers(): void {
    this.app.on("ready", async () => {
      this.createMainWindow();
    });
    this.app.on("activate", () => {
      if (this.windows.size <= 0) {
        this.createMainWindow();
      }
    });
    this.app.on("window-all-closed", async () => {
      this.app.quit();
    });
  }

  private setupIpc(): void {
    ipcMain.handle("fetch-dht", async (event) => {
      if (process.env["DEBUG"] === "true") {
        const temperature = Math.random() * 15 + 25;
        const humidity = Math.random() * 100;
        return {temperature, humidity};
      } else {
        try {
          const sensor = require("node-dht-sensor").promises;
          const {temperature, humidity} = await sensor.read(22, 4);
          return {temperature, humidity};
        } catch (error) {
          throw Error("no sensor found");
        }
      }
    });
    ipcMain.on("resize", (event, id, width, height) => {
      const window = this.windows.get(id);
      if (window !== undefined) {
        window.setContentSize(width, height);
      }
    });
    ipcMain.on("maximize", (event, id, width, height) => {
      const window = this.windows.get(id);
      if (window !== undefined) {
        window.maximize();
      }
    });
    ipcMain.on("open-dev-tools", (event, id) => {
      const window = this.windows.get(id);
      if (window !== undefined) {
        window.webContents.openDevTools();
      }
    });
    ipcMain.on("move-default-position", (event, id) => {
      const window = this.windows.get(id);
      if (window !== undefined) {
        this.moveDefaultPosition(window);
      }
    });
  }

  public createWindow(mode: string, parentId: number | null, props: object, options: BrowserWindowConstructorOptions & {query?: Record<string, string>}): BrowserWindow {
    const show = false;
    const parent = (parentId !== null) ? this.windows.get(parentId) : undefined;
    const additionalOptions = (!this.app.isPackaged) ? {} : PRODUCTION_WINDOW_OPTIONS;
    const window = new BrowserWindow({...COMMON_WINDOW_OPTIONS, ...additionalOptions, show, parent, ...options});
    const id = window.webContents.id;
    const idString = id.toString();
    window.loadFile(joinPath(__dirname, "index.html"), {query: {...options.query, mode, idString}});
    window.setMenu(null);
    window.show();
    window.once("closed", () => {
      this.windows.delete(id);
    });
    this.windows.set(id, window);
    this.props.set(id, props);
    return window;
  }

  private createMainWindow(): BrowserWindow {
    const options = {width: 241, height: 128, minWidth: 241, minHeight: 128};
    const window = this.createWindow("main", null, {}, options);
    this.mainWindow = window;
    this.connectReloadClient(window);
    if (process.env["FULLSCREEN"] === "true") {
      window.maximize();
    }
    return window;
  }

  private moveDefaultPosition(window: BrowserWindow): void {
    window.setSize(241, 128);
    const displayBounds = screen.getPrimaryDisplay().bounds;
    const windowBounds = window.getBounds();
    const x = displayBounds.width - windowBounds.width - 15;
    const y = displayBounds.height - windowBounds.height - 45;
    window.setPosition(x, y);
  }

  private connectReloadClient(window: BrowserWindow): void {
    if (process.env["DEBUG"] === "true" && !this.app.isPackaged) {
      client.create(window, {}, () => {
        console.log("Reload client connected");
      });
    }
  }

}


const main = new Main(electronApp);
main.main();