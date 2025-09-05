import type { CommandArgs } from "../types";

export function discordCommand({ chat, elevenlabs, value }: CommandArgs) {
  chat.say("okzmo", value);
}
