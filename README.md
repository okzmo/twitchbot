# bot-twitch

The goal was to make it from scratch and make my own API around Twith's Api but oh lord it made no sense so I used [twurple](https://twurple.js.org/).

You can fork it if you want and simply add commands in the `commands/` folder, it should be pretty straight forward since I did the """heavy""" work with a bit of dependency injection to easily use the twitch api in your command.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun start
```

PS: I'm using 11Labs to make a funny voice command for subs where they can make persona say whatever they want, if you want that put your apikey in your `.env` as `ELEVENLABS_API_KEY=`.
