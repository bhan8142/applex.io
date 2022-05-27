const {MessageEmbed} = require("discord.js")
module.exports = {
 name : "guildDelete",
 async execute (client, guild)  { 

 const ID = "944221824236007507";

  const embed = new MessageEmbed()
    .setTitle("I left a Server!")
    .addField(`Server Name:`, `${guild.name}`)
    .addField(`Server ID:`, `${guild.id}`)
    .addField(`Members:`, `${guild.memberCount}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(`My new Server Count - ${client.guilds.cache.size}`);
  client.channels.cache.get(client.config.log).send({embeds:[embed]})


}}