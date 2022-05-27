const discord  =  require("discord.js")
const {
    MessageEmbed,MessageButton,MessageActionRow
    
  } = require("discord.js");
const Discord = require("discord.js")
module.exports = {
  name: "help",
   botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS"],
 
  run: async (client,message,args) => { 
    
    const embed = new discord.MessageEmbed()
    .setColor("#ff0000")
 .setAuthor("| AppleMusic Help Menu",client.user.displayAvatarURL())
.setDescription(`to get more info use help <cmd>`)
.setDescription(`
**Music [17]**

\`clear\`, \`join\`, \`leave\`, \`loop\`, \`move\`, \`nowplaying\`, \`pause\`, \`play\`, \`previous\`, \`queue\`, \`remove\`, \`resume\`, \`search\`, \`skip\`, \`seek\`, \`stop\`, \`volume\`.

**Filters [12]**

\`24/7\`, \`bass\`, \`bassboost\`, \`earrape\`, \`pitch\`, \`seek\`, \`pop\`, \`reset\`, \`soft\`, \`speed\` \`vaporwave\`, \`deepbass\`.

**Playlist [7]**

\`pl-add\`, \`pl-create\`, \`pl-load\`, \`pl-show\`, \`pl-remove\`, \`pl-list\`, \`pl-savecurrent\`.

**Info [5]**

\`about\`, \`ping\`, \`uptime\`, \`invite\`, \`grab\`.

**Miscellaneous [5]**

\`prefix\`, \`report\`, \`vote\`, \`settc\`, \`remove tc\`.
`)

.setThumbnail(client.user.displayAvatarURL())
.setFooter("Thanks for using AppleMusic")

 const row = new MessageActionRow()
  .addComponents(
    new MessageButton()
      .setLabel("Invite Me")
      .setStyle("LINK")
      .setEmoji("<:invite:924601909250256937>")
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=946423288769421333&permissions=8&scope=bot`),
    new MessageButton()
      .setLabel("Support Server")
      .setStyle("LINK")
      .setURL("https://discord.gg/cqEuckdXYw")
    .setEmoji(""),
    new MessageButton()
     .setLabel("Vote me")
     .setStyle("LINK")
     .setEmoji("<:top_gg_vote:944855054685446205>")
     .setURL(`https://discordbotlist.com/bots/apple-music-3507`),
     )

message.channel.send({ embeds: [embed], components: [row] })
  }
}