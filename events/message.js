let cooldown = {}
const {MessageEmbed} = require("discord.js")
const discord  = require("discord.js")
const {  default_prefix } = require("../config.json");
const delay = require('delay');

module.exports = {
  name: "messageCreate",
  async execute(client,message) {

    if(message.author.bot || !message.guild) return;

    let prefix = await client.db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;

const mention= new RegExp(`^<@!?${client.user.id}>( |)$`);


if (message.content.match(mention)) {
      const embed =new discord.MessageEmbed()
      .setColor("#ff0000")
      .setDescription(`My prefix is \`${prefix}\`. You can play music by joining a voice channel and typing \`${prefix}\`play . The command accepts and plays song.
      `)
      message.channel.send({embeds:[embed]})
  };

const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
  const paras = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : prefix;

  
  if (!message.content.startsWith(paras)) return;

//settc code here 
let channels =[];
let channel = await client.db.get(`text_${message.guild.id}`)

         if(channel && channel.length) {
              channel.forEach(x => {
              channels.push(`<#${x}>`)
            })
         }


if(channel){

if(!channel.includes(message.channel.id)){

if(!message.member.permissions.has("MANAGE_GUILD")){

let embed = new discord.MessageEmbed()
.setColor("#FF0000")
.setDescription(`You can Use command in the following channel:
  ${channels.join("\n")}`)
  return message.channel.send({embeds:[embed]}).then(async(x) => {
  await delay(7000)
 if(x)await  x.delete()
 
 
 
  })
 }}
}














  // If message.member is uncached, cache it.
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(paras.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;
  
  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  // If a command is finally found, run the command
  //if (command) command.run(client, message, args);
  
  if (!command) return;

  //-------------------------------------------- P E R M I S S I O N -------------------------------------------



  if (command.botPermission) {
    let neededPerms = []

    command.botPermission.forEach(p => {
      if (!message.guild.me.permissions.has(p)) neededPerms.push("`" + p + "`")
    })

    if (neededPerms.length) return message.channel.send(` I need ${neededPerms.join(", ")} permission(s) to execute the command!`)
  } 
   if (command.userPermission) {
    let neededPerms = []


    command.userPermission.forEach(p => {
      if (!message.member.permissions.has(p)) neededPerms.push("`" + p + "`")
    })

    if (neededPerms.length) return message.channel.send(` You need ${neededPerms.join(", ")} permission(s) to run the command!`)
  }

  // ---------------------------------------------O W N E R ----------------------------------------------------------
if(command.vcOnly){
    const { channel } = message.member.voice;
  

 if (!channel) {
    let embed = new MessageEmbed()
      .setColor("#ff0000")
      .setDescription(` You have to be connected to a voice channel before you can use this command!`)
  return message.channel.send({embeds:[embed]})
  }
  }

 



  if (command.ownerOnly) {
    if(!owner.includes(message.author.id)) return;
     message.channel.send("This command can only be use by owner")
}

  let uCooldown = cooldown[message.author.id];

  if (!uCooldown) {
    cooldown[message.author.id] = {}
    uCooldown = cooldown[message.author.id]
  }

  let time = uCooldown[command.name] || 0

  if (time && (time > Date.now())) return message.channel.send(`You can again use this command in ${Math.ceil((time - Date.now()) / 1000)} second(s)`) 

  cooldown[message.author.id][command.name] = Date.now() + command.cooldown;

  
if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) return;

if (!message.channel.permissionsFor(client.user).has("EMBED_LINKS")) return;



  if (command) command.run(client, message, args);
 


}}
