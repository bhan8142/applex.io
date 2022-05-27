const { MessageEmbed} = require("discord.js")
const delay = require('delay');

module.exports = {
  name:"earrape",
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
      .setDescription(" <:Error:939761035164921906>| Please connect to a voice channel")
    return message.channel.send({embeds:[embed]})
  }

   if (channel.id !== player.voiceChannel) {
    let embed = new MessageEmbed()
      .setColor("#ff0000")
      .setDescription(`<:Error:939761035164921906>| must join be in same voice  channel`)
    return message.channel.send({embeds:[embed]})
  }


		player.setVolume(500);
		player.setEQ(...Array(6).fill(0).map((n, i) => ({ band: i, gain: 0.5 })));

		const embed = new MessageEmbed()
			.setDescription('<:vbgt:944568386539626527> Apple set to **earrape**. ')
			.setColor("#ff0000");
		return message.channel.send({embeds:[embed]});
	
    if (args[0].toLowerCase() == 'reset' || args[0].toLowerCase() == 'off') {
		  player.setEQ(Array(13).fill(0).map((n, i) => ({
            band: i,
            gain: 0
        })));
		player.clearEffects()
		const msg = await message.channel.send(` Turning off **earrape**. This may take a few seconds...`);
			const embed = new MessageEmbed()
				.setDescription('<:vbgt:944568386539626527> Turned off **earrape**')
				.setColor("#ff0000");
			await delay(5000);
		return msg.edit({content:'',embeds:[embed]});
      	}
    
    
    
  }
};
