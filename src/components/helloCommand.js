const { prefix } = require("../config");

const helloCommand = async (message) => {
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "hello") {
      if (args.length === 0) {
        message.channel.send(`Hola ${message.author.username}`);
      } else {
        message.channel.send(
          `Hola ${message.author.username} Alias: ${args.join(" ")}`
        );
      }
    }
  } else {
    return;
  }
};

module.exports = { helloCommand };
