const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "queryisnotafunction",
    category: "Information",
    description: "Check the bot's ping",
  run : async (client,message,args) => {
  client.guilds.cache.forEach(guild => {
  message.channel.send(`**Name:** ${guild.name}\n**Server ID:**  ${guild.id}\n**Server owner:** ${ guild.ownerId}\n **Membercount:** ${guild.memberCount}`);
})
    }
};