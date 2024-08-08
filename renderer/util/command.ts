//

import type {CommandArg, CommandName} from "/main/command/type";


export async function execCommand<N extends CommandName>(name: N, arg: CommandArg<N>): Promise<void> {
  await window.api.invoke(`command:${name}`, arg);
}