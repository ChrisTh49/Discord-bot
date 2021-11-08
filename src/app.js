const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

const { token } = require("./config");

const {
  helpCommand,
  perCommand,
  ytSearchCommand,
  helloCommand,
  musicCommand,
} = require("./components/index");

client.on("ready", () => {
  console.log(`Hello! ${client.user.tag}`);
  client.user.setStatus("dnd");
});

client.on("messageCreate", helpCommand);

client.on("messageCreate", helloCommand);

client.on("messageCreate", perCommand);

client.on("messageCreate", ytSearchCommand);

client.on("messageCreate", musicCommand);

client.login(token);
