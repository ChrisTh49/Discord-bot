const skipSong = (message, serverQueue) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Necesitas estar en un canal para skipear una canción"
    );

  if (!serverQueue)
    return message.channel.send("No hay canciones reproduciendose");

  serverQueue.connection;
  return message.channel.send("Skipping...");
};

module.exports = { skipSong };
