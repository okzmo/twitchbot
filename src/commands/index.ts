import { voiceCommand } from "./voice";
import type { Command, Dependencies } from "../types/types";
import { discordCommand } from "./discord";

const SUB_ONLY_CMDS = ["say"];

export function parseCommand({ commandStr, isUserSub }: { commandStr: string, isUserSub: boolean }): [Command | null, string] {
  const [command, ...rest] = commandStr.split(" ");
  let commandFn = null;

  if (SUB_ONLY_CMDS.includes(command) && !isUserSub) {
    return [null, "This command is sub only sorry :c"];
  }

  switch (command) {
    case "say":
      commandFn = voiceCommand;
      break;
    case "discord":
      commandFn = discordCommand;
      break;
  }

  if (commandFn) return [(dependencies: Dependencies) => commandFn({ ...dependencies, value: rest.join(" ") }), ""];

  return [null, "This command doesn't ring a bell sorry :c"];
}
