/* eslint-disable unused-imports/no-unused-imports */

import {Client} from "discord-rpc";
import {DiscordTokenManager} from "/main/util/discord";
import {CommandController} from "/main/command/controller";
import {command, commandController, query} from "/main/command/decorator";


const manager = new DiscordTokenManager(process.env["DISCORD_ID"] ?? "", process.env["DISCORD_SECRET"] ?? "");
const client = new Client({transport: "ipc"});


@commandController()
export class DiscordCommandController extends CommandController {

  public setup(): void {
    this.setupEventHandlers();
  }

  @command("discord.toggleMute")
  public async toggleMute(arg: {}): Promise<void> {
    console.log("toggleMute");
    await this.ensureLogin();
    const settings = await client.getVoiceSettings();
    const mute = !settings.mute;
    await client.setVoiceSettings({...settings, mute});
  }

  @command("discord.toggleDeaf")
  public async toggleDeaf(arg: {}): Promise<void> {
    console.log("toggleDeaf");
    await this.ensureLogin();
    const settings = await client.getVoiceSettings();
    const deaf = !settings.deaf;
    await client.setVoiceSettings({...settings, deaf});
  }

  @query("discord.mute")
  public async getMute(): Promise<boolean> {
    await this.ensureLogin();
    const settings = await client.getVoiceSettings();
    return settings.mute;
  }

  @query("discord.deaf")
  public async getDeaf(): Promise<boolean> {
    await this.ensureLogin();
    const settings = await client.getVoiceSettings();
    return settings.deaf;
  }

  private async ensureLogin(): Promise<void> {
    if (!client.user) {
      const clientId = manager.clientId;
      const accessToken = await manager.getAccessToken();
      await client.login({clientId, accessToken, scopes: ["rpc", "rpc.api", "identify"]});
      await client.subscribe("VOICE_SETTINGS_UPDATE", {});
    }
  }

  private setupEventHandlers(): void {
    client.on("VOICE_SETTINGS_UPDATE", (event) => {
      const mute = event["mute"];
      const deaf = event["deaf"];
      this.sendQueryStateChanged("discord.mute", mute);
      this.sendQueryStateChanged("discord.deaf", deaf);
    });
  }

}