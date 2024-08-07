//

import {Client} from "discord-rpc";
import {DiscordTokenManager} from "/main/util/discord";


const manager = new DiscordTokenManager(process.env["DISCORD_ID"] ?? "", process.env["DISCORD_SECRET"] ?? "");
const rpc = new Client({transport: "ipc"});

async function toggleMute(): Promise<void> {
  console.log("toggleMute");
  if (!rpc.user) {
    const clientId = manager.clientId;
    const accessToken = await manager.getAccessToken();
    await rpc.login({clientId, accessToken, scopes: ["rpc", "rpc.api", "identify"]});
  }
  const settings = await rpc.getVoiceSettings();
  await rpc.setVoiceSettings({...settings, mute: !settings.mute});
}

export default {
  toggleMute
};