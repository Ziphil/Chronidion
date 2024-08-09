//

import {ipcMain} from "electron";
import type {CommandController} from "/main/command/controller";
import type {CommandArg, CommandName, QueryName, QueryState} from "/main/command/type";


type CommandHandlerSpec = {
  key: string | symbol,
  name: string
};
type QueryHandlerSpec = {
  key: string | symbol,
  name: string
};

type CommandHandler<N extends CommandName> = (this: CommandController, arg: CommandArg<N>) => Promise<void>;
type CommandHandlerDecorator<N extends CommandName> = (target: CommandHandler<N>, context: ClassMethodDecoratorContext<CommandController, CommandHandler<N>>) => void;

type QueryHandler<N extends QueryName> = (this: CommandController) => Promise<QueryState<N>>;
type QueryHandlerDecorator<N extends QueryName> = (target: QueryHandler<N>, context: ClassMethodDecoratorContext<CommandController, QueryHandler<N>>) => void;

(Symbol as any).metadata ??= Symbol("Symbol.metadata");

export function commandController(): (target: typeof CommandController, context: ClassDecoratorContext<typeof CommandController>) => void {
  const decorator = function (target: typeof CommandController, context: ClassDecoratorContext<typeof CommandController>): void {
    const originalSetup = target.prototype.setup;
    target.prototype.setup = function (this: CommandController): void {
      const metadata = target[Symbol.metadata];
      const commands = metadata?.["command"] as Array<CommandHandlerSpec> ?? [];
      const queries = metadata?.["query"] as Array<QueryHandlerSpec> ?? [];
      for (const {key, name} of commands) {
        ipcMain.handle(`command:${name}`, (event, ...args) => (this as any)[key](...args));
      }
      for (const {key, name} of queries) {
        ipcMain.handle(`query:${name}`, (event, ...args) => (this as any)[key](...args));
      }
      originalSetup.call(this);
    };
  };
  return decorator;
}

export function command<N extends CommandName>(name: N): CommandHandlerDecorator<N> {
  const decorator = function (target: CommandHandler<N>, context: ClassMethodDecoratorContext<CommandController, CommandHandler<N>>): void {
    const metadata = context.metadata["command"] as Array<CommandHandlerSpec> ?? [];
    metadata.push({key: context.name, name});
    context.metadata["command"] = metadata;
    console.log(context.metadata);
  };
  return decorator;
}

export function query<N extends QueryName>(name: N): QueryHandlerDecorator<N> {
  const decorator = function (target: QueryHandler<N>, context: ClassMethodDecoratorContext<CommandController, QueryHandler<N>>): void {
    const metadata = context.metadata["query"] as Array<QueryHandlerSpec> ?? [];
    metadata.push({key: context.name, name});
    context.metadata["query"] = metadata;
    console.log(context.metadata);
  };
  return decorator;
}