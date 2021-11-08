const { prefix } = require("../config");

const perCommand = (message) => {
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "mult") {
      if (args.length < 0) return message.reply("Please enter a number");

      if (args.length == 1) {
        const num1 = parseInt(args[0]);

        message.channel.send(`El resultado de ${num1} por 10 es: ${num1 * 10}`);
      } else if (args.length == 2) {
        const num1 = parseInt(args[0]);
        const num2 = parseInt(args[1]);

        message.channel.send(
          `El resultado de ${num1} por ${num2} es: ${num1 * num2}`
        );
      }
    }
  } else {
    return;
  }
};

module.exports = { perCommand };
