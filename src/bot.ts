import { RefreshingAuthProvider } from "@twurple/auth";
import { ChatClient, ChatMessage } from "@twurple/chat";
import { parseCommand } from "./commands";
import type { Envs } from "./types/types";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

export async function startBot(envs: Envs) {
  const authProvider = new RefreshingAuthProvider({
    clientId: envs.CLIENT_ID,
    clientSecret: envs.CLIENT_SECRET,
  });
  authProvider.addUser(envs.CLIENT_ID, {
    accessToken: envs.ACCESS_TOKEN,
    refreshToken: envs.REFRESH_TOKEN,
    expiresIn: 0,
    obtainmentTimestamp: 0,
    scope: ["chat:read", "chat:edit", "user:bot", "user:read:chat", "user:write:chat"]
  }, ["chat"])

  // dependencies
  const elevenLabsClient = new ElevenLabsClient({ apiKey: envs.ELEVENLABS_API_KEY })
  const chatClient = new ChatClient({ authProvider, channels: [envs.CHANNEL_NAME] });

  chatClient.connect();
  console.log(`Listening to events for ${envs.CHANNEL_NAME}`);

  chatClient.onMessage(async (channel: string, user: string, text: string, msg: ChatMessage) => {
    if (text[0] == envs.COMMAND_PREFIX) {
      const userIsSub = msg.userInfo.isBroadcaster || msg.userInfo.isFounder || msg.userInfo.isMod || msg.userInfo.isVip || msg.userInfo.isSubscriber;

      const [command, error] = parseCommand({ commandStr: text.slice(1), isUserSub: userIsSub });

      if (!command) {
        chatClient.say(channel, error)
      } else {
        command({ chat: chatClient, elevenlabs: elevenLabsClient });
      }
    }
  })
}
