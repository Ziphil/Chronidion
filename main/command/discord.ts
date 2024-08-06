//

import {Client} from "discord-rpc";


const rpc = new Client({transport: "ipc"});

const clientId = "";
const accessToken = "";

rpc.login({clientId, accessToken, scopes: ["rpc", "rpc.api", "identify"]}).catch(console.error);

async function toggleMute(): Promise<void> {
  console.log("toggleMute");
  const settings = await rpc.getVoiceSettings();
  await rpc.setVoiceSettings({...settings, mute: !settings.mute});
}

export default {
  toggleMute
};