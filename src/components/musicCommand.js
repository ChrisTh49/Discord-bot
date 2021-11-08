const { prefix } = require("../config");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

const { skipSong } = require("./music/skipSong");
const { stopSong } = require("./music/stopSong");

const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  getVoiceConnection,
} = require("@discordjs/voice");

const queue = new Map();

const musicCommand = async (message) => {
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel)
      return message.channel.send(
        "Necesitas estar en un canal de voz para ejecutar el comando"
      );

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.channel.send("No tienes los permisos necesarios");

    if (!permissions.has("SPEAK"))
      return message.channel.send("No tienes los permisos necesarios");

    const serverQueue = queue.get(message.guild.id);

    if (command === "play") {
      if (!args.length) {
        return message.channel.send("No has introducido ninguna cancion");
      }

      let song = {};

      if (ytdl.validateURL(args[0])) {
        const songInfo = await ytdl.getInfo(args[0]);
        song = {
          title: songInfo.title,
          url: songInfo.videoDetails.video_url,
        };
      } else {
        const videoFinder = async (query) => {
          const results = await ytSearch(query);
          return results.videos.length > 1 ? results.videos[0] : null;
        };

        const video = await videoFinder(args.join(" "));

        if (video) {
          song = {
            title: video.title,
            url: video.url,
          };
        } else {
          message.channel.send("No se ha encontrado ninguna cancion");
        }
      }

      if (!serverQueue) {
        const queueConstruct = {
          voiceChannel: voiceChannel,
          textChannel: message.channel,
          connection: null,
          songs: [],
        };

        queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);

        try {
          const connection = await joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
          });
          queueConstruct.connection = connection;
          videoPlayer(message.guild, queueConstruct.songs[0]);
        } catch (err) {
          queue.delete(message.guild.id);
          message.channel.send("Hubo un error haciendo la conexión");
          throw err;
        }
      } else {
        serverQueue.songs.push(song);
        return message.channel.send(`${song.title} ha sido añadida a la cola`);
      }
    } else if (command === "skip") skipSong(message, serverQueue);
    else if (command === "stop") stopSong(message, serverQueue);
  } else {
    return;
  }
};

const videoPlayer = async (guild, song) => {
  const songQueue = queue.get(guild.id);

  if (!song) {
    getVoiceConnection(guild.id).disconnect();
    queue.delete(guild.id);
    return;
  } else {
    const stream = ytdl(song.url, { filter: "audioonly" });

    const player = createAudioPlayer();
    const resource = createAudioResource(stream);

    player.play(resource);

    player.on(AudioPlayerStatus.Idle, () => {
      songQueue.songs.shift();
      videoPlayer(guild, songQueue.songs[0]);
    });

    songQueue.connection.subscribe(player);

    await songQueue.textChannel.send(`Reproduciendo: ${song.title}`);
  }
};

module.exports = { musicCommand };
