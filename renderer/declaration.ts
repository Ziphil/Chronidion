//

import {IpcRenderer} from "electron";


declare global {

  class WindowApi {
    public send: IpcRenderer["send"];
    public on: IpcRenderer["on"];
    public off: IpcRenderer["off"];
    public invoke: IpcRenderer["invoke"];
  }

  interface Window {
    api: WindowApi;
  }

}