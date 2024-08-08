//

import {contextBridge, ipcRenderer} from "electron";


const send = ipcRenderer.send.bind(ipcRenderer);
const on = ipcRenderer.on.bind(ipcRenderer);
const off = ipcRenderer.off.bind(ipcRenderer);
const invoke = ipcRenderer.invoke.bind(ipcRenderer);

contextBridge.exposeInMainWorld("api", {send, on, off, invoke});