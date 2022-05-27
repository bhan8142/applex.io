const discord  =require("discord.js")
module.exports  = {
name: "stats",
aliases: ["sts"], 
botPermission: ["EMBED_LINKS","USE_EXTERNAL_EMOJIS"],
run : async (client,message,args )=> {
  
  
  
  let embed  = new discord.MessageEmbed()
    
   .setColor("#ff0000")
 .setAuthor(`${client.user.username} Information`,client.user.displayAvatarURL())
 
    
.addField(`
**DEVELOPERS**`,
`-TEAM Applemusic`)

.addField(`**PLATFORM**`,
`${process.platform}`)

.addField(`**SERVERS**`,
`${client.guilds.cache.size}`)

.addField(`**PING**`,
`${client.ws.ping}`)

.addField(`**GUILD ID**`,
`${message.guild.id}`)



message.channel.send({embeds:[embed]})
}}
