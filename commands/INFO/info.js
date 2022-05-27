const {
  MessageEmbed,MessageButton,MessageActionRow
} = require("discord.js");
module.exports = {
  name: "info",
  category: "Miscellaneous",
  cooldown: 5,
  usage: "Vote",
  description: "Gives you an link to vote the vote",
  run: async (client, message, args, guildData, player, prefix) => {
    
    try {
      const emee = new MessageEmbed()
      .setColor("ff0000")
      
       .setDescription(`Hi, I'm Apple Music. My Work is to play Music. You can check every command by typing help. I am developed using JavaScript`)
       const row = new MessageActionRow()
       .addComponents(

       new MessageButton()
       .setURL("https://discord.gg/mNNM9GUXRa")
       .setLabel("Support server")
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
