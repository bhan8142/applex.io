const discord = require("discord.js");
const send = require("../../paras/embed")
function check(msg, arr) {
      return arr.some(op => op.toLowerCase() === msg.toLowerCase());
    }

module.exports ={
  name:"settc",
  userPermission:["MANAGE_GUILD"],
  run: async (client,message,args)=>{

let prefix =client.config.default_prefix;
      




  let e = new discord.MessageEmbed()
    .setColor("#FF0000")
    .setAuthor(`Guide for settc`,client.user.displayAvatarURL())    
    .setDescription(`
    
\`${prefix}settc add [channel | channel id]\`
add text channels
\`${prefix}settc remove [channel | channel id]\`
remove text channles
\`${prefix}seetc reset [enable/disable]\`
reset text channels
    
 `)

if(!args[0]){
return message.channel.send({embeds: [e]})
}

if (check(args[0], ["add" ,"remove","reset","+","-","enable","disable"]) === false){
return message.channel.send({embeds: [e]})
    
    
    
}
 if(args[0] === "add" || args[0]==="+"){

//playlist -_-
let channel = message.mentions.channels.first()|| message.guild.channels.cache.get(args[1])


if(!channel) return send(`<:Error:939761035164921906>| Provide me vaild channel!`,message.channel)


let channels = await client.db.get(`text_${message.guild.id}`);


if(channels){
if(channels.includes(channel.id)){
return send(`<:Error:939761035164921906>| channels is already a exist in text channels!`,message.channel)

}}


client.db.push(`<:vbgt:938490698540417095> text_${message.guild.id}`,channel.id);

return send(`<:vbgt:938490698540417095> ${channel}  has been added to text channels!`,message.channel)






} else if (args[0]== "remove" || args[0]==="-"){



let channel = message.mentions.channels.first()|| message.guild.channels.cache.get(args[1])


if(!channel)
 return send(`<:Error:939761035164921906> Provide me a vaild channel!`,message.channel)


let channels = await client.db.get(`text_${message.guild.id}`);



  if (channels) {
if(!channels.includes(channel.id)){
  return send(`<:Error:939761035164921906> ${channel} is not a found in database!`,message.channel)
}




 let index = channels.indexOf(channel.id)
      delete channels[index]
      let newArray = channels.filter(x => {
              return x != null && x != ''
            })
      client.db.set(`text_${message.guild.id}`, newArray)
      return send(`<:vbgt:938490698540417095> successfully removed ${channel} from Text channels`,message.channel)
      } else {
        return embed(`${channel} is not found in database!! `,message.channel)

      }

} else if(args[0]==="reset"){



  client.db.delete(`text_${message.guild.id}`)

  return send(`<:Error:939761035164921906> Removed all text channels from database!`,message.channel);
}


  }}




      