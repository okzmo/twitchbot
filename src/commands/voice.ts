import type { CommandArgs } from "../types/types";
import { generateRandomID } from "../utils/ids";

const QUEUE: string[] = [];
let isProcessing = false;

const voices: Record<string, string> = {
  french_lady: "t8BrjWUT5Z23DLLBzbuY",
}

export async function voiceCommand({ elevenlabs, value }: CommandArgs) {
  const [voice, ...sentence] = value.split(' ');
  const fullSentence = sentence.join(" ");

  if (!voice || voice === "") return;
  if (!fullSentence || fullSentence === "") return;

  const audio = await elevenlabs.textToSpeech.convert(voices[voice], {
    text: fullSentence,
    modelId: 'eleven_multilingual_v2',
    outputFormat: 'mp3_44100_128'
  });


  const chunks = [];
  const reader = audio.getReader()

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value)
    }
  } finally {
    reader.releaseLock()
  }

  const audioBuffer = Buffer.concat(chunks.map(chunk => Buffer.from(chunk)));

  const randomID = generateRandomID();
  await Bun.write(`${generateRandomID()}.mp3`, audioBuffer);

  QUEUE.push(randomID.toString());
  if (!isProcessing) consumeQueue();
}

async function consumeQueue() {
  if (isProcessing) return;
  isProcessing = true;

  try {
    while (QUEUE.length > 0) {
      const voiceMessageID = QUEUE.shift();
      await Bun.$`mpv --audio-device=alsa --no-cache --no-terminal --volume=35 ${voiceMessageID}.mp3`;
      await Bun.file(`${voiceMessageID}.mp3`).delete();
    }
  } finally {
    isProcessing = false
  }
}
