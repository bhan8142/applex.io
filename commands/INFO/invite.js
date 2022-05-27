const {
  MessageEmbed,MessageButton,MessageActionRow
} = require("discord.js");
module.exports = {
  name: "invite",
  category: "Miscellaneous",
  aliases: ["Invite", "inv", "Inv"],
  cooldown: 5,
  usage: "Vote",
  description: "Gives you an link to vote the vote",
  run: async (client, message, args, guildData, player, prefix) => {
    try {
      const emee = new MessageEmbed()
      .setColor("ff0000")
      
       .setDescription(' Click below to add me :)')
       const row = new MessageActionRow()
       .addComponents(

       new MessageButton()
       .setURL("https://discord.com/api/oauth2/authorize?client_id=946423288769421333&permissions=8&scope=bot")
       .setLabel("Invite me")
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
