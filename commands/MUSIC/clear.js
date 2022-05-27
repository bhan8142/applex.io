const { MessageEmbed } = require('discord.js')
const embed = require("../../paras/embed")
module.exports = {
  name: "clear",
  vcOnly: true,
   botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","DEAFEN_MEMBERS","MOVE_MEMBERS","USE_VAD"],
  
run: async (client, message, args) => {
  const player = message.client.manager.players.get(message.guild.id)
 const { channel } = message.member.voice

if (channel.id !== player.voiceChannel) {
      let embed = new MessageEmbed()
      .setColor("#ff0000")
      .setDescription("<:Error:939761035164921906>| must be in same voice channel"
        
        
        )
   return  message.channel.send({embeds:[embed]})
 }
 
 
 player.queue.length = [];
return embed(`<:vbgt:944568386539626527> cleared the current queue`,message.channel)
 
 
}}
