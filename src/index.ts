import { startBot } from "./bot";
import type { Envs } from "./types";

function setupEnvs(): Envs {
  const CHANNEL_NAME = process.env.TWITCH_CHANNEL;
  const BOT_ID = process.env.TWITCH_BOT_ID;
  const COMMAND_PREFIX = process.env.TWITCH_COMMAND_PREFIX;

  const ACCESS_TOKEN = process.env.TWITCH_ACCESS_TOKEN;
  const REFRESH_TOKEN = process.env.TWITCH_REFRESH_TOKEN;
  const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
  const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

  if (!ACCESS_TOKEN) throw new Error("Missing access token");
  if (!REFRESH_TOKEN) throw new Error("Missing refresh token");
  if (!CLIENT_ID) throw new Error("Missing client ID");
  if (!CLIENT_SECRET) throw new Error("Missing client secret");
  if (!COMMAND_PREFIX) throw new Error("Missing command prefix");
  if (!BOT_ID) throw new Error("Missing bot id");
  if (!CHANNEL_NAME) throw new Error("Missing channel name");
  if (!ELEVENLABS_API_KEY) throw new Error("Missing 11Labs api key");

  const envs = {
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    CLIENT_ID,
    CLIENT_SECRET,
    COMMAND_PREFIX,
    BOT_ID,
    CHANNEL_NAME,
    ELEVENLABS_API_KEY
  }

  return envs;
}

function main() {
  const envs = setupEnvs()
  return startBot(envs);
}

main();
