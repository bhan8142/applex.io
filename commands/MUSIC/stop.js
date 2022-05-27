const { MessageEmbed } = require('discord.js')
const embed = require("../../paras/embed")
module.exports= {
  name: "stop",
  vcOnly: true,
   botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","DEAFEN_MEMBERS","MOVE_MEMBERS","USE_VAD"],
  
run: (client, message, args) => {
  const player = message.client.manager.players.get(message.guild.id)
  const color = message.guild.me.roles.highest.color

 if (!player) {
    let embed = new MessageEmbed()
      .setColor("#ff0000")
      .setDescription("<:Error:939761035164921906>| There is nothing playing")
    return  message.channel.send({embeds:[embed]})
  }

  const { channel } = message.member.voice

  
  if (channel.id !== player.voiceChannel) {
    let embed = new MessageEmbed()
      .setColor("#ff0000")
      .setDescription(` <:Error:939761035164921906>| must join be in same voice  channel`)
    return  message.channel.send({embeds:[embed]})
  } 
  player.destroy()
  return embed("<:vbgt:938490698540417095> Stopped the current queue", message.channel);
  
}}
