const { DiscordMusicBot } = require('../structures/DiscordMusicBot');
const { VoiceState, MessageEmbed} = require("discord.js");
/**
 *
 * @param {DiscordMusicBot} client
 * @param {VoiceState} oldState
 * @param {VoiceState} newState
 * @returns {Promise<void>}
 */
module.exports = async (client, oldState, newState) => {
    // skip bot users, just like the message event
    if (newState.member.user.bot) return;

    // get guild and player
    let guildId = newState.guild.id;
    const player = client.Manager.get(guildId);

    // check if the bot is active (playing, paused or empty does not matter (return otherwise)
    if (!player || player.state !== "CONNECTED") return;

    // prepreoces the data
    const stateChange = {};
    // get the state change
    if (oldState.channel === null && newState.channel !== null) stateChange.type = "JOIN";
    if (oldState.channel !== null && newState.channel === null) stateChange.type = "LEAVE";
    if (oldState.channel !== null && newState.channel !== null) stateChange.type = "MOVE";
    if (oldState.channel === null && newState.channel === null) return; // you never know, right

    // move check first as it changes type
    if (stateChange.type === "MOVE") {
        if (oldState.channel.id === player.voiceChannel) stateChange.type = "LEAVE";
        if (newState.channel.id === player.voiceChannel) stateChange.type = "JOIN";
    }
    // double triggered on purpose for MOVE events
    if (stateChange.type === "JOIN") stateChange.channel = newState.channel;
    if (stateChange.type === "LEAVE") stateChange.channel = oldState.channel;

    // check if the bot's voice channel is involved (return otherwise)
    if (!stateChange.channel || stateChange.channel.id !== player.voiceChannel) return;

    // filter current users based on being a bot
    stateChange.members = stateChange.channel.members.filter(member => !member.user.bot);

    switch (stateChange.type) {
        case "JOIN":
            if (stateChange.members.size === 1 && player.paused) {
                let emb = new MessageEmbed()
                    .setAuthor(`Paused queue resumed 🥁`, client.botconfig.IconURL)
                    .setColor("RANDOM")
                    .setDescription(`Resuming from where you left me all alone :zany_face:`);
                await client.channels.cache.get(player.textChannel).send(emb);

                // update the now playing message and bring it to the front
                let msg2 = await client.channels.cache.get(player.textChannel).send(player.nowPlayingMessage.embeds[0])
                player.setNowplayingMessage(msg2);

                player.pause(false);
            }
            break;
        case "LEAVE":
            if (stateChange.members.size === 0 && !player.paused && player.playing) {
                player.pause(true);

                let emb = new MessageEmbed()
                    .setAuthor(`Track Paused!`, client.botconfig.IconURL)
                    .setColor(client.botconfig.EmbedColor)
                    .setDescription(`The player has been paused cuz everyone left the voice channel, ||i'm all alone now :pensive:||`);
                await client.channels.cache.get(player.textChannel).send(emb);
            }
            break;
    }
}