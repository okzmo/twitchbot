import type { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import type { ChatClient } from "@twurple/chat";

export interface Envs {
  ELEVENLABS_API_KEY: string;
  ACCESS_TOKEN: string;
  REFRESH_TOKEN: string;
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  COMMAND_PREFIX: string
  BOT_ID: string;
  CHANNEL_NAME: string;
}

export interface Dependencies {
  chat: ChatClient;
  elevenlabs: ElevenLabsClient;
}

export interface CommandArgs extends Dependencies {
  value: string
}

export type Command = (dependencies: Dependencies) => void;
