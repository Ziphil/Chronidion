/* eslint-disable unused-imports/no-unused-imports */

import ObsWebSocket from "obs-websocket-js";
import {CommandController} from "/main/command/controller";
import {command, commandController, query} from "/main/command/decorator";
import {CommandArg, QueryState} from "/main/command/type";


const client = new ObsWebSocket();


@commandController()
export class ObsCommandController extends CommandController {

  public setup(): void {
    this.setupEventHandlers();
  }

  @command("obs.toggleMute")
  public async toggleMute(arg: CommandArg<"obs.toggleMute">): Promise<void> {
    console.log("toggleMute");
    await this.ensureConnected();
    await client.call("ToggleInputMute", {inputName: "マイク"});
  }

  @command("obs.toggleStream")
  public async toggleStream(arg: CommandArg<"obs.toggleStream">): Promise<void> {
    await this.ensureConnected();
    await client.call("ToggleStream");
  }

  @command("obs.toggleRecord")
  public async toggleRecord(arg: CommandArg<"obs.toggleRecord">): Promise<void> {
    await this.ensureConnected();
    await client.call("ToggleRecord");
  }

  @command("obs.toggleVirtualCam")
  public async toggleVirtualCam(arg: CommandArg<"obs.toggleVirtualCam">): Promise<void> {
    await this.ensureConnected();
    await client.call("ToggleVirtualCam");
  }

  @command("obs.refreshBrowserSource")
  public async refreshBrowserSource(arg: CommandArg<"obs.refreshBrowserSource">): Promise<void> {
    await this.ensureConnected();
    await client.call("PressInputPropertiesButton", {inputName: "チャット", propertyName: "refreshnocache"});
  }

  @query("obs.mute")
  public async getMute(): Promise<QueryState<"obs.mute">> {
    await this.ensureConnected();
    const data = await client.call("GetInputMute", {inputName: "マイク"});
    return data.inputMuted;
  }

  @query("obs.stream")
  public async getStream(): Promise<QueryState<"obs.stream">> {
    await this.ensureConnected();
    const data = await client.call("GetStreamStatus");
    return data.outputActive;
  }

  @query("obs.record")
  public async getRecord(): Promise<QueryState<"obs.record">> {
    await this.ensureConnected();
    const data = await client.call("GetRecordStatus");
    return data.outputActive;
  }

  @query("obs.virtualCam")
  public async getVirtualCam(): Promise<QueryState<"obs.virtualCam">> {
    await this.ensureConnected();
    const data = await client.call("GetVirtualCamStatus");
    return data.outputActive;
  }

  private async ensureConnected(): Promise<void> {
    try {
      await client.reidentify({});
    } catch (error) {
      await client.connect(process.env["OBS_URL"] ?? "", process.env["OBS_SECRET"] ?? "");
    }
  }

  private setupEventHandlers(): void {
    client.on("StreamStateChanged", (data) => {
      this.sendQueryStateChanged("obs.stream", data.outputActive);
    });
    client.on("RecordStateChanged", (data) => {
      this.sendQueryStateChanged("obs.record", data.outputActive);
    });
    client.on("VirtualcamStateChanged", (data) => {
      this.sendQueryStateChanged("obs.virtualCam", data.outputActive);
    });
    client.on("InputMuteStateChanged", (data) => {
      if (data.inputName === "マイク") {
        this.sendQueryStateChanged("obs.mute", data.inputMuted);
      }
    });
  }

}