//

import {Client} from "discord-rpc";
import {DiscordTokenManager} from "/main/util/discord";
import {BrowserWindow, ipcMain} from "electron";
import type {QueryName, QueryState} from "/main/command/type";


const manager = new DiscordTokenManager(process.env["DISCORD_ID"] ?? "", process.env["DISCORD_SECRET"] ?? "");
const client = new Client({transport: "ipc"});


export class DiscordCommandController {

  private readonly mainWindow: BrowserWindow;

  public constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
    this.setupEventHandlers();
  }

  public setup(): void {
    ipcMain.handle("command:discord.toggleMute", (event, ...args) => (this.toggleMute as any)(...args));
    ipcMain.handle("command:discord.toggleDeaf", (event, ...args) => (this.toggleDeaf as any)(...args));
    ipcMain.handle("query:discord.mute", (event, ...args) => (this.getMute as any)(...args));
    ipcMain.handle("query:discord.deaf", (event, ...args) => (this.getDeaf as any)(...args));
  }

  public async toggleMute(arg: {}): Promise<void> {
    console.log("toggleMute");
    await this.ensureLogin();
    const settings = await client.getVoiceSettings();
    const mute = !settings.mute;
    await client.setVoiceSettings({...settings, mute});
  }

  public async toggleDeaf(arg: {}): Promise<void> {
    console.log("toggleDeaf");
    await this.ensureLogin();
    const settings = await client.getVoiceSettings();
    const deaf = !settings.deaf;
    await client.setVoiceSettings({...settings, deaf});
  }

  public async getMute(): Promise<boolean> {
    await this.ensureLogin();
    const settings = await client.getVoiceSettings();
    return settings.mute;
  }

  public async getDeaf(): Promise<boolean> {
    await this.ensureLogin();
    const settings = await client.getVoiceSettings();
    return settings.deaf;
  }

  public async ensureLogin(): Promise<void> {
    if (!client.user) {
      const clientId = manager.clientId;
      const accessToken = await manager.getAccessToken();
      await client.login({clientId, accessToken, scopes: ["rpc", "rpc.api", "identify"]});
      await client.subscribe("VOICE_SETTINGS_UPDATE", {});
    }
  }

  private setupEventHandlers(): void {
    client.on("VOICE_SETTINGS_UPDATE", (event) => {
      console.log("VOICE_SETTINGS_UPDATE");
      const mute = event["mute"];
      const deaf = event["deaf"];
      this.sendQueryStateChanged("discord.mute", mute);
      this.sendQueryStateChanged("discord.deaf", deaf);
    });
  }

  protected sendQueryStateChanged<N extends QueryName>(name: N, state: QueryState<N>): void {
    this.mainWindow.webContents.send(`query:${name}`, state);
  }

}