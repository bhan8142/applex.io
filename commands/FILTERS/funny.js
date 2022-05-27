const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const embed = require("../../paras/embed")
const delay = require('delay');

module.exports = {
  name:"funny",
    botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","DEAFEN_MEMBERS","MOVE_MEMBERS","USE_VAD"],
 
  run: async(client,message,args) => {
    
   const player = message.client.manager.players.get(message.guild.id)
  
    
     if (!player) {
    let embed = new MessageEmbed()
      .setColor("#ff0000")
      .setDescription("<:Error:939761035164921906>| There is nothing playing")
    return message.channel.send({embeds:[embed]})
  }

  const { channel } = message.member.voice

  if (!channel) {
    let embed = new MessageEmbed()
      .setColor("#ff0000")
      .setDescription("<:Error:939761035164921906>| Please connect to a voice channel")
    return message.channel.send({embeds:[embed]})
  }

 if (channel.id !== player.voiceChannel) {
    let embed = new MessageEmbed()
      .setColor("#ff0000")
      .setDescription(`<:Error:939761035164921906>| must join be in same voice  channel`)
    return message.channel.send({embeds:[embed]})
  }

	// Change bassboost value
if (isNaN(args[0])) return message.channel.send('<:Error:939761035164921906> Amount must be a real number.');
		if (args[0] < 0) return message.channel.send('<:Error:939761035164921906> Pitch must be greater than 0.');
		if (args[0] > 10) return message.channel.send('<:Error:939761035164921906> Pitch must be less than 10.');

		player.setPitch(args[0]);
		const msg = await message.channel.send(`Setting pitch to **${args[0]}**.`);
		const embed = new MessageEmbed()
		.setColor("#ff0000") .setDescription(`<:vbgt:944568386539626527> Pitch has been set to: **${args[0]}**`);
		await delay(5000);
		return msg.edit({content:'_ _',embeds:[embed]});
    
 
 	if (args[0].toLowerCase() == 'reset' || args[0].toLowerCase() == 'off') {
		player.clearEffects()
		const msg = await message.channel.send(`Turning off **Pitch**.`);
			const embed = new MessageEmbed()
				.setDescription('<:vbgt:944568386539626527> turned off **Pitch**')
				.setColor("#ff0000");
			await delay(5000);
			return msg.edit({content:'_ _',embeds:[embed]});
    	}
    
 
  }
}
