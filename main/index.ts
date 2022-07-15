//

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
import {
  get as getSystemInfo
} from "systeminformation";


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
    ipcMain.handle("get-system-info", async (event, configs) => {
      let data = await getSystemInfo(configs);
      return data;
    });
    ipcMain.on("resize", (event, id, width, height) => {
      let window = this.windows.get(id);
      if (window !== undefined) {
        window.setContentSize(width, height);
      }
    });
    ipcMain.on("maximize", (event, id, width, height) => {
      let window = this.windows.get(id);
      if (window !== undefined) {
        window.maximize();
      }
    });
    ipcMain.on("open-dev-tools", (event, id) => {
      let window = this.windows.get(id);
      if (window !== undefined) {
        window.webContents.openDevTools();
      }
    });
    ipcMain.on("move-default-position", (event, id) => {
      let window = this.windows.get(id);
      if (window !== undefined) {
        this.moveDefaultPosition(window);
      }
    });
  }

  public createWindow(mode: string, parentId: number | null, props: object, options: BrowserWindowConstructorOptions & {query?: Record<string, string>}): BrowserWindow {
    let show = false;
    let parent = (parentId !== null) ? this.windows.get(parentId) : undefined;
    let additionalOptions = (!this.app.isPackaged) ? {} : PRODUCTION_WINDOW_OPTIONS;
    let window = new BrowserWindow({...COMMON_WINDOW_OPTIONS, ...additionalOptions, show, parent, ...options});
    let id = window.webContents.id;
    let idString = id.toString();
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
    let options = {width: 241, height: 98, minWidth: 241, minHeight: 98};
    let window = this.createWindow("main", null, {}, options);
    this.mainWindow = window;
    this.connectReloadClient(window);
    return window;
  }

  private moveDefaultPosition(window: BrowserWindow): void {
    window.setSize(241, 95);
    let displayBounds = screen.getPrimaryDisplay().bounds;
    let windowBounds = window.getBounds();
    let x = displayBounds.width - windowBounds.width - 15;
    let y = displayBounds.height - windowBounds.height - 45;
    window.setPosition(x, y);
  }

  private connectReloadClient(window: BrowserWindow): void {
    if (!this.app.isPackaged) {
      client.create(window, {}, () => {
        console.log("Reload client connected");
      });
    }
  }

}


let main = new Main(electronApp);
main.main();