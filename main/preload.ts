//

import {
  contextBridge,
  ipcRenderer
} from "electron";


let send = ipcRenderer.send.bind(ipcRenderer);
let on = ipcRenderer.on.bind(ipcRenderer);

contextBridge.exposeInMainWorld("api", {send, on});