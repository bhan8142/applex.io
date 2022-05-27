const { MessageEmbed } = require('discord.js')
const embed = require("../../paras/embed")
module.exports = {
  name: "previous",
  vcOnly: true,
   botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","DEAFEN_MEMBERS","MOVE_MEMBERS","USE_VAD"],
  

run:(client, message) => {
  const player = message.client.manager.players.get(message.guild.id)
if(!player) return
  

  const { channel } = message.member.voice
if(player.previous == null) return embed('<:Error:939761035164921906>| There are no previous songs.',message.channel);
  

	}
};
