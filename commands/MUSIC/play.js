const { MessageEmbed } = require('discord.js')
const delay = require("delay")
const prettyMilliseconds = require('pretty-ms');
const embed = ("../paras/embed")
function millisToDuration(ms) {
        return prettyMilliseconds(ms, { colonNotation: true, secondsDecimalDigits: 0 });
    }
module.exports = {
  name: "play",
  aliases: ["p"],
  botPermission: ["EMBED_LINKS", "READ_MESSAGE_HISTORY","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","USE_VAD"],
  vcOnly: true,
  sameVc : true,
  

run:async (client, message, args)=> {


 if( args[0] &&args[0].startsWith("https://you") || args[0] &&args[0].startsWith("https://www.you"))
     {

       let embed = new MessageEmbed()
       .setColor(client.config.color)
       .setDescription(`
As of recent events, we have removed **Youtube** as a supported platform for **Apple Music**.
We still support **SoundCloud and Spotify**.
`)
     
     return message.channel.send({embeds:[embed]})
     }






  
const color = message.guild.me.roles.highest.color
let {channel} = message.member.voice
 let play = message.client.manager.players.get(message.guild.id)

  
  if (!args.length) {
    let embed = new MessageEmbed()
      .setColor("#ff0000")
      .setDescription(`<:apple_playlist:939768124893458453> To play a song, you need to specify which song you want to play! Try +play hippo campus - bambi`)
    return message.channel.send({embeds:[embed]})
 }

 
  if (!play) {
  await client.manager.create({
					guild: message.guild.id,
					voiceChannel: message.member.voice.channel.id,
					textChannel: message.channel.id,
					selfDeafen: true,
				}).connect();
  }
  setTimeout(() => {
        try {
          if (message.guild.me.voice?.channel.type === "GUILD_STAGE_VOICE") {

            message.guild.me.voice.setSuppressed(false)
          }
        } catch (e) { }
      }, 5000)

    if (!channel.joinable) {
      let embed = new MessageEmbed()
        .setColor("#ff0000")
        
        .setDescription("<:Error:939761035164921906>| I can't able to join your voice channel")
   return message.channel.send({embeds:[embed]})
    }

     

  const player = message.client.manager.players.get(message.guild.id)
 if (channel.id !== player.voiceChannel) {
      let embed = new MessageEmbed()
      .setColor("#ff0000")
      .setDescription("<:Error:939761035164921906>| must be in same voice channel"
        
        
        )
   return message.channel.send({embeds:[embed]})
  }
 
  const search = args.join(' ')
  let res
	
  try {
    res = await player.search(search, message.author)
    if (res.loadType === 'LOAD_FAILED') {
      if (!player.queue.current) player.destroy()
      throw new Error(res.exception.message)
    }
  } catch (err) {
    let embed = new MessageEmbed()
      .setColor("#ff0000")
      
      .setDescription(` <:Error:939761035164921906>| i can't find result about \`${search}\``
       )
   return message.channel.send({embeds:[embed]})
  }

  switch (res.loadType) {
    case 'NO_MATCHES':
      if (!player.queue.current) player.destroy()
      let embed = new MessageEmbed()
        .setColor("#ff0000")
        
        .setDescription(` <:Error:939761035164921906>| i can't find results about \`${search}\``)
   return message.channel.send({embeds:[embed]})
     client.manager.on("queueEnd", player => {
    if (player.twentyFourSeven) return;

    const channel = client.channels.cache.get(player.textChannel);
    return embed("Queue has been ended",message.channel4);
    player.destroy();
  }) 
  
    case 'TRACK_LOADED':
      await player.queue.add(res.tracks[0])
      if (!player.playing && !player.paused && !player.queue.length) player.play()
      let embed2 = new MessageEmbed()
        .setColor("#ff0000")
        .setTitle(`Queued`, message.author.displayAvatarURL())
        .setDescription(`[${res.tracks[0].title}](${res.tracks[0].uri.requester})`)
      if (player.queue.length >= 1) //await delay(4900)
     return message.channel.send({embeds:[embed2]})
 
    case 'PLAYLIST_LOADED':
      await player.queue.add(res.tracks)
      if (!player.playing && !player.paused && player.queue.size + 1 === res.tracks.length) player.play();
      let embed3 = new MessageEmbed()
        .setColor("#ff0000")
        .setTitle(`Queued`, message.author.displayAvatarURL())
        .setDescription(`**${res.playlist.name}** \`[${res.tracks.length.requester} songs]\``)
      if (player.queue.length >= res.tracks.length) 
   //  await delay(4900) 
    return message.channel.send({embeds:[embed3]})

    case 'SEARCH_RESULT':
      await player.queue.add(res.tracks[0])
      if (!player.playing && !player.paused && !player.queue.length) player.play()
      let embed4 = new MessageEmbed()
        .setAuthor(`Queued`,`${client.user.displayAvatarURL()}`)
        .setColor("#ff0000")
        .setDescription(  `[${res.tracks[0].title}](${res.tracks[0].uri})`)
//await delay(4900)  
         return message.channel.send({embeds:[embed4]})
 return;
  }
}
}
