/* eslint-disable unused-imports/no-unused-imports */

import {Client} from "discord-rpc";
import {DiscordTokenManager} from "/main/util/discord";
import {CommandController} from "/main/command/controller";
import {command, commandController, query} from "/main/command/decorator";
import {CommandArg, QueryState} from "/main/command/type";


const manager = new DiscordTokenManager(process.env["DISCORD_ID"] ?? "", process.env["DISCORD_SECRET"] ?? "");
const client = new Client({transport: "ipc"});


@commandController()
export class DiscordCommandController extends CommandController {

  public setup(): void {
    this.setupEventHandlers();
  }

  @command("discord.toggleMute")
  public async toggleMute(arg: CommandArg<"discord.toggleMute">): Promise<void> {
    console.log("toggleMute");
    await this.ensureConnected();
    const settings = await client.getVoiceSettings();
    const mute = !settings.mute;
    await client.setVoiceSettings({...settings, mute});
  }

  @command("discord.toggleDeaf")
  public async toggleDeaf(arg: CommandArg<"discord.toggleDeaf">): Promise<void> {
    console.log("toggleDeaf");
    await this.ensureConnected();
    const settings = await client.getVoiceSettings();
    const deaf = !settings.deaf;
    await client.setVoiceSettings({...settings, deaf});
  }

  @command("discord.joinVoiceChannel")
  public async joinVoiceChannel(arg: CommandArg<"discord.joinVoiceChannel">): Promise<void> {
    console.log("joihdiscord.joinVoiceChannel");
    await this.ensureConnected();
    await client.selectVoiceChannel(arg.id);
  }

  @query("discord.mute")
  public async getMute(): Promise<QueryState<"discord.mute">> {
    await this.ensureConnected();
    const settings = await client.getVoiceSettings();
    return settings.mute;
  }

  @query("discord.deaf")
  public async getDeaf(): Promise<QueryState<"discord.deaf">> {
    await this.ensureConnected();
    const settings = await client.getVoiceSettings();
    return settings.deaf;
  }

  private async ensureConnected(): Promise<void> {
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