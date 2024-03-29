const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "skip",
  category: "Music",
  aliases: ["s"],
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  description: "Forces to skip the current song",
  usage: "skip",
  run: async (client, message, args, guildData, player, prefix) => {
    try{
   
      const { channel } = message.member.voice;
      //if the member is not in a channel, return
      if (!channel) {
        const opop = new MessageEmbed()
        .setColor("ff0000")
        .setDescription(`You need to join a voice channel.`)
        return message.channel.send({embeds: [opop]})
      }
      //get the player instance
      const player = client.manager.players.get(message.guild.id);
      //if no player available return error | aka not playing anything
      if (!player){
        if(message.guild.me.voice.channel) {
          const newPlayer = client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: true,
          })
          newPlayer.destroy();
          const pppp = new MessageEmbed()
          .setDescription(` SuccessFully Stopped and left your Channel`)
          .setColor("#fd6260")
          return message.channel.send({embeds: [pppp]});
        }
        else {
          const opoppp = new MessageEmbed()
          .setColor("ff0000")
          .setDescription(` No song is currently playing in this guild.`)
          return message.channel.send({embeds: [opoppp]});
        }
      }
      
      //if not in the same channel as the player, return Error
      if (channel.id !== player.voiceChannel) {
        const noi = new MessageEmbed()
        .setColor("ff0000")
        .setDescription(` You need to be in my voice channel to use this command!\n\nChannelname: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)
        return message.channel.send({embeds: [noi]})
      }
      if (!player.queue.current) {
        const no = new MessageEmbed()
        .setColor("ff0000")
        .setDescription(` There is nothing playing`)
        return message.channel.send({embeds: [no]})
      }

      if(player.queue.size == 0) {
        if(player.get("autoplay")) {
        const idkd = new MessageEmbed()
        .setAuthor(`${message.author.tag} - Skip`, message.author.displayAvatarURL( { dynamic: true } ))
        .setDescription(` Skipped **${player.queue.current.title}**`)
        .setColor("ff0000")
          message.channel.send({embeds: [idkd]});
          return autoplay(client, player, "skip")
        } else {
          player.stop();
          const idkd = new MessageEmbed()
          .setAuthor(`${message.author.tag} - Skip`, message.author.displayAvatarURL( { dynamic: true } ))
          .setDescription(`Skipped **${player.queue.current.title}**`)
         .setColor("ff0000")
          return message.channel.send({embeds: [idkd]});
        }
      }

      player.stop();
      const idkd = new MessageEmbed()
      .setAuthor(`${message.author.tag} - Skip`, message.author.displayAvatarURL( { dynamic: true } ))
      .setDescription(` Skipped **${player.queue.current.title}**`)
      .setColor("ff0000")
      return message.channel.send({embeds: [idkd]});

    } catch (e) {
      console.log(String(e.stack).bgRed)
      const emesdf = new MessageEmbed()
      .setColor("ff0000")
      .setAuthor(`An Error Occurred`)
      .setDescription(`\`\`\`${e.message}\`\`\``);
      return message.channel.send({embeds: [emesdf]});
    }
  }
};
