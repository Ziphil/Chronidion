//

import {
  IpcRenderer
} from "electron";


declare global {

  class WindowApi {
    public send: IpcRenderer["send"];
    public on: IpcRenderer["on"];
  }

  interface Window {
    api: WindowApi;
  }

}