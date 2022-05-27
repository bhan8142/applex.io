const { MessageEmbed } = require('discord.js');
const discord = require("discord.js")
const embed = require("../../paras/embed")

module.exports = {
  name: "24/7",
   botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","DEAFEN_MEMBERS","MOVE_MEMBERS","USE_VAD"],
   
  aliases: ["247"],
  run: async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_GUILD')) return embed('You must have `Manage Guild` permission to use this command.', message.channel);
   const player = message.client.manager.players.get(message.guild.id);
		if (!player) return embed('<:Error:939761035164921906>| there is nothing playing', message.channel);

		
		const { channel } = message.member.voice

		 

		if (player.twentyFourSeven) {
			player.twentyFourSeven = false;
			return embed(		  '<:vbgt:944568386539626527> 24/7 mode is **disabled**',message.channel);
		} else {
			player.twentyFourSeven = true;
	return embed('<:vbgt:944568386539626527> 24/7 mode is **enabled**', message.channel);
		}

  }
}
