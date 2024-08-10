/* eslint-disable unused-imports/no-unused-imports */

import {CommandController} from "/main/command/controller";
import {command, commandController, query} from "/main/command/decorator";
import {CommandArg} from "/main/command/type";
import {shell} from "electron";
import pathUtil from "path";


@commandController()
export class LaunchCommandController extends CommandController {

  public setup(): void {
  }

  @command("launch.launch")
  public async launch(arg: CommandArg<"launch.launch">): Promise<void> {
    const dirPath = pathUtil.dirname(arg.path);
    await shell.openExternal(arg.path, {workingDirectory: dirPath});
  }

  @command("launch.openFile")
  public async openFile(arg: CommandArg<"launch.openFile">): Promise<void> {
    await shell.openPath(arg.path);
  }

}