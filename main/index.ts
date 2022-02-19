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


const COMMON_WINDOW_OPTIONS = {
  resizable: true,
  fullscreenable: false,
  autoHideMenuBar: true,
  acceptFirstMouse: true,
  useContentSize: true,
  spellcheck: false,
  title: "Clock",
  backgroundColor: "#F5F8FA",
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
    ipcMain.on("resize", (event, id, width, height) => {
      let window = this.windows.get(id);
      if (window !== undefined) {
        window.setContentSize(width, height);
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
    let options = {width: 720, height: 720, minWidth: 640, minHeight: 480};
    let window = this.createWindow("main", null, {}, options);
    this.mainWindow = window;
    this.connectReloadClient(window);
    return window;
  }

  private moveDefaultPosition(window: BrowserWindow): void {
    let displayBounds = screen.getPrimaryDisplay().bounds;
    let windowBounds = window.getBounds();
    let x = displayBounds.width - windowBounds.width - 15;
    let y = displayBounds.height - windowBounds.height - 40;
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