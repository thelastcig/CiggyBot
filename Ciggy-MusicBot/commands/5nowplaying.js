const { MessageEmbed } = require("discord.js");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
  name: "nowplaying",
  description: "See what song is currently playing",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["np", "nowplaying", "now playing"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        ":dvd: **Nothing is playing right now, add some songs to get started**"
      );

    let song = player.queue.current;
    let QueueEmbed = new MessageEmbed()
      .setAuthor("Now playing🎸", client.botconfig.IconURL)
      .setColor(client.botconfig.EmbedColor)
      .setDescription(`[${song.title}](${song.uri})`)      
      .addField(
        "Track Length",
        `${
          client.ProgressBar(player.position, player.queue.current.duration, 15)
            .Bar
        } \`${prettyMilliseconds(player.position, {
          colonNotation: true,
        })} / ${prettyMilliseconds(player.queue.current.duration, {
          colonNotation: true,
        })}\``
      )
      .addField("Added by", `${song.requester}`, true)
      .setThumbnail(player.queue.current.displayThumbnail());
    return message.channel.send(QueueEmbed);
  },

  SlashCommand: {
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          ":dvd: **Nothing is playing right now, add some songs to get started**"
        );

      let song = player.queue.current;
      let QueueEmbed = new MessageEmbed()
        .setAuthor("Currently playing", client.botconfig.IconURL)
        .setColor(client.botconfig.EmbedColor)
        .setDescription(`[${song.title}](${song.uri})`)
        .addField("Requested by", `${song.requester}`, true)
        .addField(
          "Duration",
          `${
            client.ProgressBar(
              player.position,
              player.queue.current.duration,
              15
            ).Bar
          } \`${prettyMilliseconds(player.position, {
            colonNotation: true,
          })} / ${prettyMilliseconds(player.queue.current.duration, {
            colonNotation: true,
          })}\``
        )
        .setThumbnail(player.queue.current.displayThumbnail());
      return interaction.send(QueueEmbed);
    },
  },
};
