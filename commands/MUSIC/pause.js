const { MessageEmbed } = require('discord.js')
const discord = require("discord.js")
const embed = require("../../paras/embed")
module.exports = {
  name: "pause",
  vcOnly: true,
   botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","DEAFEN_MEMBERS","MOVE_MEMBERS","USE_VAD"],
  

run:(client, message) => {
  const player = message.client.manager.players.get(message.guild.id)
  const color = message.guild.me.roles.highest.color

  if (!player) {
    let embed = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription("<:Error:939761035164921906>| There is nothing playing")
    return message.channel.send({embeds:[embed]})
 }

  const { channel } = message.member.voice

 
  if (channel.id !== player.voiceChannel) {
    let embed = new MessageEmbed()
      .setColor("ff0000")
      .setDescription(`<:Error:939761035164921906>| must join be in same voice  channel`)
      return message.channel.send({embeds:[embed]})
  }
  if (player.paused) {
    player.pause(false)
    let embed6 = new discord.MessageEmbed()
    .setAuthor(`${message.author.tag} - Pause`, message.author.displayAvatarURL( { dynamic: true } ))
    .setColor("ff0000")
    .setDescription("<:vbgt:944568386539626527> Resumed the current track")
    message.channel.send({embeds:[embed6]})
    
  } else if (!player.paused) {
    player.pause(true)
    let embed2 = new discord.MessageEmbed()
    .setAuthor(`${message.author.tag} - Pause`, message.author.displayAvatarURL( { dynamic: true } ))
    .setColor("ff0000")
    .setDescription("<:vbgt:944568386539626527> Paused the current track")
    message.channel.send({embeds:[embed2]})
  }
}

}