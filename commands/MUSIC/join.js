const { MessageEmbed } = require('discord.js')
const embed = require("../../paras/embed")
module.exports = {
  name: "join",
  vcOnly: true,
   botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","DEAFEN_MEMBERS","MOVE_MEMBERS","USE_VAD"],
  
run: async (client, message, args) => {
 
 let player = client.manager.players.get(message.guild.id);

		// Check if bot has permission to connect to voice channel
		if (!message.member.voice.channel.permissionsFor(message.guild.me).has('CONNECT')) {
			return embed(" <:Error:939761035164921906>| I need permission ti **connect** your voice channel", message.channel)
		}

		// Check if bot has permission to speak in the voice channel
		if (!message.member.voice.channel.permissionsFor(message.guild.me).has('SPEAK')) {
			return embed("<:Error:939761035164921906>| I need **sepak** permission in your voice channel",message.channel)
		}

		// If no player create one and join channel
		if (!player) {
			try {
				player = client.manager.create({
					guild: message.guild.id,

					voiceChannel: message.member.voice.channel.id,
					textChannel: message.channel.id,
					selfDeafen: true,
				});
				if (player.state !== "CONNECTED") await player.connect();
 setTimeout(() => {
        try {
          if (message.guild.me.voice?.channel.type === "GUILD_STAGE_VOICE") {

            message.guild.me.voice.setSuppressed(false)
          }
        } catch (e) { }
      }, 5000)

		embed("<:vbgt:944568386539626527> Successfully connected to your  voice channel",message.channel)
		
			} catch (err) {
				embed(`error : ${err.message}`,message.channel)
			}
		} else {
			// Move the bot to the new voice channel / update text channel
			try {
				await player.setVoiceChannel(message.member.voice.channel.id);
        
				await player.setTextChannel(message.channel.id);
				const embed = new MessageEmbed()
					.setColor("#ff0000")
					.setDescription("<:vbgt:944568386539626527> Successfully join your voice channel");
				message.channel.send({embeds:[embed]});
			} catch (err) {
			embed(`Error: ${err.message}`,message.channel)
			}
		}
	}
};
