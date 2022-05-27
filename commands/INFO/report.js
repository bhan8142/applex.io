const { MessageEmbed } = require ("discord.js");
const discord  =require("discord.js")
module.exports  = {
name: "report", 
botPermission: ["EMBED_LINKS","USE_EXTERNAL_EMOJIS"],
run : async (client,message,args )=> {

  const reciver = client.users.cache.get
  ("840565926423298079");

  const query = args.join (" ");
  if (!query) {
    let embed1 = new MessageEmbed()
        .setColor("#ff0000")
        .setDescription("Please specify a bug or error")
return message.channel.send({embeds:[embed1]}) 


  }
  

     const bug = new discord.MessageEmbed()
     .setTitle('<:vbgt:938490698540417095> Bug Reported')
     .addField('reporter', message.author.toString(), true)
     .addField("from", message.guild.name, true)
     .addField('message', query)
     .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
     .setTimestamp();
  message.channel.send({embeds:[bug]});
      reciver.send({embeds:[bug]})
     
  




}}
  
  
