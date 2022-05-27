const {
  MessageEmbed,MessageButton,MessageActionRow
} = require("discord.js");
module.exports = {
  name: "vote",
  category: "Miscellaneous",
  aliases: ["Vote", "Vote"],
  cooldown: 5,
  usage: "Vote",
  description: "Gives you an link to vote the vote",
  run: async (client, message, args, guildData, player, prefix) => {
    try {
      const emee = new MessageEmbed()
      .setColor("ff0000")
      
       .setDescription(' Helping Me By Voting :)')
       const row = new MessageActionRow()
       .addComponents(

       new MessageButton()
       .setURL("https://discordbotlist.com/bots/apple-music-6881")
       .setLabel("Vote me")
       .setStyle("LINK"),
       );
       
    
      message.channel.send({embeds: [emee], components: [row]});
    } catch (e) {
      console.log(String(e.stack).bgRed)
            const emesdf = new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setAuthor(`An Error Occurred`)
            .setDescription(`\`\`\`${e.message}\`\`\``);
            return message.channel.send({embeds: [emesdf]});
    }
  }
}
