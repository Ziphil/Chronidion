//

import {
  contextBridge,
  ipcRenderer
} from "electron";


let send = ipcRenderer.send.bind(ipcRenderer);
let on = ipcRenderer.on.bind(ipcRenderer);
let invoke = ipcRenderer.invoke.bind(ipcRenderer);

contextBridge.exposeInMainWorld("api", {send, on, invoke});