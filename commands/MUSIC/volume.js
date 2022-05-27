const { MessageEmbed } = require('discord.js')
const embed = require("../../paras/embed")
module.exports = {
  name: "volume",
  vcOnly:true,
   botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","DEAFEN_MEMBERS","MOVE_MEMBERS","USE_VAD"],
  
run: (client, message, args) => {
  const player = message.client.manager.players.get(message.guild.id)
  const color = message.guild.me.roles.highest.color

  if (!player) {
    let embed = new MessageEmbed()
      .setColor("ff0000")
      .setDescription("<:Error:939761035164921906> There is nothing playing")
     return message.channel.send({embeds:[embed]})
}

  const { channel } = message.member.voice

  
  if (channel.id !== player.voiceChannel) {
    let embed = new MessageEmbed()
      .setColor("ff0000")
      .setDescription(`<:Error:939761035164921906> must join be in same voice  channel`)
     return message.channel.send({embeds:[embed]})
}
  if (!args.length) {
    let embed = new MessageEmbed()
      .setColor("ff0000")
      
      .setDescription(`<:Error:939761035164921906> Please  Provide me volume between 1 to 100 `)
  
    return message.channel.send({embeds:[embed]})
 }

  if (isNaN(args[0])) {
    let embed = new MessageEmbed()
      .setColo('ff0000')
      .setDescription("<:Error:939761035164921906> that is not a vaild number")
       return message.channel.send({embeds:[embed]})
}

  if (args[0] < 1 || args[0] > 100) {
    let embed = new MessageEmbed()
      .setColor("ff0000")
      .setDescription("<:Error:939761035164921906> Volume should be 1 to 100")
       return message.channel.send({embeds:[embed]})
}

  const volume = Number(args[0])

  player.setVolume(volume)
  return embed(`<:vbgt:938490698540417095> Volume has been set to ${args[0]}`,message.channel)
}}