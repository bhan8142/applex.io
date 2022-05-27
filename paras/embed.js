const { MessageEmbed } = require("discord.js");
module.exports = async (text, channel) => {
   
    let embed = new MessageEmbed()
    
    .setColor("#ff0000")
  .setDescription("" +""+ text);

    await channel.send({embeds:[embed]})
}
