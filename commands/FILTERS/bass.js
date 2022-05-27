const { MessageEmbed} = require("discord.js")
const delay = require('delay');

module.exports = {
  name:"bass",
   botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","DEAFEN_MEMBERS","MOVE_MEMBERS","USE_VAD"],
  
  run: async(client,message,args) => {
    
   
const player = message.client.manager.players.get(message.guild.id)
  

  
  
  
  
  
  if (!player) {
    let embed = new MessageEmbed()
      .setColor("#ff0000")
      .setDescription(" <:Error:939761035164921906>| There is nothing playing")
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

 const m1 = await message.channel.send("Turning on **bass**.");
	// Change bassboost value
	player.setBassboost(!player.bassboost)
	
	 const bass = new MessageEmbed()
            .setTitle("<:vbgt:944568386539626527> Turned on: bass",)
            .setColor('#ff0000');

        await delay(5000);
       return m1.edit({content:"_ _",embeds:[bass]})
   
    	if (args[0].toLowerCase() == 'reset' || args[0].toLowerCase() == 'off') {
		player.clearEffects()
		const msg = await message.channel.send(`Turning off **bass**.`);
			const embed = new MessageEmbed()
				.setDescription('<:vbgt:944568386539626527>| turned off **bass**')
				.setColor("#ff0000");
			await delay(5000);
			return msg.edit({content:'',embeds:[embed]});
    	}
    
       
  }
}
