const delay = require('delay');
const { MessageEmbed } = require('discord.js');
//const { nightcore } = require('../../utils/filter.js')

module.exports = { 
        name: "reset",
          botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","DEAFEN_MEMBERS","MOVE_MEMBERS","USE_VAD"],
 
        description: "Turning on nightcore filter",
        category: "filters",
        accessableby: "Member",
        aliases: [],
    

    run: async (client, message) => {
        const msg = await message.channel.send(`resetting all the filters`);
			const embed = new MessageEmbed()
				.setDescription('<:vbgt:944568386539626527> I have been reseted all filters')
				.setColor("#ff0000");
			await delay(5000);
			return msg.edit({content:'_ _',embeds:[embed]});
    
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
  } player.clearEffects();
	player.setEQ(Array(13).fill(0).map((n, i) => ({
            band: i,
            gain: 0
        })));
        const nightcored = new MessageEmbed()
            .setTitle("<:vbgt:944568386539626527> Reseted all filters ")
            .setColor('#ff0000');

        await delay(5000);
     	return msg.edit({content:'_ _',embeds:[embed]});
           }
};
