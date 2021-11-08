const Discord = require("discord.js");
const { prefix, youtubeKey } = require("../config");
const search = require("youtube-search");

const ytSearchCommand = async (message) => {
  var opts = {
    maxResults: 5,
    key: youtubeKey,
    type: "video",
  };

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "ytsearch") {
      if (args.length >= 1) {
        const query = args.join(" ");

        let searchResults = await search(query, opts);
        let result = searchResults.results[0];

        if (result != undefined) {
          let embedResult = new Discord.MessageEmbed()
            .setColor("#17D7A0")
            .setTitle(result.title)
            .setDescription(result.description)
            .setImage(result.thumbnails.high.url)
            .setURL(result.link);

          message.channel.send({ embeds: [embedResult] });
        } else {
          let embedResult = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Error!")
            .setDescription(
              "Hubo un problema,comunicate con @SahjidAlli para solcuinarlo :("
            );

          message.channel.send({ embeds: [embedResult] });
        }
      } else if (args.length === 0) {
        let embedResult = new Discord.MessageEmbed()
          .setColor("#FF0000")
          .setTitle("Error!")
          .setDescription(
            "Probablemente no pasaste ningún parametro, vuelve a intentarlo"
          );

        message.channel.send({ embeds: [embedResult] });
      }
    }
  } else {
    return;
  }
};

module.exports = { ytSearchCommand };
