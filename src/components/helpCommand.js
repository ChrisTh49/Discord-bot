const { MessageEmbed } = require("discord.js");
const { prefix } = require("../config");

const helpCommand = async (message) => {
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "help") {
      let embed = new MessageEmbed()
        .setColor("#3E065F")
        .setTitle("Cuáles son los comandos existentes?").setDescription(`
        - /help: Muestra esta lista de comandos.

        - /hello: Saluda al usuario que lo ejecuta.

        - /mult: Hace una multiplicacion sencilla y puede recibir un máximo de 2 números.
        
        - /ytsearch: Busca en YouTube un video y te muestra el primer resultado.
        `);

      await message.channel.send({ embeds: [embed] });
    }
  } else {
    return;
  }
};

module.exports = { helpCommand };
