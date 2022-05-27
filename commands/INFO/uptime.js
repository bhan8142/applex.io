const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'uptime',
      botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS"],
 
  run:  async(client,message, args)=>{
			  let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400) || "0";
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600) || "0";
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60) || "0";
        let seconds = Math.floor(totalSeconds % 60);

				if (days === "0"){
					const embed = new Discord.MessageEmbed()
           .setTitle(`${client.user.username} Uptime`)
           .addField("Hours", `${hours}`,true)
           .addField("Minutes", `${minutes}`,true)
           .addField("Seconds", `${seconds}`,true)
					 .setColor("#ff0000")
      return message.channel.send({embeds:[embed]});
				} else {

        const embed = new Discord.MessageEmbed()
           .setTitle(`${client.user.username} UPTIME`)
           .addField("Days", `${days}`,true)
           .addField("Hours", `${hours}`,true)
           .addField("Minutes", `${minutes}`,true)
           .addField("Seconds", `${seconds}`,true)
					 .setColor("#ff0000")
return message.channel.send({embeds:[embed]});
    }}
}
