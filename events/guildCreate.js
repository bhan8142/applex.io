const {MessageEmbed} = require("discord.js")
module.exports = {
 name : "guildCreate",
 async execute (client, guild)  { 
  const ID = "944221824236007507";
  //const sowner = `${guild.owner.user}`;
  const embed1 = new MessageEmbed()
    .setTitle("New Server Joined!")
    .addField(`Server Name:`, `${guild.name}`)
    .addField(`Server ID:`, `${guild.id}`)
    .addField(`Members:`, `${guild.memberCount}`)
    .setTimestamp()
    .setColor("RED")
    .setFooter(`My new Server Count - ${client.guilds.cache.size}`);

client.channels.cache.get(client.config.log).send({embeds:[embed1]})
}
}
