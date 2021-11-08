const stopSong = (message, serverQueue) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Necesitas estar en un canal para skipear una canción"
    );

  serverQueue.songs = [];

  serverQueue.connection.dispatcher.end();
  return message.channel.send("Deteniendo...");
};

module.exports = { stopSong };
